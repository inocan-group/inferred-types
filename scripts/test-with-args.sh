#!/bin/bash

# Forward arguments to both test commands sequentially with section headers
echo -e "\033[1mRuntime Tests\033[0m"
echo -e ""
pnpm test:runtime "$@" && echo -e "\n\033[1mType Tests\033[0m" && echo "" && pnpm test:types "$@"
