---
$schema:
    phase: number(required;default(1))
    total_phases: number(required)
    plan: file(eager; required; match(**/*plan*.md))
    spec: file(eager; match(**/*spec*.md))
description: |-
    Provide either a `plan` or `spec` filepath as a parameter and this
    prompt will detect the number of phases in the plan and then implement
    the project phase by phase.
plan: "{{ spec ? dirname(spec) + '/plan.md'  : null }}"
phase: "{{ file_exists(plan) ? frontmatter(plan, 'start_phase') || 1 : null }}"
area: "{{ ctx.area }}"
pass_icon: "{{ _loop_is_last ? '✅' : '🧑‍💻' }}"
total_phases: "{{ file_exists(plan) ? frontmatter(plan, 'total_phases') || frontmatter(plan, 'phases') || 1 : 0 }}"
spec: "{{ file_exists(plan) ? file_exists(dirname(plan) + '/spec.md') ? dirname(plan) + '/spec.md'  :  null : null }}"
# initialize:
#     stack:
#         - when: "phase >= total_phases"
#           action:
#               - warn: "There was an attempt to implement a phase **<yellow>{{phase}}</yellow>** of the plan which is **too large**. This plan only has **<yellow>{{total_phases}}</yellow>** total phases!"
start:
    message: "🎬  starting implementation of phase **#{{phase}}** of `{{parent_dir(plan)}}` (**repo:** {{ctx.repo}}, **agent:** {{ctx.agent}}/{{ctx.model}})"
success:
    say: "Phase {{phase}} of the plan in the {{ctx.repo}} repo, was implemented successfully"
    message: "{{pass_icon}}  phase **{{phase}}** (_of {{total_phases}}_) of the plan `{{parent_dir(plan)}}` successfully completed ({{ctx.repo}}, {{ctx.agent}}/{{ctx.model}})"
    success: "Completed the implementation of {{ link(plan) }}"
blocked:
    message: "💥  phase **{{phase}}** (_of {{total_phases}}_) was **blocked** because it has shell commands which were not approved for execution!"
failure:
    say: "Phase {{phase}} of a plan in the {{ctx.repo}} repo, ran into problems!"
    message: "❌️  phase **{{phase}}** (_of {{total_phases}}_) failed in the plan `{{parent_dir(plan)}}` ({{ctx.repo}}, {{ctx.agent}}/{{ctx.model}}: {{err.message}})"
    effect: sad-trombone
loop:
    until: "phase >= total_phases"
    action: "increment(phase)"
---
::block when="total_phases"
# Implement Phase {{phase}} of {{total_phases}}
::end-block
::block when="!total_phases"
# Implement Phase {{phase}}
::end-block

Your task is to implement phase {{phase}} of the plan found in '{{plan}}'.

- check off tasks in the plan -- marked by GFM todos (aka., `[ ]`) -- once they are complete
    - don't wait until the end of the phase
    - marking tasks complete in real time allows graceful recovery of the implementation of the plan if anything were to go wrong with the initial implementation of the plan

::block when="memory"
> **NOTE:** for context you should read the lessons learned discovered in earlier stages of this plan. You will find these lessons learned in memory/{{memory}}.md.
::end-block

::block when="spec"
> **NOTE:** this plan is based on the specification file: {{spec}}
::end-block

You are done when:

- all functionality defined in phase {{phase}} has been implemented
- all GFM tasks/todos in the plan have been completed (and have been marked as complete)
    - NOTE: you should mark tasks as complete as soon as you believe they are complete (e.g., implemented and any relevant tests suggest this is complete). Doing this allows an immediate feedback loop but also helps in recovering from a phase that didn't complete
- all tests are passing (using `just test` in the {{ctx.current_package_area}} package area)
- all lints are passing (using `just lint` in the {{ctx.current_package_area}} package area)
- Set or update the following Frontmatter properties on both the plan file({{plan}}) and the specification file ({{spec}}):
    - `source_files` should be updated to include all source code files which were created or updated during this phase (note: add an initial `[]` if this property was not previously set, otherwise add to the current list but be sure to dedup the list so that files only show once)
    - `documentation` should be update the documentation files which were updated or created during this phase of the implementation; put an empty list (e.g., `[]`) if none but otherwise add the delta from this phase to the running total (but be sure to dedup files)
    - `skills` property should be updated to include any agent skill files which were updated during this phase of the work (note: add an initial `[]` if this property was not previously set, otherwise add to the current list but be sure to dedup the list so that files only show once)
::block when="memory"
- Once all Frontmatter has been set to the plan file ({{plan}}), consider if there was anything surprising or novel that you discovered during this phase that would be valuable to know in future stages. If there is, then add a H2 heading `## Phase {{phase}}` to the end of the file `memory/{{memory}}.md`
::end-block

**IMPORTANT:**

- Do NOT commit or stage files to git, this will be done as a separate process.
- Report a summary of what you did including all the source files you changed.
- You do not need to run tests across the entire monorepo as this will take far too long. Only
- once the implementation is complete update any relevant README files or agent skill files
- you are running as part of a non-interactive session! Do not ask the user for feedback or permissions as they can not answer!
