# Deferred Items

Runtime whole-module source checking now runs plain `tsc` through
`modules/runtime/tsconfig.check.json` with no `noCheck` override. The remaining
runtime diagnostics, including seven full-graph complexity diagnostics, are
captured by `just check-runtime` in
`features/2026-07-02-complex/runtime-module-diagnostics-deferred.txt` and are
deferred as runtime source strictness debt.

## Deferred Runtime Source Diagnostics

Runtime source diagnostics are accepted only when both of these inventories
match:

1. `features/2026-07-02-complex/runtime-module-diagnostics-deferred.txt`
   contains the exact generated diagnostic identities from plain `tsc`.
2. The file-level rows below document every diagnostic-bearing runtime surface
   with the exact total, code distribution, and review justification.

`just check-runtime` enforces both layers. A new diagnostic, removed diagnostic,
changed line identity, missing documentation row, stale count, stale code
distribution, or placeholder justification fails the guard. The runtime source
target remains full burn-down; this table is an accepted inventory for the
current check-mode debt, not a broader waiver.

### Exact Runtime Diagnostic File Inventory

Each row is `runtime source | symbol or surface | diagnostic total | diagnostic
code counts | justification`. Per-diagnostic file, line, column, and message
identities remain in `runtime-module-diagnostics-deferred.txt` and are exact
matched by `just check-runtime`.

