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
- You must set the following Frontmatter properties:
    - `source_files_during_phase_{{phase}}` should be set to all source code files which were created or updated during this phase of the implementation; put an empty list (e.g., `[]`) if none
    - `docs_updated_during_phase_{{phase}}` should be set to all documentation files which were updated during this phase of the implementation; put an empty list (e.g., `[]`) if none
    - `docs_created_during_phase_{{phase}}` should be set to all documentation files which were created during this phase of the implementation; put an empty list (e.g., `[]`) if none
    - `skills_files_updated_during_phase_{{phase}}` should be set to all agent skill files which were updated during this phase of the implementation; put an empty list (e.g., `[]`) if none
    ::block when="phase == total_phases"
        - set `source_code` Frontmatter to every source code file that was updated or created during the various phases of the plan
        - set `documentation` Frontmatter to every documentation file that was updated or created during the various phases of the plan
    ::end-block
    - if this is a monorepo, then include `packages` as a list of packages in the monorepo which were touched by the implementation in phase {{phase}}
::block when="memory"
- Once all Frontmatter has been set to the plan file ({{plan}}), consider if there was anything surprising or novel that you discovered during this phase that would be valuable to know in future stages. If there is, then add a H2 heading `## Phase {{phase}}` to the end of the file `memory/{{memory}}.md`
::end-block

::block when="ctx.is_monorepo"
## Be Efficient in Testing/Building

- when building or testing, make sure to only build/test the _specific packages_ or package area you are working; not the entire monorepo (this will take too long)
- The session was started in the "{{area}}" package area and so that's very likely an area you'll be focused on, however,
- most plan's will have a `packages` or `blast_radius` Frontmatter property which will explicitly state which packages are in the "blast radius" (aka, will be impacted
  during the implementation of this plan)
::end-block

**IMPORTANT:**

- Do NOT commit or stage files to git, this will be done as a separate process.
- Report a summary of what you did including all the source files you changed.
- You do not need to run tests across the entire monorepo as this will take far too long. Only
- once the implementation is complete update the '{{ctx.current_package_area}}' if there were any notable changes needed in this skill
- you are running as part of a non-interactive session! Do not ask the user for feedback or permissions as they can not answer!
