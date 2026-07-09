# Commit Orchestration — Lessons Learned

Non-obvious things we have discovered about committing in this monorepo that wouldn't be
obvious to someone with just `git` skill and a general knowledge of the workspace. Add new
entries at the bottom; do not rewrite history.

---

## Worktree-dirty staged files: `--only -- <path>` keeps the worktree edits out of the commit

When a path is **staged in the index but also modified in the working tree** (git status
shows `AM` for that file), `git commit --only -F - -- <path>` commits **only the index
content** of that file and leaves the worktree edits untouched.

This is the right behaviour for the orchestrator prompt: the orchestrator or the user may
be editing a file in the worktree while a sub-agent commits the staged version of it. As
long as the sub-agent uses `--only` and the explicit path, the worktree edits are not
swept in.

This is **not** the same as `git commit -- <path>`, whose behaviour with worktree-dirty
staged paths depends on hooks; the explicit `--only` form is the reliable choice.

> Source: Group 2 (`chore: add repo-level tooling and documentation`) sub-agent, 2026-07-01.

---

## Verify sub-agent reported commit hashes against `git log`

A sub-agent can report an incorrect commit hash in its completion message (e.g. by
reading the wrong line from a parallel agent's log, or by accidentally returning the
*previous* HEAD's hash). The orchestrator should always cross-check the
`git log --format='%H %s' -N` output after the sub-agents return rather than trusting
the reported hashes one-for-one.

Concrete example from 2026-07-01: the `fix(types): drop unused datetime exports…`
sub-agent reported its commit hash as `eb308d66e605e0c621a9901040ebec60690e24ae`, but
that hash actually belongs to the earlier `chore: refresh catalog dependencies…`
commit. The real `fix(types)` commit is `8bba535b9859361677dca5242a4226996f5347a6`.
The commit itself was correct — only the report was wrong.

> Source: orchestrator post-mortem, 2026-07-01.

---

## `git diff --staged -- <file>` is much faster than reading the multi-thousand-line diff

For files with very large staged diffs (e.g. the `pnpm-lock.yaml` churn from a
dependency bump can be ~5,000 lines), the diff view is essentially unreadable. Use
`git diff --staged --stat -- <file>` first to gauge the shape of the change, and only
drill into the line-level diff for the regions that matter for the commit message.

> Source: Group 1 (`chore: refresh catalog dependencies…`) sub-agent, 2026-07-01.

---

## Sub-agents cannot trust `git rev-parse HEAD` to report their own commit hash in parallel

When a sub-agent commits a path-limited commit and then immediately runs `git rev-parse HEAD`,
the reported hash is only correct if no other sub-agent has committed in the interim. In the
parallel-orchestration pattern used here, several sub-agents commit against the same worktree
within seconds of one another, so by the time the sub-agent's own post-commit code runs, another
agent's commit may already sit on top of its own and `HEAD` no longer points at the sub-agent's
commit.

Recovery is to read `git reflog` rather than `git rev-parse HEAD`. `reflog` records every
position of `HEAD` (and every branch tip), so the just-committed hash is recoverable even when
`HEAD` has moved on. Concrete example from 2026-07-01: the `planning(oxlint)` sub-agent
committed `c03f935e…`, ran `git rev-parse HEAD`, got the subsequent `fca7be6c…` (a parallel
`planning(type-complexity)` commit), and recovered its true hash via `git reflog`.

The orchestrator-side lesson (cross-check `git log --format='%H %s' -N` rather than trusting
reported hashes) covers the orchestrator's defensive verification; this entry is the sub-agent
side of the same race.

A more robust pattern the sub-agent could use is to capture `git rev-parse HEAD` *before*
committing and then take the commit's parent + the new HEAD's first parent, but in practice
`git reflog | head -10` is simpler and equally reliable for this orchestration.

> Source: Group 4 (`planning(oxlint): record oxlint migration spec, plan, and reviews`)
> sub-agent, 2026-07-01.

---

## Under heavy parallelism even `git reflog | head -10` may bury the sub-agent's own commit

In a busy round where 8–10 sub-agents commit within seconds of one another, even
`git reflog | head -10` is no longer deterministic: by the time the sub-agent runs it, a
sibling agent's commit has already taken `HEAD@{0}` and pushed the agent's own commit to
`HEAD@{1}`, `HEAD@{2}`, etc. Walking further down the reflog works, but is fragile (the
agent has to guess how many siblings beat them to it).

A more reliable recovery is `git log -1 -- <one-of-my-assigned-paths>`. Because the
sub-agent's commit was the most recent one to touch that pathspec (the `--only -- <path>`
restriction guarantees nothing else can), `git log -1 -- <file>` deterministically returns
*their* commit, regardless of how many parallel siblings land on top.

