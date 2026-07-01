---
$schema:
    spec: file(required; match(**/*spec*.md))
    design: file(match(**/*design*.md))
    iteration: number(required)
    plan: file
description: |-
    Implements the _findings_ from a review which was conducted to determine the drift between what was actually implemented versus the specification that was being targetted in that implementation.
iteration: "{{ frontmatter(spec, 'review_iterations') ? frontmatter(spec, 'review_iterations') || 1 : 1 }}"
review: "{{ dirname(spec) + '/' + 'review-' + iteration + '.md' }}"
# is the review "production ready"?
ready: "{{ review && file_exists(review) ? frontmatter(review, 'ready') : null }}"

design: "{{ file_exists(dirname(review) + '/design.md') ? dirname(review) + '/design.md' : null }}"

feature_or_fix: "{{ contains(spec, 'fixes') ? 'fix' : 'feature' }}"

start:
    message: "🏃 starting implementation #{{ file_index(review) }} of `{{ parent_dir(review) }}` review suggestions (_using_ {{ctx.agent}}/{{ctx.model}} _in_ {{ctx.repo}})"
success:
    message: "✅  implemented suggestions from review **#{{ file_index(review) }}** of `{{ parent_dir(review) }}` in **{{ctx.repo}}** repo"
    say: "the review suggestions for {{ title_case(without_date(parent_dir(review))) }} in {{ctx.repo}} completed successfully"
    effect: bong
failure:
    message: "💥 implementation of the review #{{iteration}} suggestions from **{{ parent_dir(review) }}** failed to complete ({{err.message}})!"
    effect: sad-trombone
---

# Implement Review Suggestions for {{title_case(without_date(parent_dir(spec)))}}

> - **{{capitalize(feature_or_fix)}}:** `{{parent_dir(review)}}`
> - **Iteration:** {{iteration}}

## Key Documents

- **Review:** {{review}}
- **Iteration:** {{file_index(review)}}
- **Specification:** {{contains(spec, ctx.area) ? '@' + spec : '@' + ctx.area + '/' + spec }}
::block when="design"
- **Design:** {{design}}
::end-block

::block when="spec"
> **Note:**
>
> The review who's suggestions you are tasked with implementing was based
> on the detected _delta_ between the specification file above and the
> actual implementation source code.
::block when="design"
>
> The design document above was created as a complimentary document to the
> specification file.
::end-block
::end-block

## Skill Selection

- use the '{{ctx.area}}' agent skill for package-area context
- use the 'development' skill before implementing changes (quality standards, TODO prevention, completion criteria)
- use the 'testing' skill **before writing or editing any test file** (runtime vs. type-test patterns) — this is mandatory
- use the 'parsing' skill when the suggestion touches token / template-literal / `take` parsing utilities

::block when="ready"
The review was marked as being **production ready** so there is no longer a need to continue the review-to-implement loop.

Explain this to the caller and then exit.
::end-block
::block when="!ready"
The review file above has completed in the {{ctx.area}} package area with a number of suggestions for implementation.

Your task is to:

1. Act as an orchestrator and iterate over each suggestion (serially)
2. For each suggestion call a subagent to:
    - implement the suggestion, preserving the repo's narrow-typing discipline (no pass-through types, no `any` cop-outs, no `TODO`/`FIXME` markers) and its import rules (`inferred-types/{constants,types,runtime}`, never `@inferred-types/*`)
    - add tests to provide full coverage for the suggestion, matching the **symbol type** being changed:
        - **type-only utilities** → type tests (`type cases = [...]` with `Expect<Test<...>>` / `AssertEqual`)
        - **plain runtime functions** → runtime tests (`expect(...)`); add type tests if complex types are involved
        - **runtime-mirror functions** → **both** runtime assertions and type assertions on the same result, so the value and its inferred type stay aligned
    - make sure the implementation passes runtime tests (`pnpm test {{ctx.area}}`) and type tests (`pnpm test:types {{ctx.area}}`, equivalently `typed test {{ctx.area}}`)
    - make sure there are no lint errors (`pnpm lint`)
    - tell the subagent to use the 'development', 'testing', and '{{ctx.area}}' agent skills (and 'parsing' when relevant)
    - remind the subagent that it is running in a **non-interactive session** and cannot ask the user for feedback or permissions
3. When all suggestions have been implemented, set the `implemented` frontmatter property to `true` on the review file: {{review}}

::end-block