| Runtime source | Symbol or surface | Diagnostics | Codes | Justification |
| --- | --- | ---: | --- | --- |
| `modules/runtime/src/containers/freeze.ts` | `freeze` | `1` | `TS2488:1` | recursive container immutability boundary over generic object/array input; exact diagnostic identities stay locked while this mirror is narrowed. |
| `modules/runtime/src/css/createCssKeyframe.ts` | `createCssKeyframe` | `3` | `TS2344:2, TS2345:1` | CSS definition parsing and keyframe tuple normalization over generic records; exact diagnostics stay locked until the CSS runtime mirror contracts are tightened. |
| `modules/runtime/src/css/parseColor.ts` | `parseColor` | `3` | `TS2344:1, TS2345:2` | CSS definition parsing and keyframe tuple normalization over generic records; exact diagnostics stay locked until the CSS runtime mirror contracts are tightened. |
| `modules/runtime/src/datetime/asDate.ts` | `asDate` | `4` | `TS18047:1, TS2339:3` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/asDateTime.ts` | `asDateTime` | `41` | `TS18049:3, TS2322:21, TS2339:8, TS2352:6, TS2591:3` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/asIsoDateTime.ts` | `asIsoDateTime` | `2` | `TS2322:1, TS2352:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/asTwoDigitMonth.ts` | `asTwoDigitMonth` | `3` | `TS2469:2, TS2731:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/dateObjectToIso.ts` | `dateObjectToIso` | `2` | `TS2345:1, TS2352:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/daysInMonth.ts` | `daysInMonth` | `1` | `TS2352:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/getDay.ts` | `getDay` | `1` | `TS2345:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/getDaysBetween.ts` | `getDaysBetween` | `2` | `TS2345:2` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/getMonthNumber.ts` | `getMonthNumber` | `4` | `TS2345:1, TS2352:1, TS2536:2` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/getSeason.ts` | `getSeason` | `1` | `TS2536:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/getToday.ts` | `getToday` | `1` | `TS2352:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/getTomorrow.ts` | `getTomorrow` | `1` | `TS2352:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/getWeekNumber.ts` | `getWeekNumber` | `1` | `TS2345:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/getYear.ts` | `getYear` | `1` | `TS2352:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/getYesterday.ts` | `getYesterday` | `1` | `TS2352:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/isDoubleLeap.ts` | `isDoubleLeap` | `1` | `TS2345:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/isToday.ts` | `isToday` | `5` | `TS18049:1, TS2339:1, TS2367:2, TS2551:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/isTomorrow.ts` | `isTomorrow` | `2` | `TS2345:1, TS2367:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/isYesterday.ts` | `isYesterday` | `1` | `TS2367:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/parseDateObject.ts` | `parseDateObject` | `1` | `TS2345:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/parseIsoDate.ts` | `parseIsoDate` | `2` | `TS18047:1, TS2339:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/datetime/parseNumericDate.ts` | `parseNumericDate` | `1` | `TS2739:1` | date-like overload narrowing and third-party date facade parity under whole-module checking; runtime behavior remains covered while exact diagnostics stay locked. |
| `modules/runtime/src/dictionary/defineObject.ts` | `defineObject` | `2` | `TS2322:1, TS2339:1` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/dictionary/defineOptions.ts` | `defineOptions` | `1` | `TS2344:1` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/dictionary/entries.ts` | `entries` | `1` | `TS2488:1` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/dictionary/get.ts` | `get` | `2` | `TS2345:2` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/dictionary/omitKeys.ts` | `omitKeys` | `2` | `TS2344:2` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/dictionary/usingLookup.ts` | `usingLookup` | `6` | `TS18049:1, TS2322:1, TS2536:2, TS2537:2` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/dictionary/valuesOf.ts` | `valuesOf` | `1` | `TS2352:1` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/dictionary/withoutKeys.ts` | `withoutKeys` | `1` | `TS2537:1` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/dictionary/withoutValue.ts` | `withoutValue` | `1` | `TS2339:1` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/dictionary/withValue.ts` | `withValue` | `1` | `TS2339:1` | object key/value generic narrowing at runtime mirror boundaries; exact diagnostics stay locked while dictionary helper contracts are tightened. |
| `modules/runtime/src/domain/color/asRgbaObject.ts` | `asRgbaObject` | `3` | `TS2536:1, TS2698:2` | color and nesting domain parser/config narrowing under generic inputs; exact diagnostics stay locked while domain helper contracts are tightened. |
| `modules/runtime/src/domain/color/asRgbObject.ts` | `asRgbObject` | `5` | `TS2339:3, TS2345:1, TS2536:1` | color and nesting domain parser/config narrowing under generic inputs; exact diagnostics stay locked while domain helper contracts are tightened. |
| `modules/runtime/src/domain/color/hexColorToRgb.ts` | `hexColorToRgb` | `6` | `TS18049:3, TS2339:3` | color and nesting domain parser/config narrowing under generic inputs; exact diagnostics stay locked while domain helper contracts are tightened. |
| `modules/runtime/src/domain/color/isHexColor.ts` | `isHexColor` | `1` | `TS2345:1` | color and nesting domain parser/config narrowing under generic inputs; exact diagnostics stay locked while domain helper contracts are tightened. |
| `modules/runtime/src/domain/nesting/assignNamedConfig.ts` | `assignNamedConfig` | `6` | `TS2678:6` | color and nesting domain parser/config narrowing under generic inputs; exact diagnostics stay locked while domain helper contracts are tightened. |
| `modules/runtime/src/domain/nesting/createNestingConfig.ts` | `createNestingConfig` | `2` | `TS2352:2` | color and nesting domain parser/config narrowing under generic inputs; exact diagnostics stay locked while domain helper contracts are tightened. |
| `modules/runtime/src/domain/nesting/isNestingEnd.ts` | `isNestingEnd` | `1` | `TS2488:1` | color and nesting domain parser/config narrowing under generic inputs; exact diagnostics stay locked while domain helper contracts are tightened. |
| `modules/runtime/src/domain/nesting/isNestingEndMatch.ts` | `isNestingEndMatch` | `2` | `TS2488:1, TS2538:1` | color and nesting domain parser/config narrowing under generic inputs; exact diagnostics stay locked while domain helper contracts are tightened. |
| `modules/runtime/src/domain/nesting/nesting.ts` | `nesting` | `6` | `TS2345:2, TS2693:1, TS7006:3` | color and nesting domain parser/config narrowing under generic inputs; exact diagnostics stay locked while domain helper contracts are tightened. |
| `modules/runtime/src/errors/err.ts` | `err` | `20` | `TS18049:8, TS2339:7, TS2345:1, TS2352:3, TS7053:1` | typed error object enrichment under generic inputs; exact diagnostics stay locked while the error facade contract is tightened. |
| `modules/runtime/src/index.ts` | `index` | `2` | `TS2308:2` | barrel export ambiguity from overlapping runtime submodules; exact diagnostics stay locked until exports are made explicit. |
| `modules/runtime/src/initializers/addFnToProps.ts` | `addFnToProps` | `1` | `TS2345:1` | function-with-props initializer overload compatibility; exact diagnostics stay locked while callable-object contracts are tightened. |
| `modules/runtime/src/initializers/addPropsToFn.ts` | `addPropsToFn` | `1` | `TS2345:1` | function-with-props initializer overload compatibility; exact diagnostics stay locked while callable-object contracts are tightened. |
| `modules/runtime/src/initializers/createFnWithProps.ts` | `createFnWithProps` | `1` | `TS2394:1` | function-with-props initializer overload compatibility; exact diagnostics stay locked while callable-object contracts are tightened. |
| `modules/runtime/src/lists/createComparison.ts` | `createComparison` | `1` | `TS7053:1` | list comparator/converter generic narrowing over predicate and key configs; exact diagnostics stay locked while list helper contracts are tightened. |
| `modules/runtime/src/lists/createConverter.ts` | `createConverter` | `5` | `TS2349:5` | list comparator/converter generic narrowing over predicate and key configs; exact diagnostics stay locked while list helper contracts are tightened. |
| `modules/runtime/src/lists/every.ts` | `every` | `1` | `TS2345:1` | list comparator/converter generic narrowing over predicate and key configs; exact diagnostics stay locked while list helper contracts are tightened. |
| `modules/runtime/src/lists/filter.ts` | `filter` | `1` | `TS2345:1` | list comparator/converter generic narrowing over predicate and key configs; exact diagnostics stay locked while list helper contracts are tightened. |
| `modules/runtime/src/lists/find.ts` | `find` | `1` | `TS2345:1` | list comparator/converter generic narrowing over predicate and key configs; exact diagnostics stay locked while list helper contracts are tightened. |
| `modules/runtime/src/lists/fromCsv.ts` | `fromCsv` | `4` | `TS18046:1, TS2352:2, TS7006:1` | list comparator/converter generic narrowing over predicate and key configs; exact diagnostics stay locked while list helper contracts are tightened. |
| `modules/runtime/src/lists/sortByKey.ts` | `sortByKey` | `20` | `TS18049:4, TS2339:4, TS2536:12` | list comparator/converter generic narrowing over predicate and key configs; exact diagnostics stay locked while list helper contracts are tightened. |
| `modules/runtime/src/meta/urlMeta.ts` | `urlMeta` | `15` | `TS2304:6, TS2322:1, TS2589:6, TS7006:2` | URL and media metadata extraction over template-literal types; exact diagnostics, including URL complexity points, stay locked while parser internals are split. |
| `modules/runtime/src/meta/youtube-meta.ts` | `youtube-meta` | `1` | `TS2339:1` | URL and media metadata extraction over template-literal types; exact diagnostics, including URL complexity points, stay locked while parser internals are split. |
| `modules/runtime/src/numeric/add.ts` | `add` | `9` | `TS2304:4, TS2322:2, TS2352:1, TS2365:2` | numeric runtime mirror imports and cast boundaries for literal arithmetic helpers; exact diagnostics stay locked while numeric facade contracts are restored. |
| `modules/runtime/src/numeric/decrement.ts` | `decrement` | `3` | `TS2352:1, TS2362:2` | numeric runtime mirror imports and cast boundaries for literal arithmetic helpers; exact diagnostics stay locked while numeric facade contracts are restored. |
| `modules/runtime/src/numeric/increment.ts` | `increment` | `2` | `TS2352:1, TS2365:1` | numeric runtime mirror imports and cast boundaries for literal arithmetic helpers; exact diagnostics stay locked while numeric facade contracts are restored. |
| `modules/runtime/src/numeric/lessThan.ts` | `lessThan` | `1` | `TS2352:1` | numeric runtime mirror imports and cast boundaries for literal arithmetic helpers; exact diagnostics stay locked while numeric facade contracts are restored. |
| `modules/runtime/src/numeric/lessThanOrEqual.ts` | `lessThanOrEqual` | `1` | `TS2352:1` | numeric runtime mirror imports and cast boundaries for literal arithmetic helpers; exact diagnostics stay locked while numeric facade contracts are restored. |
| `modules/runtime/src/numeric/precision.ts` | `precision` | `1` | `TS2731:1` | numeric runtime mirror imports and cast boundaries for literal arithmetic helpers; exact diagnostics stay locked while numeric facade contracts are restored. |
| `modules/runtime/src/queues/fifo.ts` | `fifo` | `2` | `TS7006:1, TS7019:1` | queue state and tuple mutation helpers over generic item lists; exact diagnostics stay locked while queue contracts are tightened. |
| `modules/runtime/src/queues/lifo.ts` | `lifo` | `2` | `TS7006:1, TS7019:1` | queue state and tuple mutation helpers over generic item lists; exact diagnostics stay locked while queue contracts are tightened. |
| `modules/runtime/src/regex/createTemplateRegExp.ts` | `createTemplateRegExp` | `2` | `TS2322:1, TS2769:1` | template RegExp construction over tokenized literal sections; exact diagnostics stay locked while token section contracts are tightened. |
| `modules/runtime/src/runtime-types/asTypedErr.ts` | `asTypedErr` | `4` | `TS2304:2, TS2322:1, TS2339:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/createLexer.ts` | `createLexer` | `4` | `TS18046:3, TS2345:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/defineObjectWith.ts` | `defineObjectWith` | `3` | `TS2339:1, TS2537:2` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/doesExtend.ts` | `doesExtend` | `10` | `TS18049:2, TS2339:4, TS7006:4` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/shape-helpers/atomics.ts` | `atomics` | `1` | `TS2352:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/shape-helpers/getTokenData.ts` | `getTokenData` | `2` | `TS2345:1, TS2532:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/shape-helpers/wide-containers.ts` | `wide-containers` | `6` | `TS2344:6` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/shape.ts` | `shape` | `3` | `TS18049:1, TS2339:1, TS2345:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/asType.ts` | `asType` | `4` | `TS2339:1, TS2345:2, TS2533:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/createToken.ts` | `createToken` | `6` | `TS2322:2, TS7006:4` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/asStringInputToken.ts` | `asStringInputToken` | `2` | `TS2322:1, TS2345:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/fromDefineObject.ts` | `fromDefineObject` | `1` | `TS2345:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/fromDefineTuple.ts` | `fromDefineTuple` | `1` | `TS2345:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/fromInputToken.ts` | `fromInputToken` | `2` | `TS18049:1, TS2339:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/take/it_takeArray.ts` | `it_takeArray` | `6` | `TS2322:3, TS2345:1, TS2352:1, TS2724:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/take/it_takeGroup.ts` | `it_takeGroup` | `2` | `TS2322:2` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/take/it_takeIntersection.ts` | `it_takeIntersection` | `1` | `TS2322:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/take/it_takeNumericLiteral.ts` | `it_takeNumericLiteral` | `3` | `TS2322:3` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/take/it_takeStringLiteral.ts` | `it_takeStringLiteral` | `1` | `TS2322:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/runtime-types/tokens/input-tokens/take/it_takeUnion.ts` | `it_takeUnion` | `1` | `TS2322:1` | runtime-token parser and type facade boundary over recursive token definitions; exact diagnostics stay locked while token helper contracts are tightened. |
| `modules/runtime/src/string-literals/color/cssColor.ts` | `cssColor` | `6` | `TS2352:1, TS2731:5` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/color/twColor.ts` | `twColor` | `9` | `TS18049:2, TS2322:4, TS2536:3` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/ifLowercase.ts` | `ifLowercase` | `1` | `TS2344:1` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/ifUppercase.ts` | `ifUppercase` | `2` | `TS2345:2` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/infer.ts` | `infer` | `7` | `TS2322:6, TS2589:1` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/replace.ts` | `replace` | `1` | `TS2345:1` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/split-and-join/nestedSplit.ts` | `nestedSplit` | `13` | `TS2345:10, TS2352:3` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/sub-string/retain/retainChars.ts` | `retainChars` | `1` | `TS2322:1` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/sub-string/retain/retainUntil__Nested.ts` | `retainUntil__Nested` | `19` | `TS2339:9, TS2344:1, TS2345:4, TS2352:2, TS2536:2, TS2551:1` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/sub-string/retain/retainWhile.ts` | `retainWhile` | `1` | `TS2345:1` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/sub-string/strip/stripChars.ts` | `stripChars` | `1` | `TS2322:1` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/sub-string/strip/stripUntil.ts` | `stripUntil` | `1` | `TS2345:1` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/string-literals/sub-string/strip/stripWhile.ts` | `stripWhile` | `1` | `TS2345:1` | literal parser/runtime mirror casts over nested strings, colors, templates, and casing; exact diagnostics stay locked while parser contracts are tightened. |
| `modules/runtime/src/take/create/createTakeFunction.ts` | `createTakeFunction` | `4` | `TS2349:1, TS2533:1, TS2707:1, TS2723:1` | parser-combinator state narrowing over recursive take/drop helpers; exact diagnostics stay locked while parser state contracts are tightened. |
| `modules/runtime/src/take/create/createTakeStaticBlockFunction.ts` | `createTakeStaticBlockFunction` | `5` | `TS2322:1, TS2344:1, TS2345:2, TS7006:1` | parser-combinator state narrowing over recursive take/drop helpers; exact diagnostics stay locked while parser state contracts are tightened. |
| `modules/runtime/src/take/create/createTakeWhileFunction.ts` | `createTakeWhileFunction` | `2` | `TS2322:1, TS2345:1` | parser-combinator state narrowing over recursive take/drop helpers; exact diagnostics stay locked while parser state contracts are tightened. |
| `modules/runtime/src/take/dropParser.ts` | `dropParser` | `19` | `TS18049:7, TS2339:7, TS2352:1, TS2536:4` | parser-combinator state narrowing over recursive take/drop helpers; exact diagnostics stay locked while parser state contracts are tightened. |
| `modules/runtime/src/take/take.ts` | `take` | `12` | `TS18049:1, TS2344:5, TS2345:3, TS2349:1, TS2488:1, TS2723:1` | parser-combinator state narrowing over recursive take/drop helpers; exact diagnostics stay locked while parser state contracts are tightened. |
| `modules/runtime/src/take/takeStart.ts` | `takeStart` | `21` | `TS18046:1, TS18048:1, TS18049:1, TS2345:5, TS2349:1, TS2367:2, TS2370:1, TS2488:6, TS2536:2, TS7053:1` | parser-combinator state narrowing over recursive take/drop helpers; exact diagnostics stay locked while parser state contracts are tightened. |
| `modules/runtime/src/type-conversion/asFromTo.ts` | `asFromTo` | `2` | `TS2322:1, TS2769:1` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/asTemplate.ts` | `asTemplate` | `8` | `TS2322:3, TS2344:3, TS2538:2` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/asTypeSubtype.ts` | `asTypeSubtype` | `1` | `TS2352:1` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/csv.ts` | `csv` | `1` | `TS2352:1` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/eachAsString.ts` | `eachAsString` | `1` | `TS2352:1` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/encoding/createEncoder.ts` | `createEncoder` | `3` | `TS2345:1, TS2769:2` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/fromKeyValue.ts` | `fromKeyValue` | `2` | `TS2352:1, TS2538:1` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/lookupCountry.ts` | `lookupCountry` | `7` | `TS2345:4, TS2367:3` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/safe-string-encoding.ts` | `safe-string-encoding` | `1` | `TS2769:1` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/toJSON.ts` | `toJSON` | `4` | `TS2344:2, TS2352:2` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/toString.ts` | `toString` | `2` | `TS2344:1, TS2352:1` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-conversion/toStringLiteral.ts` | `toStringLiteral` | `3` | `TS2339:1, TS2488:1, TS2698:1` | runtime converter return narrowing and validated cast boundaries; exact diagnostics stay locked while conversion contracts are tightened. |
| `modules/runtime/src/type-guards/datetime/isIsoMonthDate.ts` | `isIsoMonthDate` | `2` | `TS2345:1, TS2352:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/higher-order/isTuple.ts` | `isTuple` | `1` | `TS2345:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/higher-order/startsWith.ts` | `startsWith` | `2` | `TS2322:2` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/html/html-tags.ts` | `html-tags` | `2` | `TS18049:1, TS2339:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/isAlpha.ts` | `isAlpha` | `1` | `TS2345:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/isDoneFn.ts` | `isDoneFn` | `1` | `TS2677:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/isHexadecimal.ts` | `isHexadecimal` | `1` | `TS18046:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/isIndexable.ts` | `isIndexable` | `1` | `TS2339:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/isNotNull.ts` | `isNotNull` | `1` | `TS2304:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/isVariable.ts` | `isVariable` | `1` | `TS2345:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/metrics/isMetric.ts` | `isMetric` | `1` | `TS2731:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/network-tg.ts` | `network-tg` | `2` | `TS2345:1, TS2677:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/protocol.ts` | `protocol` | `2` | `TS2322:2` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/tw/tw-color.ts` | `tw-color` | `14` | `TS2322:14` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |
| `modules/runtime/src/type-guards/urls/youtube.ts` | `youtube` | `2` | `TS2345:1, TS2731:1` | guard predicate narrowing under the runtime check facade; exact diagnostics stay locked while predicate contracts are tightened. |

