# Templating

There are a million different situations where you will want to create a "template" of some text and then later _interpolate_ some key/values into that text in the appropriate places.

This library provides a number of type and runtime primitives to help you do this.

## Core Tools

1. `asTemplate()` - describe a template using prescriptive tags and immediately transform the _type_ to model what you expect/want in that part of the text content
2. `applyTemplate()`

## Example Usage

### For Library Authors

If you're a library author who's keen on keeping your types as narrow as possible, there's a pattern this library uses often which is to define enumerated sets as **constants** first and then derive the type from them.

This is useful because you now have a runtime and type pairing which can be leveraged in type guards and other runtime utilities. Here's a simple example:

```ts
const DAY_OF_WEEK = [
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
] as const;

type DayOfWeek = typeof DAY_OF_WEEK[number];

function isDayOfWeek(val: unknown): val is DayOfWeek {
  return isString(val) && DAY_OF_WEEK.includes(val);
}
```

This pattern can be used in a lot of places but in some cases the type system wants to represent _patterns_ which the runtime system can't represent but you still want to leverage this design pattern.

Let's imagine a situation where you had a string literal and you wanted to make a reference in it somewhere that "at this point" a number should be placed here:

```ts
const template = `It is ${number} degrees outside`;
```

The string literal above shows the PATTERN you want to represent but there's no defacto way of representing this pattern in the runtime system.

This is where `asTemplate()` can come in:

```ts
const TEMP_EXPRESSIONS = [
  asTemplate("It is {{number}} degrees outside"),
  asTemplate("It is darn {{hot|cold}}, the thermometer says it's {{number}} degrees outside")
] as const;
```

This will convert all instances of `{{number}}` into the _type_ `${number}`. It will also convert `{{hot|cold}}` into the union type `"hot" | "cold"`.

```ts
type TemplateInteger = AsTemplateTag<
  "integer",
  number, // type system upgrade
  Integer, // branded upgrade
  isInteger // type guard
>

const integer = asTemplateTag(
  "integer",
  isInteger, // type guard
  t => [t.number(), t.number().integer()] // dual type outcome
)

const number = asTemplateTag(
  "number",
  isNumber,
  t => t.number() // single type outcome
)

const date = asTemplateTag(
  "date",
  isIso8601Date,
  isDateLike,
)

const gammar = createTokenGrammar("{{","}}","::");
const templateGrammar = grammar(integer,number,date);

// the _future type_ of the template when interpolated with valid data
const expected = templateGrammar.shape();
//
const outcome = templateGrammar.parse(text, { ..kv.. });
```

Having heard this, you may now expect that `{{boolean}}` would be converted to the union of `"true" | "false"` and you wouldn't be wrong but it doesn't stop there:

- `{{integer}}` converts to the type `${Integer}` from this library
- `{{date}}` converts to the type `${Iso8601Date}` from this library
- `{{csv}}` converts to the type `${Csv}` from this library
- `{{time}}` converts to the type `${Iso8601Time}` from this library
- `{{datetime}}` converts to the type `${Iso8601DateTime}` from this library
- `{{object}}` converts to the type `${ObjectRepresentation}` from this library
- `{{array}}` converts to the type `${ArrayRepresentation}` from this library
- `{{tuple}}` converts to the type `${TupleRepresentation}` from this library
- `{{ipv4}}` converts to the type `${Ip4Address}` from this library
- `{{ipv6}}` converts to the type `${Ip6Address}` from this library
- `{{uri}}` converts to the type `${Uri}` from this library
- `{{regex}}` converts to the type `${RegExpRepresentation}` from this library

It's important to understand that these types provide the type constraints to help ensure the type is correct and while sometimes the type grammar is able to capture all requirements for a variable it is equally as likely that that either isn't possible or it's too expensive (from a type inference standpoint) to do this in the type system.

As a "for instance", the IPv6 format is far too complex to _fully type_ in typescript. For that matter so is IPv4; you may get close here but the type would be not be high performing and so complex to look at that it's not nearly as "explanatory" as just `${number}.${number}.${number}.${number}`.

This means that providng a type for these types provides guard rails but not a guarentee. We often look at validation libraries or processes as being necessary due to IO (aka, externalities to your safe type environment) and there is some validity in that idea but the truth is as powerful as Typescript inference is it still needs to work with the runtime environment at times to validate non-trivial pattern based types.

Fortunately, we've got you covered here. For all of the types mentioned above this library not only has type guards which are prescriptive but it also packages them up for you to use conveniently when using templates.

```ts
// create a validator for your template
const isValid = applyTemplate(template).validate;

// Now you can pass values at runtime into the validator which
// return either:
//
// 1. a type literal string if validation passes
// 2. a `InvalidTemplateString` error otherwise
if (isNotError(isValid(value))) {
  // value will be strongly typed and you will know at runtime that it has been
  // validated
} else {
  // you can handle the error how you like
}
```

### Use in AI

Another common use case these days is _prompting_ in AI. Unlike
