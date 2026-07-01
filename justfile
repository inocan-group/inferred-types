set dotenv-load
set positional-arguments

default:
    #!/usr/bin/env bash
    set -euo pipefail

    if command -v md &> /dev/null; then
        md just.md
    else
        echo "Rusty Biscuit Monorepo"
        echo "======================"
    fi
    echo ""
    just --list | grep -v 'default'
    echo
    exit

# run type and runtime tests
test *args="":
    @pnpm test {{ args }}

# run the runtime tests
test-runtime *args="":
    @pnpm test:runtime {{ args }}

# run typed testing
typed *args="":
    @node_modules/.bin/typed test {{ args }}

# build transpiled Javascript
build *args="":
    @pnpm build {{ args }}

# use claude code
cc *args="":
    @claudine claude -y {{ args }}

# use opencode
oc *args="":
    @claudine opencode -y {{ args }}

# use gemini
gem *args="":
    @claudine gemini -y {{ args }}

# use codex
codex *args="":
    @claudine codex -y {{ args }}

# the outdated dependencies in this repo
outdated:
    @pnpm outdated

commit agent="opencode":
    @claudine compose prompts/commit.md --{{ agent }} -y