## Tracked Complexity Suppressions

The following entries are the complete set of accepted complexity-class
`@ts-expect-error` suppressions in source. Each suppression must remain paired
with a local explanatory comment, and `just perf-compare` fails if a
complexity-class suppression appears in `modules/{types,runtime,constants}/src`
without being represented exactly by one of the identity rows below. Duplicate
rows are intentional where the same file carries multiple suppressions with the
same diagnostic code and comment text.

### 1. Numeric literal arithmetic

These utilities keep narrow results for small literal inputs and intentionally
fall back to `number` or typed errors for wide, unsupported, or unsafe cases.
The suppressed source-context instantiations occur before those public guards
can fully narrow unresolved generic parameters.

- `modules/types/src/numeric-literals/Mod.ts`
  - `Process`: tuple modulus over `SmallInt` values is bounded by the local
    recursion guard and covered by `Mod` type tests.
  - `Mod`: generic string/number dispatch preserves existing literal modulus
    behavior while bailing out to `number` outside the bounded range.
- `modules/types/src/numeric-literals/Divide.ts`
  - `Process`: tuple division over `SmallInt` values is bounded and preserves
    existing literal division behavior for tested values.
- `modules/types/src/numeric-literals/Delta.ts`
  - `Delta`: composes bounded numeric utilities and preserves narrow distance
    results for covered literal inputs.
