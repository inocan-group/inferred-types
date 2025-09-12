#!/usr/bin/env bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source utils.sh relative to the script's directory
# shellcheck source=./utils.sh
source "${SCRIPT_DIR}/utils.sh"

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
      gsub(/'\''/, "&apos;", s)
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
      # line is numeric but escape anyway for safety/consistency
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

  # Valid XML: no backslashes in attribute quotes
  log '<section name="forbidden-@-import">'

  if has_command "rg"; then
    # Ripgrep:
    # - exclude files under modules/inferred-types/**
    # - scan only *.ts and *.tsx
    # - print file:line:content (-n --no-heading)
    rg -n --no-heading \
      --glob '!modules/inferred-types/**' \
      --glob '*.ts' --glob '*.tsx' \
      'import\s+.*\s+from\s+['"'"'"]@inferred-types(/[^'"'"'"]*)?['"'"'"]' \
      | emit_xml_from_matches
  else
    # find + grep (portable on macOS/BSD + GNU):
    # - prune modules/inferred-types/*
    # - scan only *.ts and *.tsx
    # - print file:line:content (-n)
    find . \
      -type d -path './modules/inferred-types' -prune -o \
      -type d -path './modules/inferred-types/*' -prune -o \
      -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
        grep -nE 'import\s+.*\s+from\s+['"'"'"]@inferred-types(/[^'"'"'"]*)?['"'"'"]' {} + \
      | emit_xml_from_matches
  fi

  log '</section>'
  log ""
}

invalid_runtime_depth() {
  if ! has_command "find"; then
    setup_colors
    error_log "${RED}ERROR${RESET}: the 'find' command was not found!"
    error_log ""
    remove_colors
    exit 1
  fi

  log '<section name=\"runtime-depth\">'

  if has_command "rg"; then
    # Print file:line:content, then group to XML
    rg -n --no-heading --glob '*.ts' --glob '*.tsx' \
      "import\s+.*\s+from\s+['\"]runtime/[^/'\"]+/[^/'\"]+['\"]" \
      | emit_xml_from_matches
  else
    # BSD/GNU find + grep; prints file:line:content, then group to XML
    find . -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
      grep -nE "import\s+.*\s+from\s+['\"]runtime/[^/'\"]+/[^/'\"]+['\"]" {} + \
      | emit_xml_from_matches
  fi

  log '</section>'
  log ""
}

invalid_relative_path() {
  if ! has_command "find"; then
    setup_colors
    error_log "${RED}ERROR${RESET}: the 'find' command was not found!"
    error_log ""
    remove_colors
    exit 1
  fi

  log "<section name=\"relative-path\">"

  if has_command "rg"; then
    rg -n --no-heading --glob '*.ts' --glob '*.tsx' \
      "import\s+.*\s+from\s+['\"]\.\.?/[^'\"]+['\"]" \
      | emit_xml_from_matches
  else
    find . -type f \( -name '*.ts' -o -name '*.tsx' \) -exec \
      grep -nE "import\s+.*\s+from\s+['\"]\.\.?/[^'\"]+['\"]" {} + \
      | emit_xml_from_matches
  fi

  log "</section>"
  log ""
}

log '<invalid-imports>'
invalid_runtime_depth
invalid_relative_path
forbidden_at_import
log '</invalid-imports>'
