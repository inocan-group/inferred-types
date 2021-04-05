# Inferred Types

A collection of Typescript primitives which help to facilitate advanced type strong opertions with greater ease. This includes:

**Functions**

- `Model` - wraps the popular `io-ts` codec/type class in a way that ensures that the model's name is seen as a _literal type_ rather than just a `string` as it is in `io-ts`. This helps TS's inference downstream.
- `Configurator` - provides a configurator which is intended to allow a type strong dictionary to be built up as part of a builder pattern
- `FluentConfigurator` - provides a fluent style API which also provides a similar feature set to the base `Configurator`.
- `arrayToObjectKind` and `arrayToObjectName` takes an array of objects which discriminate on the property `kind`/`name` and converts it into a strongly typed dictionary.

**Types**

- `PascalCase`, `CamelCase`, `DashToSnake`, and `KebabCase` are all utility classes which will convert a literal type to a transformed literal type of the appropriate casing.
- `Pluralize` takes a literal type and transforms it into the plural version of the type.


All symbols are typed and exported in both CommonJS and ESModule format.

## Devops

This repo uses **pnpm** to bring in all deps. Please use that instead of **npm**, **yarn**, or whatever your favorite package manager is these days. The main things you will be interested in while working this repo are:

- `pnpm build` - transpiles the Typescript source to javascript and typings files off of /dist; it uses Rollup to do this.
- `pnpm lint` - linting is part of the build process but sometimes you just want see the lint results without the parts of the build done
- `pnpm build:bundle` - if you have things which are not passing yet lint muster but you need to just test the executable code _as-is_ is building you can do that with this target


## Contributing

Contributions are welcome as pull requests. To aid in making this process efficient, please note:

- We use the _git-flow_ standard for branch naming and therefore, if you're wanting to merge in a PR please target it at the **@develop** branch and we will review it before merging it in. Once in develop we'll run it through CI-CD there and merge it into @master and deploy a new version of **npm**.
- New code requires _new_ (or at least _updated_) test cases to demonstrate both the intended effect and ensure this effect is preserved into the future; please expect us to reject the PR if there is no attempt to show 

**Note:** all our coding standards have been hopefully incorporated as **eslint** rules and therefore stylistically so long as you're saving using these rules along with prettier we should be in good shape for the PR review to just focus on the "real stuff".