- `modules/types/src/numeric-literals/CompareNumbers.ts`
  - `CompareNumbers`: source-context comparison over unresolved `NumberLike`
    constraints remains expensive, while concrete numeric comparisons are
    covered by type tests.
- `modules/types/src/numeric-literals/CSV.ts`
  - `CSV`: CSV tuple/union recursion is depth-capped and preserves existing
    comma-separated numeric literal behavior.
- `modules/types/src/numeric-literals/ShiftDecimalPlace.ts`
  - `ShiftDecimalPlace`: decimal-position shifting retains existing literal
    movement behavior, with source-context generic recursion bounded by guards.
- `modules/types/src/numeric-literals/Sum.ts`
  - `Sum`: tuple summation is depth-capped and preserves tested narrow sums.

### 2. Tuple, list, and recursive expansion helpers

These helpers preserve tuple shape for concrete callers. Their generic
source-context suppressions are accepted because replacing them with wider
aliases would lose documented tuple resolution.

- `modules/types/src/literals/ExpandRecursively.ts`
  - `ExpandRecursively`: recursively expands tuple/object literals for concrete
    callers while retaining the existing source-context recursion guard.
- `modules/types/src/lists/MakeOptional.ts`
  - `Process`: optionalizes tuple suffixes while preserving the required prefix
    for tested concrete tuples.
