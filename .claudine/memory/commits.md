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
