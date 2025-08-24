# Interpolation

## Introduction

Interpolation is the process of integrating discrete data types into a string template that has markers for where dynamic content should be placed.

Typescript itself provides a starting point in it's implementation of string literals where you can place elements like `${string}`, `${number}`, and `${boolean}` elements into a string type to indicate that this _type_ in the future will host a _value_ of that wide type.

We call this form of templating as literal templating and you'll find several types which use the `LiteralTemplate` nomenclature to refer to this.

## Static Templating

Beyond static templating, this repo introduces what we're calling **static templating**. Static templating attempts to address a few shortcomings found in literal templates:

- **Runtime**
    - A static template can be defined and used in the _runtime system_ rather than only living in the _type system_ and being invisible at runtime.
- **Boolean Unions**
    - Unions are a powerful feature of Typescript but they can be deadly too in terms of blowing up type complexity
    - unfortunately the `${boolean}` literal is a sneaky bastard and is immediately converted to a union type
    - sometimes this is fine, possibly desirable, but often it is the beginning of a messy union problem
- **Advanced Features**
    - by avoiding unwanted unions and providing a shared awareness of template semantics to both runtime and design/type systems we can do more interesting and useful things
    - more on this later

### What is a Static Template?

Let's start with an easy to understand mapping between literal and static templates:

| Literal      | Static        |
| ------------ | ------------- |
| `${string}`  | `{{string}}`  |
| `${number}`  | `{{number}}`  |
| `${boolean}` | `{{boolean}}` |

Now it's true that the **static** equivalents initially mean _nothing_ to the type or runtime systems:

```ts
const template = "Hi {{string}}, I heard your favorite color is {{string}}. Wanna be friends? {{boolean}}";
```

This template is just a string. Sure hiding in that string are secret templating powers but right now both the runtime and type system are unimpressed.

To start understanding what is being unlocked, let move onto the next section where we'll start discussing the type utilities which are at your disposal.

### Type Utilities

1. `AsStaticTemplate<T>`

    Converts a _literal templated type_ to a _static template_. For instance:

    ```ts
    // "Hi {{string}}"
    type Template = AsStaticTemplate<`Hi ${string}`>;
    ```

2. `AsLiteralTemplate<T>`

    Converts a _static template_ to a _literal template_. For instance:

    ```ts
    // `Hi ${string}`
    type Template = AsLiteralTemplate<"Hi {{string}}">;
    ```

3. `TemplateBlocks<T>` and `TemplateParams<T>`

    Evaluate the template string and produce a positional start-to-end summary of the dynamic segments. Here's an example:

    ```ts
    type Template = "{{string}} is {{number}} years old and their favorite color is {{string}}. Member: {{boolean}}";
    // [ "{{string}}", "{{number}}", "{{string}}", "{{boolean}}"]
    type Blocks = TemplateBlocks<Template>;
    // [ string, number, string, boolean ]
    type Params = TemplateParams<Template>;
    ```

    The `TemplateParams<T>` utility leverages the `AsTemplateBlocks<T>` utility to map the `TemplateBlock` (e.g., `{{string}}`, `{{number}}`, etc.) to the underlying wide type which it represents.

4. `IntoTemplate<T,U>`

    Allows dynamic segments to be filled with values.

    ```ts
    // "Bob is 45 years old and their favorite color is blue."
    type Instance = IntoTemplate<
        "{{string}} is {{number}} years old and their favorite color is {{string}}.",
        ["Bob", 45, "blue"]
    >;
    ```

    The parameters you put in are type sensitive so you can only put in valid values for the wide type expressed in the template. In the above example, we fully applied the template but we can do a _partial application_ too:

    ```ts
    // "Bob is 45 years old and their favorite color is {{string}}."
    type Instance = IntoTemplate<
        "{{string}} is {{number}} years old and their favorite color is {{string}}.",
        ["Bob", 45]
    >;
    ```

Before we move onto _runtime utilities_ let's address two additional capabilities that we have so far not mentioned:

1. **Custom** Segments - we can create our own token set rather than using only `{{string}}`,`{{number}}`, and `{{boolean}}`
2. **Named** Segments - with the use of `IntoTemplate<...>` we saw how we could populate a template using a variadic approach of supplying values in _order_ but often it is nice to be able to interpolate into the template using _names_ rather than _order_

Let's discuss both in further detail.

#### Custom Segments

While the _types_ we can incorporate into a string literal are indeed only _strings_, _numbers_, and _booleans_ there
are useful variants beyond this when we consider union types, string literals, and numeric literals. Imagine you wanted to define a dynamic segment which would be identified as `{{email}}` and it's type was `${string}@${string}.${string}`. Here's how the `TemplateParams` could meet your new flexibility requirements:

```ts
// [ string, `${string}@${string}.${string}` ]
type Params = TemplateParams<"{{string}}'s email is {{email}}", { string: "string"; email: `"{{string}}@{{string}}.{{string}}"` }>;
```

All of the type utilities previously discussed _can_ take an additional parameter which defines the _dynamic segments_ in our templates. This is what we see in the example above where we've provided a dictionary which _extends_ the type: `Record<string, InputTokenSuggestions>`.

- you can specify any string based _dynamic segment_ as a **key** to to the dictionary and any _string-based_ `InputToken` as the value
- in this example it's important to recognize that the `InputToken` parser will always convert the default

### Runtime Utilities

1. `createTemplate()`

    The **createTemplate** is a higher order function which helps you build and work with a template. The first step is providing the template:

    ```ts
    const t1 = createTemplate(`Hi {{string}} how's {{string}}`);
    ```

    Once the template has been created you are provided the `Template` API which includes a function at it's base:

    ```ts
    // "Hi Bob how's you're sister"
    const value = t1("Bob", "you're sister");
    ```

    This base function requires that all parameters be provided to complete the template but in addition to this base function you have the following properties to work with:

    ```ts
    // Template<[string, string], ["Bob"]>
    const t2 = t1.apply("Bob"); // allows for _partial_ application of the parameters
    // ["Bob"]
    const params = t2.params; // the parameters which have been applied so far
    // ["{{string}}", "{{string}}"]
    const blocks = t2.blocks; // the dynamic blocks in the template
    // [ string, string ]
    const types = t2.types; // the underlying types which the original template needs to be fully applied
    // [ string ]
    const remainingParams = t2.remaining; // the _remaining_ values needed to
    ```

    Beyond these informational properties and the `.apply()` utility which provides the ability to fill in the template bit by bit, there are two more utility functions exposed:

    #### `Template.extends(string): boolean`

    You can test whether a full string _extends_ the template's structure while filling in the dynamic segments with valid types.

    #### `Template.infer(string): readonly unknown[]`

    When given a string that _extends_ the template, we return a tuple of the dynamic values found in the template.

    > In many ways, the `infer` function is the inverse of the base function:
    >
    > - in the base you provide only the data needed to _complete_ the template,
    > - with `infer` you provide a completed template string and _extract_ the dynamic parts.
