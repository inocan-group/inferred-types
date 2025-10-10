#!/usr/bin/env bash
set -o pipefail


setup_colors() {
    export BLACK=$'\033[30m'
    export RED=$'\033[31m'
    export GREEN=$'\033[32m'
    export YELLOW=$'\033[33m'
    export BLUE=$'\033[34m'
    export MAGENTA=$'\033[35m'
    export CYAN=$'\033[36m'
    export WHITE=$'\033[37m'

    export BRIGHT_BLACK=$'\033[90m'
    export BRIGHT_RED=$'\033[91m'
    export BRIGHT_GREEN=$'\033[92m'
    export BRIGHT_YELLOW=$'\033[93m'
    export BRIGHT_BLUE=$'\033[94m'
    export BRIGHT_MAGENTA=$'\033[95m'
    export BRIGHT_CYAN=$'\033[96m'
    export BRIGHT_WHITE=$'\033[97m'

    export BOLD=$'\033[1m'
    export NO_BOLD=$'\033[21m'
    export DIM=$'\033[2m'
    export NO_DIM=$'\033[22m'
    export ITALIC=$'\033[3m'
    export NO_ITALIC=$'\033[23m'
    export STRIKE=$'\033[9m'
    export NO_STRIKE=$'\033[29m'
    export REVERSE=$'\033[7m'
    export NO_REVERSE=$'\033[27m'

    export BG_BLACK=$'\033[40m'
    export BG_RED=$'\033[41m'
    export BG_GREEN=$'\033[42m'
    export BG_YELLOW=$'\033[43m'
    export BG_BLUE=$'\033[44m'
    export BG_MAGENTA=$'\033[45m'
    export BG_CYAN=$'\033[46m'
    export BG_WHITE=$'\033[47m'

    export BG_BRIGHT_BLACK=$'\033[100m'
    export BG_BRIGHT_RED=$'\033[101m'
    export BG_BRIGHT_GREEN=$'\033[102m'
    export BG_BRIGHT_YELLOW=$'\033[103m'
    export BG_BRIGHT_BLUE=$'\033[104m'
    export BG_BRIGHT_MAGENTA=$'\033[105m'
    export BG_BRIGHT_CYAN=$'\033[106m'
    export BG_BRIGHT_WHITE=$'\033[107m'

    export RESET=$'\033[0m'
}

remove_colors() {
    echo "${RESET}"

    unset RED BLACK GREEN YELLOW BLUE MAGENTA CYAN WHITE
    unset BRIGHT_BLACK BRIGHT_RED BRIGHT_GREEN BRIGHT_YELLOW BRIGHT_BLUE BRIGHT_MAGENTA BRIGHT_CYAN BRIGHT_WHITE
    unset BOLD NO_BOLD DIM NO_DIM ITALIC NO_ITALIC STRIKE NO_STRIKE REVERSE NO_REVERSE
    unset BG_BLACK BG_RED BG_GREEN BG_YELLOW BG_BLUE BG_MAGENTA BG_CYAN BG_WHITE
    unset BG_BRIGHT_BLACK BG_BRIGHT_RED BG_BRIGHT_GREEN BG_BRIGHT_YELLOW BG_BRIGHT_BLUE BG_BRIGHT_MAGENTA BG_BRIGHT_CYAN BG_BRIGHT_WHITE
    unset RESET
}

# log
#
# Logs the parameters passed to STDOUT
function log() {
    printf "%b\\n" "${*}" >&1
}

# error_log
#
# Logs the parameters passed to STDERR
function error_log() {
    printf "%b\\n" "${*}" >&2
}


# has_command <cmd>
#
# checks whether a particular program passed in via $1 is installed
# on the OS or not (at least within the $PATH)
function has_command() {
    local -r cmd="${1:?cmd is missing}"

    if command -v "${cmd}" &> /dev/null; then
        return 0
    else
        return 1
    fi
}


FOUND_ISSUES=0  # flipped to 1 if any section finds matches