- `modules/types/src/lists/Pop.ts`
  - `Pop`: removes optional tuple elements while preserving existing tuple
    behavior in covered cases.
- `modules/types/src/lists/Shortest.ts`
  - `Shortest`: recursively compares generic string tuples and preserves the
    shortest-string result for concrete tuple inputs.

### 3. Token rendering and literal stringification

These utilities render type-level values into string-token forms. The tracked
suppressions avoid replacing precise token/literal output with broad `string`
for concrete inputs.

- `modules/types/src/runtime-types/tokens/OutputToken.ts`
  - `AsOutputToken`: object-token JSON rendering can produce a broad source
    expansion for unresolved generic objects, while concrete token behavior is
    covered by runtime-token tests.
- `modules/types/src/type-conversion/ToStringLiteral.ts`
  - `ToStringLiteral`: recursive literal stringification preserves concrete
    scalar/container string output and is covered by conversion tests.

### 4. Runtime type and nesting parsers

These parser utilities are recursive by design and already carry depth or shape
guards. Their suppressions preserve existing parse precision for concrete input
strings and nesting configurations.

- `modules/types/src/runtime-types/type-defn/input-tokens/IT_TakeIntersection.ts`
  - `IT_TakeIntersection`: intersection-token parsing remains precise for
    concrete inputs and is covered by input-token parser tests.
