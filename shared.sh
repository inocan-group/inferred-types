#!/usr/bin/env bash

export BOLD='\033[1m'
export DIM='\033[2m'
export ITALIC='\033[3m'
export RESET='\033[0m'

export GREEN='\033[38;5;2m'
export RED='\033[38;5;1m'
export YELLOW='\033[38;5;3m'

function log() {
    printf "%b\\n" "${*}" >&2
}


# os() <[vmid]>
#
# will try to detect the operating system of the host computer
# or a container if a <vmid> is passed in as a parameter.
function os() {
    local -r os="${OSTYPE}" || "$(uname)" || "unknown"
    local -r os_type=$(echo "${os}" | tr '[:upper:]' '[:lower:]')

    case "$os_type" in
        'linux'*)
            echo "linux"
            ;;
        'freebsd'*)
            echo "freebsd"
            ;;
        'windowsnt'*)
            echo "windows"
            ;;
        'darwin'*)
            echo "macos"
            ;;
        'sunos'*)
            echo "solaris"
            ;;
        'aix'*)
            echo "aix"
            ;;
        *) echo "unknown/${os_type}"
    esac
}

function os_path_delimiter() {
    if starts_with "windows" "$(os)"; then
        echo "\\"
    else
        echo "/"
    fi
}

# is_mac_os
#
# tests whether the execution environment is running under
# macOS.
function is_mac_os() {
    local -r os=$(os)

    if [[ "${os}" == "macos" ]]; then
        return 0;
    else
        return 1;
    fi
}

# is_windows
#
# tests whether the execution environment is running under
# Windows.
function is_windows() {
    local -r os=$(os)

    if [[ "${os}" == "windows" ]]; then
        return 0;
    else
        return 1;
    fi
}

# is_linux
#
# tests whether the execution environment is running under a
# Linux OS.
function is_linux() {
    local -r os=$(os)

    if [[ "${os}" == "linux" ]]; then
        return 0;
    else
        return 1;
    fi
}

function epoch() {
  local epoch
  if is_linux; then
    epoch=$(date +%s%3N)
  elif is_mac_os; then
    epoch=$(($(date +%s) * 1000 + $(date +%N | cut -c1-3)))
  elif is_windows; then
    if has_command "powershell"; then
      epoch=$(powershell -Command "[math]::Round((Get-Date).ToUniversalTime().Subtract((Get-Date -Date '1970-01-01T00:00:00Z')).TotalMilliseconds)")
    else
      exit 1;
    fi
  else
    exit 1;
  fi

  echo "$epoch"
}

function timing {
  local -n __START__=$1 2>/dev/null
  local -n __END__=$2 2>/dev/null
  local -r milliseconds=$(( __END__ - __START__ ))

  echo "${milliseconds} ms"
}

function timingSec {
  local -n __START__=$1 2>/dev/null
  local -n __END__=$2 2>/dev/null
  local -r seconds=$(( (__END__ - __START__) / 1000 ))

  echo "${seconds} seconds"
}
