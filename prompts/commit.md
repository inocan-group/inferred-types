---
lessons_learned: "@.claudine/memory/commits.md"
timeout: 15m
step_timeout: 12m
show_system_prompt: false
operation: commit
agent: opencode
model: minimax/MiniMax-M3
success:
    message: "git commits in the **inferred-types** repo have completed"
    say: "git commits in the inferred-types repo have completed"

    stack:
        - when: "true"
          action:
            - shell: "sniff repo git-status"
---

# Commit Staged Files

## Conventional Commits

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) provides a convention for how commit messages should be structured. In this monorepo we always use the conventions proposed in the by this standard, which state a commit message following the general structure of:

- `{operation}({package}): {message}`
- or in a few rare cases, as `{operation}: {message}`

> **Note:** there are two cases where it's ok to have no 'scope' (aka, package) associated to a commit message:
>
> 1. If the change appears to have no relationship to any particular package in the monorepo.
> 2. If there are bunch of small changes which are all related to the same underlying event or cause and the changes do not touch any source code

The valid operations we use include: fix, docs, chore, feat, refactor, style, perf, test, ci, style, planning.

> **Note:**
>
> - when you detect that a directory of files with a "spec.md" are being **moved INTO** a directory containing `_completed` in the directory path:
>     - mark the operation as "planning"
>     - this movement indicates that the feature/fixture/review has now been completed; it is kept in git but moved out of the hotpath of actively planned items
> - when you detect that a directory of files with a "spec.md" are being **moved OUT OF** a directory containing `_unscheduled` in the directory path: - mark the operation as "planning" - this indicates that a specification that had no immediacy before has been scheduled to be implemented very soon
>   **Note:** the action 'refactor' should be reserved for commits which have at least some source code files.

## Concurrency

Your task is to make sure all _staged_ files are committed. While you are evaluating how to best structure the commits
from this set of staged files, the git repo you are operating in is still being used. You should expect that new files
might be created, existing files modified, etc.

It is important that the git operations you perform do not interfere with this expected behavior.

## Packages in this Monorepo

This monorepo has the following packages:

::shell sniff repo packages

Of these packages, the following ones appear to have changes _staged_ for commit:

{{ctx.staged_packages_list}}

## Orchestration

You will act as an aggregator when you see opportunities to do so effectively. This will be done to allow for concurrent activity as well as to preserve the context window as much as possible.

> **IMPORTANT:** when you spawn a sub-agent always reinforce that they CAN NOT ask the user for feedback or permissions as they are in a non-interactive session!

## Lessons Learned

We keep a permanent "memory file" of important things we've discovered that wouldn't have been obvious to someone with just `git` skills and knowledge of this monorepo.

**IMPORTANT:**

- Do not try to group commits together by unstaging and restaging one group at a time! You should simply commit the group files explicitly!
    - this will result in potential corruption
    - you should expect that developers are actively working on this code base while you're working. that means staging and unstaging files can have unexpected consequences!
- NEVER use commands like `git reset`!

The lessons learned are found in {{lessons_learned}}

## Staged Files

The following files have been staged for commit:

::shell sniff repo staged-files -v --plain --on-error '**No staged files**; nothing to do!' --no-error

## Task

Your task is to:

1. If no files are staged for commit then communicate this to the user and exit.
2. read the lessons you've learned while making commits by reading:
    - {{lessons_learned}}
3. evaluate all the _staged_ files in this monorepo,
4. organize the work into **semantic groups**
    - each group will have an "operation" and "scope" in addition to the set of files representing the group
    - every group must have a minimum of 1 file associated to it
    - a file can only be in one group
5. act as an orchestrator and concurrently execute a subagent for every semantic group:

    - provide the subagent the grouped files and the delta's in these files
    - provide the subagent the "operation" and "scope" (including no scope if that's the determination)

        - **Commit Message Format:** Messages must follow this structure:

            - First line: Brief summary (under 72 chars)
            - Blank line
            - Bullet points describing WHAT changed, WHY it changed, and any NOTABLE ASPECTS (each bullet starts with `-`)
            - Example:

                ```
                feat(biscuit-clip): add initial clipboard package structure

                - add README.md documenting package purpose and usage
                - add lib.rs with basic module exports
                - add cli.rs for command-line interface
                ```

        - the subagent is then responsible for:

            - reviewing the changes and drafting a useful commit message following the format above,
            - committing ONLY the files assigned to them. **Never pass the message inline with `-m "…"`.** Commit bodies routinely contain backticks (inline code like `` `::end-block` ``), `$`, and other shell metacharacters; inside a double-quoted `-m` string the shell evaluates those (backticks are command substitution even within double quotes), which corrupts the message and makes OpenCode's snapshot subsystem try to `git add` the extracted tokens as pathspecs (`fatal: pathspec '::end-block' did not match any files`). Instead, feed the message on stdin via a **single-quoted heredoc** so nothing is expanded:

                ```
                git commit --only -F - -- path1 path2 <<'COMMIT_MSG'
                refactor(darkmatter): scope block-quote support to ::shell-block

                - Add `quoted` field to stack entries
                - `::end-block` only closes matching quoted openers
                COMMIT_MSG
                ```

                The `'COMMIT_MSG'` delimiter must be single-quoted — that is what disables expansion. `-F -` reads the message from stdin; the `-- path1 path2` pathspecs still restrict the commit to the assigned files.

            - **retrying on git lock contention.** Because multiple subagents commit in parallel against the same worktree, `git commit` can fail with `fatal: Unable to create '.git/index.lock': File exists.` (or the equivalent `refs/heads/<branch>.lock` variant). This is not corruption — git's locks are fail-fast, not queuing. On such a failure, wait 1–3 seconds and retry the same `git commit --only …` command. Retry up to 5 times with short backoff before giving up and reporting failure to the orchestrator.
            - and finally, to let the orchestrator know of any problems they ran into and how they were able to overcome these issues

    - NOTE: if the subagent is not able to make a commit for any reason then this needs to be communicated back to the orchestrator with details on why they weren't able to commit.
    - the subagent SHOULD NOT push commits to any remote!
    - the subagent SHOULD be reminded that they are running in a non-interactive session so there is no way to get feedback from the user and attempts should be made to achieve the goals without asking for additional context

6. once all the subagents have completed their tasks, you will run `sniff repo` to provide the user a summary of the state of the repo
    - **DO NOT `cd` anywhere before running this command.** The wrapper has already placed you in the correct git worktree's root. Prefixing with `cd /Users/.../rusty-biscuit` (or any other path) will move you to the worktrees-_parent_ directory (the one that holds all linked worktrees of this repo), which is OUTSIDE the worktree, triggers OpenCode's `external_directory: ask` permission, and produces noise in the trace. Run plainly: `sniff repo` — `sniff` is already worktree-aware and resolves the correct git root from cwd.
7. then you will review the "lessons learned" that the subagents provided to you and determine if these are both:

    1. important and worthy of saving to the lessons learned memory file, and
    2. not already represented in the lessons-learned file

    If both criteria are met then you should add a new entry into the lessons-learned file: {{lessons_learned}}

**IMPORTANT:**

- you must follow these steps exactly
- remember that you are running in a non-interactive mode so you can not ask the user questions and expect a reply!
- DO NOT push commits to any remote!
- you should not run tests, build any packages, or run a formatter. Your job is to commit what you were given and you should assume that all validations before the commit were already done.
- when acting as an orchestrator you should take every opportunity to communicate progress back to the user as they will not be able to see the subagent's work.