- `modules/types/src/domains/nesting/helpers/IsExitToken.ts`
  - `IsExitToken`: recursive nesting configuration lookup is guarded by
    concrete configuration coverage in nesting tests.
- `modules/types/src/string-literals/mutation/Nest.ts`
  - `TakeNestedString`: nested-string parsing is depth-capped and preserves
    existing concrete nesting parse results.

### Exact suppression identities

Each row is `file | diagnostic | suppression line text`.

- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple modulus helper is bounded to SmallInt; concrete behavior is covered by Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple modulus helper is bounded to SmallInt; concrete behavior is covered by Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: generic modulus dispatch is covered by source guards and Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: generic modulus dispatch is covered by source guards and Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: generic modulus dispatch is covered by source guards and Mod tests.`
- `modules/types/src/numeric-literals/Mod.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple modulus helper is bounded to SmallInt; concrete behavior is covered by Mod tests.`
- `modules/types/src/type-conversion/ToStringLiteral.ts` | `TS2589` | `// @ts-expect-error TS2589: generic literal stringification recursion is source-context expensive; concrete conversions are covered by tests.`
- `modules/types/src/numeric-literals/CompareNumbers.ts` | `TS2589` | `// @ts-expect-error TS2589: source-context comparison over generic NumberLike constraints; concrete behavior is covered by CompareNumbers tests.`
- `modules/types/src/numeric-literals/Sum.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple summation is depth-capped and covered by Sum tests.`
- `modules/types/src/numeric-literals/CSV.ts` | `TS2589` | `// @ts-expect-error TS2589: CSV union recursion is depth-capped and covered by CSV tests.`
- `modules/types/src/lists/Pop.ts` | `TS2589` | `// @ts-expect-error TS2589: optional tuple pop recursion is covered by Pop tests.`
- `modules/types/src/runtime-types/tokens/OutputToken.ts` | `TS2590` | `// @ts-expect-error TS2590: generic object-token JSON expansion is too broad in source context; concrete behavior is covered by token tests.`
- `modules/types/src/numeric-literals/Divide.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple division helper is bounded to SmallInt; concrete behavior is covered by Divide tests.`
- `modules/types/src/numeric-literals/Divide.ts` | `TS2589` | `// @ts-expect-error TS2589: tuple division helper is bounded to SmallInt; concrete behavior is covered by Divide tests.`
- `modules/types/src/numeric-literals/ShiftDecimalPlace.ts` | `TS2589` | `// @ts-expect-error TS2589: generic decimal shifting is source-context expensive; concrete behavior is covered by ShiftDecimalPlace tests.`
- `modules/types/src/numeric-literals/Delta.ts` | `TS2589` | `// @ts-expect-error TS2589: generic delta composes bounded numeric utilities; concrete behavior is covered by Delta tests.`
- `modules/types/src/domains/nesting/helpers/IsExitToken.ts` | `TS2589` | `// @ts-expect-error TS2589/TS2344: generic nesting configs recurse deeply in source context; concrete configs are covered by nesting tests.`
- `modules/types/src/lists/Shortest.ts` | `TS2589` | `// @ts-expect-error TS2589: source-context recursion over generic string tuples; concrete behavior is covered by Shortest tests.`
- `modules/types/src/runtime-types/type-defn/input-tokens/IT_TakeIntersection.ts` | `TS2589` | `// @ts-expect-error TS2589: generic intersection parsing is source-context expensive; concrete behavior is covered by IT_TakeIntersection tests.`
- `modules/types/src/lists/MakeOptional.ts` | `TS2589` | `// @ts-expect-error TS2589: source-context recursion over generic tuple optionalization; concrete behavior is covered by MakeOptional tests.`
- `modules/types/src/literals/ExpandRecursively.ts` | `TS2589` | `// @ts-expect-error TS2589: generic tuple expansion is recursive by design; concrete callers are covered by type tests.`
- `modules/types/src/string-literals/mutation/Nest.ts` | `TS2589` | `// @ts-expect-error TS2589: recursive nesting parser is depth-capped; concrete behavior is covered by Nest tests.`
