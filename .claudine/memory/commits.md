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