# Group "file:line:content" matches into XML blocks, escaping XML-sensitive chars.
emit_xml_from_matches() {
  awk -F: '
    function xml_escape_text(s) {
      gsub(/&/, "&amp;", s)
      gsub(/</, "&lt;",  s)
      gsub(/>/, "&gt;",  s)
      return s
    }
    function xml_escape_attr(s) {
      gsub(/&/, "&amp;", s)
      gsub(/</, "&lt;",  s)
      gsub(/>/, "&gt;",  s)
      gsub(/"/, "&quot;", s)
      gsub(/\047/, "&apos;", s)  # \047 is single quote
      return s
    }
    function open_file(path) {
        if (substr(path, 1, 2) != "./") {
            path = "./" path
        }
        print "<file path=\"" xml_escape_attr(path) "\">"
    }
    function close_file() {
      if (current_path != "") print "</file>"
    }
    {
      file = $1
      line = $2
      text = $0
      sub(/^[^:]*:[0-9]+:/, "", text)

      if (file != current_path) {
        close_file()
        current_path = file
        open_file(current_path)
      }

      sub(/\r$/, "", text)
      print "  <instance line=\"" xml_escape_attr(line) "\">" xml_escape_text(text) "</instance>"
    }
    END { close_file() }
  '
}

forbidden_at_import() {
  if ! has_command "find"; then
    setup_colors
    error_log "${RED}ERROR${RESET}: the 'find' command was not found!"
    error_log ""
    remove_colors
    exit 1
  fi

  log '<section name="forbidden-@-import">'

  if has_command "rg"; then
    rg -n --no-heading \
      --glob '!modules/inferred-types/**' \
      --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
      'import\s+.*\s+from\s+["'\''"]@inferred-types[^"'\''"]*["'\''"]' \
      | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  else
    find . \
      -type d -path './modules/inferred-types' -prune -o \
      -type d -path './modules/inferred-types/*' -prune -o \
      -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
        grep -nE 'import\s+.*\s+from\s+['"'"'"]@inferred-types[^'"'"'"]*['"'"'"]' {} + \
      | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  fi

  # Flip the global flag if matches (0) or an error (>1)
  if [ "$status" -eq 0 ] || [ "$status" -gt 1 ]; then
    FOUND_ISSUES=1
  fi

  log '</section>'
  log ""
}

invalid_runtime_alias_depth() {
  if ! has_command "find"; then
    setup_colors; error_log "${RED}ERROR${RESET}: the 'find' command was not found!"; error_log ""; remove_colors; exit 1
  fi

  log '<section name="invalid-runtime-alias-depth">'

  if has_command "rg"; then
    rg -n --no-heading \
       --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
       '^\s*import[^;]*from\s+["'\'']runtime/[^/"'\'']+/[^"'\'']+["'\'']' \
    | rg -v '^[^:]+:[0-9]+:\s*//' \
    | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  else
    find . -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
      grep -nE '^[[:space:]]*import[^;]*from[[:space:]]+["'"'"']runtime/[^/"'"'"']+/[^"'"'"']+["'"'"']' {} + \
    | grep -Ev '^[^:]+:[0-9]+:[[:space:]]*//' \
    | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  fi

  if [ "$status" -eq 0 ] || [ "$status" -gt 1 ]; then FOUND_ISSUES=1; fi
  log '</section>'; log ""
}

# reports on import sources more than two levels deep starting with "types/*/"
invalid_type_alias_depth() {
  log '<section name="invalid-type-alias-depth">'

  if has_command "rg"; then
    rg -n --no-heading --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
       '^\s*import[^;]*from\s+["'\'']types/[^/"'\'']+/[^"'\'']+["'\'']' \
    | rg -v '^[^:]+:[0-9]+:\s*//' \
    | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  else
    find . -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
      grep -nE '^[[:space:]]*import[^;]*from[[:space:]]+["'"'"']types/[^/"'"'"']+/[^"'"'"']+["'"'"']' {} + \
    | grep -Ev '^[^:]+:[0-9]+:[[:space:]]*//' \
    | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  fi

  if [ "$status" -eq 0 ] || [ "$status" -gt 1 ]; then FOUND_ISSUES=1; fi
  log '</section>'; log ""
}


# forbidden_type_aliases() {
#   log '<section name="forbidden-type-aliases">'

#   if has_command "rg"; then
#     # Ripgrep: catch both import-from and export-from forms
#     rg -n --no-heading \
#        --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' --glob '!**/*.map' \
#        --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
#        -e '^\s*(import|export)(\s+\*|\s+type|\s+\{)?[^;]*\sfrom\s+["'\''"]types/[^"'\''"]+["'\''"]' \
#     | rg -v '^[^:]+:[0-9]+:\s*//' \
#     | emit_xml_from_matches
#     status=${PIPESTATUS[0]}
#   else
#     # find + grep: same logic, portable on BSD/GNU
#     find . \
#       -type d \( -name node_modules -o -name dist -o -name build -o -name .git \) -prune -o \
#       -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
#         grep -nE '^\s*(import|export)(\s+\*|\s+type|\s+\{)?[^;]*\sfrom\s+["'"'"'](types)/[^"'"'"']+["'"'"']' {} + \
#     | grep -Ev '^[^:]+:[0-9]+:\s*//' \
#     | emit_xml_from_matches
#     status=${PIPESTATUS[0]}
#   fi

#   if [ "$status" -eq 0 ] || [ "$status" -gt 1 ]; then
#     FOUND_ISSUES=1
#   fi

#   log '</section>'
#   log ""
# }

forbidden_const_aliases() {
  log '<section name="forbidden-const-aliases">'

  if has_command "rg"; then
    # Ripgrep: catch both import-from and export-from forms
    rg -n --no-heading \
       --glob '!node_modules/**' --glob '!dist/**' --glob '!build/**' --glob '!**/*.map' \
       --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
       -e '^\s*(import|export)(\s+\*|\s+type|\s+\{)?[^;]*\sfrom\s+["'\''"]constants/[^"'\''"]+["'\''"]' \
    | rg -v '^[^:]+:[0-9]+:\s*//' \
    | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  else
    # find + grep: same logic, portable on BSD/GNU
    find . \
      -type d \( -name node_modules -o -name dist -o -name build -o -name .git \) -prune -o \
      -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
        grep -nE '^\s*(import|export)(\s+\*|\s+type|\s+\{)?[^;]*\sfrom\s+["'"'"'](constants)/[^"'"'"']+["'"'"']' {} + \
    | grep -Ev '^[^:]+:[0-9]+:\s*//' \
    | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  fi

  if [ "$status" -eq 0 ] || [ "$status" -gt 1 ]; then
    FOUND_ISSUES=1
  fi

  log '</section>'
  log ""
}


invalid_relative_path() {
  log '<section name="relative-path">'

  if has_command "rg"; then
    rg -n --no-heading --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
       '^\s*(import|export)(\s+\*|\s+type|\s+\{)?[^;]*from\s+["'\'']\.\./' \
    | rg -v '^[^:]+:[0-9]+:\s*//' \
    | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  else
    find . -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
      grep -nE '^[[:space:]]*(import|export)(\s+\*|\s+type|\s+\{)?[^;]*from[[:space:]]+["'"'"']\.\./' {} + \
    | grep -Ev '^[^:]+:[0-9]+:[[:space:]]*//' \
    | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  fi

  if [ "$status" -eq 0 ] || [ "$status" -gt 1 ]; then FOUND_ISSUES=1; fi
  log '</section>'; log ""
}