Concrete example from 2026-07-01: the `fix(types): redesign IsLeapYear…` sub-agent
committed `6d0f1ac1…`, then ran `git reflog` and found `HEAD@{0}` was already a sibling
agent's commit. It pivoted to `git log -1 -- modules/types/src/boolean-logic/operators/datetime/IsLeapYear.ts`
and recovered its true hash immediately.

This complements (and supersedes for high-fanout rounds) the prior reflog recommendation:
prefer `git log -1 -- <file>` when your pathspecs are unique to your commit.

> Source: Group A (`fix(types): redesign IsLeapYear to avoid type-instantiation OOM`)
> sub-agent, 2026-07-01.

---

## Sub-agents should self-verify the orchestrator-supplied path list against `git diff --staged --name-only`

The orchestrator's prompt may list paths that don't actually match what's in the index
(count drift, a typo, or a duplicated entry). If the sub-agent passes an un-staged path to
`git commit --only -F - -- <good1> <bad>`, the commit fails mid-heredoc with
`fatal: pathspec '<bad>' did not match any files`. With `--only`, git tolerates mixed
listed paths and *silently* drops the un-staged ones, so a counting error in the orchestrator's
list can otherwise land a partial commit that misses files the agent meant to include.

Best practice: immediately before issuing the commit, the sub-agent should run

```sh
git diff --staged --name-only -- <subtree-or-glob>
```

and reconcile the orchestrator's list against it — drop duplicates and skip anything not
in the index. The orchestrator's path list is a *suggestion* of intent; staging is the
contract.

Concrete example from 2026-07-06: the `perf(types): list utilities` sub-agent was assigned 13
numbered paths but the explicit path list contained only 12 distinct staged files (the prompt
duplicated one entry when counting). It self-verified with `git diff --staged --name-only
-- modules/types/src/lists/`, de-duplicated, and committed exactly the 12 staged files.
Without that step it would have either failed the commit or produced a partial commit.

> Source: Group 10 (`perf(types): list utilities`) sub-agent, 2026-07-06.

---

## When verifying a rename-staged scope, `git diff --staged --name-only` shows only the destination

`git diff --staged --name-only -- <subtree>` flattens staged renames to *just the
destination path* (one line per rename, name only). To see both sides of the rename
shown in `git status --short`'s `R  old -> new` form, use `git diff --staged --name-status`
or `git status --short`.

This matters for the path-verification step before committing: a sub-agent asked to verify
"are both `tsdown.config.ts` and `tsdown.config.mjs` staged inside `modules/<scope>/`?"
cannot rely on `git diff --staged --name-only` alone when the change is a rename, because
the source path is suppressed from the output. The agents involved here were robust to
this — they passed both paths to `git commit --only …` explicitly regardless, and that
worked because git accepts both sides of a rename in the pathspec list — but a less
careful verification step could under-count and silently drop one side.

When verifying a rename-staged scope, prefer `git status --short -- <subtree>` (which
keeps the `R old -> new` form) or `git diff --staged --name-status`.

> Source: Group 1 (`refactor(constants): rename tsdown.config.ts to tsdown.config.mjs`)
> sub-agent, 2026-07-07.

---

## An empty `git status` after a `--only` commit is not always "I committed everything"

When a sub-agent commits its assigned subset with `git commit --only -F - -- <paths>`
and then runs `git status --short` to find the working tree fully clean, the instinctive
fear is that the `--only` restriction failed and swept in sibling agents' files. In the
parallel-orchestration pattern, the opposite is usually true: the sub-agent's commit
landed correctly with only its pathspecs, and a *sibling* agent committed the remaining
staged files concurrently in the seconds since, emptying the index.

Recovery / verification: run `git log -N --stat` (or `git show --stat HEAD`) to confirm
which files are in the most recent commits, rather than assuming something went wrong.
Don't re-commit or attempt to "fix" the clean status — verify first.

Concrete example from 2026-07-09: the `refactor(runtime): move isNamedNestingConfig…`
sub-agent committed its 4 nesting files in `10630988`, then saw an empty `git status`.
The `.npmrc` + `pnpm-lock.yaml` staged files had been committed by the parallel `chore`
sub-agent in `6cd063f1` moments later, leaving the index clean. Both commits contained
exactly their assigned files.

> Source: Group 1 (`refactor(runtime): move isNamedNestingConfig helper to runtime module`)
> sub-agent, 2026-07-09.
