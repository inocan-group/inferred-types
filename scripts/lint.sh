#!/usr/bin/env bash

echo "Linting Types using Typescript's TSC"
cd src/types || exit 1
tsc --noEmit
cd - || exit 1