forbidden_runtime_import() {
  log '<section name="forbidden-runtime-import">'

  if has_command "rg"; then
    # Find import/export-from lines that reference runtime/* outside modules/runtime/src/**
    rg -n --no-heading \
      --glob '!modules/runtime/src/**' \
      --glob '!node_modules/**' \
      --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
      -e '^\s*(import|export)(\s+\*|\s+type|\s+\{)?[^;]*\sfrom\s+["'\''"]runtime/[^/"'\''"]+["'\''"]' \
      | rg -v '^[^:]+:\d+:\s*//' \
      | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  else
    # find + grep alternative (no look-around); then drop //-commented lines
    find . \
      -type d \( -name node_modules -o -path './modules/runtime/src' \) -prune -o \
      -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
        grep -nE '^\s*(import|export)(\s+\*|\s+type|\s+\{)?[^;]*\sfrom\s+["'"'"']runtime/[^/"'"'"']+["'"'"']' {} + \
      | grep -Ev '^[^:]+:[0-9]+:\s*//' \
      | emit_xml_from_matches
    status=${PIPESTATUS[0]}
  fi

  if [ "$status" -eq 0 ] || [ "$status" -gt 1 ]; then FOUND_ISSUES=1; fi
  log '</section>'
  log ""
}

missing_type_modifier() {
  log '<section name="missing-type-modifier">'

  local tmpfile
  tmpfile=$(mktemp)
  if has_command "rg"; then
    # Pull imports from inferred-types/types …
    rg -n --no-heading --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
       '^\s*import[^;]*from\s+["'\'']inferred-types/types["'\'']' \
    | rg -v '^[^:]+:[0-9]+:\s*//' \
    | rg -v ':\d+:\s*import\s+type\b' \
    | rg -v ':\d+:.*\{[^}]*\btype\b[^}]*\}' > "$tmpfile" || true
  else
    # grep branch
    find . -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
      grep -nE '^[[:space:]]*import[^;]*from[[:space:]]+["'"'"']inferred-types/types["'"'"']' {} + \
    | grep -Ev '^[^:]+:[0-9]+:[[:space:]]*//' \
    | grep -Ev ':[0-9]+:[[:space:]]*import[[:space:]]+type\b' \
    | grep -Ev ':[0-9]+:.*\{[^}]*\btype\b[^}]*\}' > "$tmpfile" || true
  fi

  if [ -s "$tmpfile" ]; then
    cat "$tmpfile" | emit_xml_from_matches
    FOUND_ISSUES=1
  fi
  rm -f "$tmpfile"
  log '</section>'; log ""
}

