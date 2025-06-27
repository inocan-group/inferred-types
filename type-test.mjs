#!/usr/bin/env node --experimental-default-type=module
import fg from "fast-glob";
import { execSync } from "child_process";

const filters = process.argv.slice(2);

console.log();
console.log(`Type Testing`, filters);
const files = fg.globSync(["tests/**/*.ts", "test/**/*.ts"], { ignore: ["node_modules/**"] });
const match = filters.length === 0
    ? files
    : files.filter(i => filters.some(f => i.includes(f)))

console.log(`- running on ${match.length} test files of ${files.length}`);

// Function to run TypeScript compilation on a file
function checkTypeScript(filePath) {
    try {
        const command = `tsc -p tests/tsconfig.json`;
        execSync(command, { stdio: 'pipe', encoding: 'utf8' });
        return { success: true, errors: null };
    } catch (error) {
        return {
            success: false,
            errors: error.stdout || error.stderr || error.message
        };
    }
}

// Check if we should show verbose output (show all error details)
const verbose = process.argv.includes('--verbose') || process.argv.includes('-v');

// Process each matched file
let totalErrors = 0;
let filesWithErrors = 0;

console.log();
for (const file of match) {
    const result = checkTypeScript(file);

    if (result.success) {
        console.log(`✅ ${file} - No errors`);
    } else {
        const errorLines = result.errors.split('\n').filter(line => line.includes('error TS'));
        const errorCount = errorLines.length;

        console.log(`❌ ${file} - ${errorCount} type error${errorCount !== 1 ? 's' : ''} found${verbose ? ':' : ''}`);

        if (verbose) {
            console.log(result.errors);
            console.log();
        }

        filesWithErrors++;
        totalErrors += errorCount;
    }
}

// Summary
console.log();
console.log('='.repeat(50));
console.log(`Summary:`);
console.log(`- Total files checked: ${match.length}`);
console.log(`- Files with errors: ${filesWithErrors}`);
console.log(`- Files without errors: ${match.length - filesWithErrors}`);
console.log(`- Total errors found: ${totalErrors}`);
if (!verbose && filesWithErrors > 0) {
    console.log(`\nUse --verbose or -v to see detailed error messages`);
}
console.log('='.repeat(50));

// Exit with error code if any files have errors
process.exit(totalErrors > 0 ? 1 : 0);

