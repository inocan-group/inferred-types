#!/usr/bin/env node

import { spawn } from 'child_process';

const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
const args = process.argv.slice(2);

/**
 * Execute a command with inherited stdio
 * @param {string} command - The command to execute
 * @param {string[]} cmdArgs - Arguments for the command
 * @returns {Promise<void>}
 */
function exec(command, cmdArgs = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, cmdArgs, {
      stdio: 'inherit',
      shell: true
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Main execution
 */
async function main() {
  try {
    if (isCI) {
      // In CI (Github Actions), only run runtime tests
      console.log('\x1b[1mRuntime Tests (CI Mode)\x1b[0m');
      console.log('');
      await exec('pnpm', ['test:runtime', ...args]);
    } else {
      // Local development: run both runtime and type tests sequentially
      console.log('\x1b[1mRuntime Tests\x1b[0m');
      console.log('');
      await exec('pnpm', ['test:runtime', ...args]);

      console.log('');
      console.log('\x1b[1mType Tests\x1b[0m');
      console.log('');
      await exec('pnpm', ['test:types', ...args]);
    }
  } catch (error) {
    process.exit(1);
  }
}

main();