# reports on the path aliases `runtime/*` and `types/*` which are being used
# as sources for imports but are not explicitly defined in the `deno.jsonc` file.
unspecified_path_alias() {
  log '<section name="unspecified-path-alias">'

  local DENO_JSONC="deno.jsonc"
  if [ ! -f "$DENO_JSONC" ]; then
    setup_colors
    error_log "${YELLOW}WARN${RESET}: deno.jsonc not found; cannot validate aliases."
    remove_colors
    log '</section>'; log ""
    return
  fi

  local RUNTIME_SET TYPES_SET
  RUNTIME_SET="|$(grep -oE '"runtime/[^"]+"' "$DENO_JSONC" \
    | sed -E 's/^"runtime\/([^"]+)".*$/\1/' \
    | tr '\n' '|' | sed -E 's/\|+/\|/g; s/^\|//; s/\|$//')|"

  TYPES_SET="|$(grep -oE '"types/[^"]+"' "$DENO_JSONC" \
    | sed -E 's/^"types\/([^"]+)".*$/\1/' \
    | tr '\n' '|' | sed -E 's/\|+/\|/g; s/^\|//; s/\|$//')|"

  # shellcheck disable=SC2016
  awk_filter='
    BEGIN { FS=":"; RS="\n" }
    {
      file=$1; line=$2; content=$0
      sub(/^[^:]*:[0-9]+:/, "", content)
      spec=content
      sub(/^.*from[[:space:]]+["\047]/, "", spec)
      sub(/["\047].*$/, "", spec)
      if (spec ~ /^(runtime|types)\/[^\/]+$/) {
        prefix=spec; sub(/\/.*/, "", prefix)
        seg=spec;    sub(/^[^\/]+\//, "", seg)
        if (prefix=="runtime")   { if (index(runtime_set, "|" seg "|") == 0) print $0 }
        else if (prefix=="types"){ if (index(types_set,   "|" seg "|") == 0) print $0 }
      }
    }
  '

  local tmpfile
  tmpfile=$(mktemp)
  if has_command "rg"; then
    {
      # One pattern for runtime/* (one-level only)
      rg -n --no-heading --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
        -e "^[[:space:]]*import[^;]*from[[:space:]]+['\"]runtime/[^/'\"]+['\"]" || true
      # A separate pattern for types/* (one-level only)
      rg -n --no-heading --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
        -e "^[[:space:]]*import[^;]*from[[:space:]]+['\"]types/[^/'\"]+['\"]" || true
    } \
    | rg -v '^[^:]+:[0-9]+:[[:space:]]*//' \
    | awk -v runtime_set="$RUNTIME_SET" -v types_set="$TYPES_SET" "$awk_filter" > "$tmpfile" || true
  else
    {
      find . -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
        grep -nE "^[[:space:]]*import[^;]*from[[:space:]]+['\"]runtime/[^/'\"]+['\"]" {} + || true
      find . -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
        grep -nE "^[[:space:]]*import[^;]*from[[:space:]]+['\"]types/[^/'\"]+['\"]" {} + || true
    } \
    | grep -Ev '^[^:]+:[0-9]+:[[:space:]]*//' \
    | awk -v runtime_set="$RUNTIME_SET" -v types_set="$TYPES_SET" "$awk_filter" > "$tmpfile" || true
  fi

  if [ -s "$tmpfile" ]; then
    cat "$tmpfile" | emit_xml_from_matches
    FOUND_ISSUES=1
  fi
  rm -f "$tmpfile"
  log '</section>'; log ""
}

multiple_imports_same_source() {
  log '<section name="multiple-imports-same-source">'

  # AWK: gather all lines per (file,spec) and print all lines for keys with count >= 2
  # Keeps "file:line:content" so emit_xml_from_matches works unchanged.
  # shellcheck disable=SC2016
  all_dupes_awk='
    BEGIN { FS=":"; RS="\n" }
    {
      file=$1; line=$2; text=$0
      sub(/^[^:]*:[0-9]+:/, "", text)                 # strip "file:line:"
      spec=text
      sub(/^.*from[[:space:]]+["\047]/, "", spec)     # drop up to opening quote
      sub(/["\047].*$/, "", spec)                     # drop closing quote and rest
      key=file "\t" spec
      count[key]++
      if (lines[key] == "") { lines[key]=$0 } else { lines[key]=lines[key] RS $0 }
    }
    END {
      for (k in count) {
        if (count[k] >= 2) {
          n = split(lines[k], arr, RS)
          for (i=1; i<=n; i++) print arr[i]
        }
      }
    }
  '

  local tmpfile
  tmpfile=$(mktemp)
  if has_command "rg"; then
    rg -n --no-heading --glob '!tests/fixtures/**' --glob '*.ts' --glob '*.tsx' \
       '^\s*import[^;]*from\s+["'\''"][^"'\''"]+["'\''"]' \
    | rg -v '^[^:]+:[0-9]+:\s*//' \
    | awk "$all_dupes_awk" > "$tmpfile" || true
  else
    find . -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
      grep -nE '^[[:space:]]*import[^;]*from[[:space:]]+["'"'"'][^"'"'"']+["'"'"']' {} + \
    | grep -Ev '^[^:]+:[0-9]+:[[:space:]]*//' \
    | awk "$all_dupes_awk" > "$tmpfile" || true
  fi

  if [ -s "$tmpfile" ]; then
    cat "$tmpfile" | emit_xml_from_matches
    FOUND_ISSUES=1
  fi
  rm -f "$tmpfile"
  log '</section>'; log ""
}

if ! has_command "find"; then
    setup_colors;
    error_log "${RED}ERROR${RESET}: the 'find' command was not found on the system!";
    error_log "- ${ITALIC}we require ${BOLD}find${RESET}${ITALIC} to test for invalid import syntax and sources!${RESET}"
    error_log "";
    remove_colors;
    exit 1;
fi

log '<invalid-imports>'
invalid_runtime_alias_depth
invalid_type_alias_depth
unspecified_path_alias
invalid_relative_path
forbidden_at_import
forbidden_runtime_import
forbidden_const_aliases
missing_type_modifier
multiple_imports_same_source
log '</invalid-imports>'

# Exit 1 if any problem was found; 0 otherwise
if [ "$FOUND_ISSUES" -eq 1 ]; then
  exit 1
else
  exit 0
fi
