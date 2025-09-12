#!/usr/bin/env bash

echo "=== Diagnostic Test for invalid-imports.sh ==="
echo "Current working directory: $(pwd)"
echo "Script location: $(dirname "${BASH_SOURCE[0]}")"
echo ""

# Test 1: Check if utils.sh exists from current directory
if [ -f "./scripts/utils.sh" ]; then
    echo "✓ ./scripts/utils.sh exists (from current directory)"
else
    echo "✗ ./scripts/utils.sh NOT found (from current directory)"
fi

# Test 2: Check if utils.sh exists relative to script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "${SCRIPT_DIR}/utils.sh" ]; then
    echo "✓ utils.sh exists relative to script location"
else
    echo "✗ utils.sh NOT found relative to script location"
fi

# Test 3: Try sourcing with different methods
echo ""
echo "Testing source methods:"

# Method 1: Current approach (will fail if not run from project root)
if source "./scripts/utils.sh" 2>/dev/null; then
    echo "✓ Method 1: source './scripts/utils.sh' succeeded"
    if declare -f has_command >/dev/null 2>&1; then
        echo "  - has_command function is available"
    fi
else
    echo "✗ Method 1: source './scripts/utils.sh' failed"
fi

# Method 2: Relative to script location (robust)
if source "${SCRIPT_DIR}/utils.sh" 2>/dev/null; then
    echo "✓ Method 2: source relative to script location succeeded"
    if declare -f has_command >/dev/null 2>&1; then
        echo "  - has_command function is available"
    fi
else
    echo "✗ Method 2: source relative to script location failed"
fi

echo ""
echo "=== End Diagnostic Test ==="