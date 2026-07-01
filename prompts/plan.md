---
$schema:
    spec: file(required;match(**/*spec*.md))
    design: file(match(**/*design*.md))
description: "Creates a multi-phase, high confidence plan from a _feature_ or _fix_"
plan: "{{ replace(relative(spec), 'spec', 'plan') }}"
start:
    message: "🖊️ creating a plan for the `{{spec}}` specification in **inferred-types**"
success:
    stderr: "The `{{plan}}` _plan_ has been created for **{{ctx.repo}}**"
    message: "✅  the _plan_ for the spec `{{spec}}` in **{{ctx.repo}}** was created _at_ {{ctx.time}}"
failure:
    message: "❌️  the _plan_ for the spec in **{{ctx.repo}}** `{{spec}}` failed to complete!"
---

You are a planning agent. Convert the following documents into a high confidence execution plan:

::block when="spec"

- Functional Specification: {{spec}}
::end-block
::block when="design"
- Technical Design: {{design}}
::end-block

## Requirements

- Break work into **phases** and **tasks**
- Order tasks by dependency
- Flag parallelizable work
- Include validation checkpoints
- Keep tasks concrete and observable
- the tasks in the plan lead with a GFM inspired todo marker (e.g., `- [ ] {task}`)
    - this allows the implementation team to check off items in the plan as they complete them
- plans should ALWAYS start with Phase 1 (not Phase 0 or something else non-standard)

## Closure

- Save the plan as "{{plan}}"
- Add frontmatter to the plan document and set:
    - `agent` set this to "{{ ctx.AGENT }}/{{ ctx.MODEL }}"
    - `total_phases` property to the number of phases defined in this plan
    - `created` add the date in YYYY-MM-DD format
    - `start_phase` set this to the starting phase number; usually 1 but may be 0 sometimes
    - `yolo` set this to "{{ env.YOLO }}"
