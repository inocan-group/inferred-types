# Sorting Functionality

This repo provides both runtime and type utilities to support sorting of lists.

In both cases, the functionality is intended to mirror one another:

## Sort Strategy

The default sort strategy is "natural" which means ... nothing is sorted. However:

- in the next section you will see information about "pinning";
  - sometimes the natural sort order is fine and you just want to pin some items to the start or end of the list
- the other two options for sorting are "asc" (for ascending) and "desc" (for descending).
  - these sorts are fairly self explanatory but they can sort based on either:
    - the root type
    - an "offset" of a container type
  - When setting the `offset` property in options, you are expressing that
    - the expected _types_ in your list will be some sort of container (Dictionary, Map, WeakMap, or Array)
    - the offset will point _into_ that container to make the sorting comparison
    - items in the list which do not have this offset/index will be placed at the end of the list


## Pinning Items

- you can "pin" items to the beginning or end of a list by identifying it in the `start` or `end` properties of the options
- you can pin items by:
- specifying a _type_ which should be pinned to `start`/`end` property
- any items which _extend_ this type will be pinned
- the type you choose can be a literal type or a wide type
    - when literal items are used then the "sort order" of the pinned items will be the order in which items are defined
    - if wide types are used then the global sort
- if you used a literal tagging method then it will just put pinned items in on the order


## Type Utilities

### The `Sort` utility

The primary utility for sorting is unsurprisingly the `Sort<TList, TOpt>` utility.

Here are a few examples using basic sorting techniques:

```ts
// [1,2,5,6]
type S = Sort<[1,6,5,3], { sort: "asc" }>;
// [ {id: 1}, {id: 5}, {id: 6} ]
type S2 = Sort<[{id: 5}, {id: 1}, {id: 6}], { order: "asc", offset: "id" }>
```

In addition we can use the default sorting strategy of "natural" (aka, no sorting) and then use the pinning features exclusively:

```ts
// [ "foo", "bar", 1, 2, 3 ]
type S = Sort<[1,"foo",2,"bar",3], { start: string }>
// [ { id: 1, name: "Jane" }, { id: 9, name: "Bob" }, { id: 5, name: "John" }, { id: 12, name: "Roger" } ]
type S2 = Sort<[
    {id: 9, name: "Bob"},
    {id: 5, name: "John"},
    {id: 12, name: "Roger"},
    {id: 1, name: "Jane"},

], { start: 1, offset: "id" }
```

And finally we can combine both pinning and sorting:

```ts
// [ { id: 1, name: "Jane" }, { id: 5, name: "John" }, { id: 9, name: "Bob" }, { id: 12, name: "Roger" } ]
type S = Sort<[
    {id: 9, name: "Bob"},
    {id: 5, name: "John"},
    {id: 12, name: "Roger"},
    {id: 1, name: "Jane"},

], { start: 1, offset: "id", order: "asc" }
```

In this example `id` 1 is pinned to the top and the remaining items are sorted in an ascending manner using the `id` property to sort.


### The `ToKv` utility

The `ToKv<T>` is primarily focused on converting an dictionary object to a tuple of `KeyValue` elements. Whereas an object has no guarantees regarding the ordering an array/tuple does. For this reason, it allows the tuple output to be sorted in whatever way the user wants by leveraging the `Sort` utility.



## Runtime Utilities


