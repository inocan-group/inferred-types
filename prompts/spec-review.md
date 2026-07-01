---
$schema:
    spec: file(required)
description: Reviews a draft specification inline and updates the spec file

start:
    message: "👀 reviewing the specification file: `{{spec}}`"
success:
    say: "The review of the draft specification file has completed"
    message: "✅ review of the draft specification `{{spec}}` has completed"
    info: "review of the draft specification in **{{ctx.repo}}** has completed: {{ link(spec) }}"
failure:
    say: "The review of the draft specification in {{ctx.repo}} failed to complete!"
    warn: "The review of the draft specification in {{ctx.repo}} failed to complete: {{link(spec)}}"
---
You are expected to review a draft specification document located at {{spec}}. This will be an "inline review" so instead of just writing a review file your task includes updating the underlying specification file with your suggestions.

> Context:
>
> - the spec may include a `sub-spec` frontmatter property, if it does that means that this spec is part of a series of specifications which is trying to achieve a larger goal
> - the spec may include a `depends-on` frontmatter property which indicates a direct dependency; you can assume that this dependency will be respected and all items in the prior spec file will be complete before any work on this spec is done

Look for how this spec file could be improved:

- what feels like a gap in the scope of this specification
    - fill in the gaps as much as you can
    - ideally make a clear decision and document the design decision
    - however, if you feel this gap represents a major design decision and should be reviewed before being implemented
        - add the gap in the "Open Questions" sections
        - add 2-3 suggested solutions under the gaps description, each suggested solution should list out that design's pros and cons
        - choose the solution you think is MOST appropriate and recommend; include WHY you recommend this
- fix mistakes the spec is making relative to other contracts or standards that are already established in the repo
    - make sure to distinguish "intended" changes to standards versus accidental
    - **intended** changes obviously should not be "fixed" but if they are incomplete in describing their impact then you must choose between:
        - document the side-effects and then add to the spec how these side-effects should be mitigated
        - if you feel there is no easy way to mitigate these side-effects or that the mitigation will cause performance issues or force non-ergonomic solutions going forward then you should:
            - find a better solution that addresses the same design goals but which has an acceptable set of side effects
            - be sure to still includes addressing these side-effects as part of the spec
            - and explain the change as a readers note to indicates the design solution to a reader so they understand why the changes was made
- update with better wording if you think ideas are expressed unclearly


Update the spec file at "{{spec}}" and then:

- set the spec file's `reviewed` Frontmatter property to 'true'
- set the spec file's `status` to "ready for planning and implementation"
