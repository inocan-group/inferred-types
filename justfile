set dotenv-load
set positional-arguments

Today := `date +%F`
bold := '\033[1m'
dim := '\033[2m'
italic := '\033[3m'
reset := '\033[0m'
red := '\033[31m'
green := '\033[32m'
yellow := '\033[33m'
blue := '\033[34m'
magenta := '\033[35m'
cyan := '\033[36m'

default:
    #!/usr/bin/env bash
    set -euo pipefail

    if command -v md &> /dev/null; then
        md just.md
    else
        echo "Inferred Types"
        echo "=============="
    fi
    echo ""
    just --list | grep -v 'default'
    echo
    exit

# run type and runtime tests
test *args="":
    @pnpm test {{ args }}

# run lint checks
lint *args="":
    @pnpm lint {{ args }}

# run the runtime tests
test-runtime *args="":
    @pnpm test:runtime {{ args }}

# run typed testing
test-types *args="":
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
    @echo
    @pnpm outdated || (echo "\n - updates available" && exit 0)

# upgrade dependencies in the repo
upgrade:
    @pnpm upgrade
    @pnpm outdated

# use conventional commits to commit to git
commit agent="opencode" *args="":
    @claudine compose prompts/commit.md --{{ agent }} -y {{ args }}

# add a new feature to repo
feature name:
    @echo
    @md edit "features/{{ Today }}-{{ name }}/spec.md"

# add a new fix to repo
fix name:
    @echo
    @md edit "fixes/{{ Today }}-{{ name }}/spec.md"
