# Inferred Types

A collection of Typescript primitives which help to facilitate advanced type strong opertions with greater ease. This includes:

**Functions**

- `Model` - wraps the popular `io-ts` codec/type class in a way that ensures that the model's name is seen as a _literal type_ rather than just being represented as a `string` as it is in `io-ts`.
- `Configurator` - provides a configurator which is intended to allow a type strong dictionary to be built up as part of a builder pattern
- `FluentConfigurator` - provides a fluent style API which also provides a similar feature set to the base `Configurator`.
- `arrayToObjectKind` and `arrayToObjectName` takes an array of objects which discriminate on the property `kind`/`name` and converts it into a strongly typed dictionary.

**Types**

- `PascalCase`, `CamelCase`, `DashToSnake`, and `KebabCase` are all utility classes which will convert a literal type to a transformed literal type of the appropriate casing.
- `Pluralize` takes a literal type and transforms it into the plural version of the type.

