#!/usr/bin/env bun run

// https://github.com/steveukx/git-js
import { argv, exit } from "node:process";
import simpleGit from "simple-git";

type Flags = {
    dryRun?: boolean;
}

/**
 * Creates markdown output which reports on
 * the state of the repo at the beginning of
 * a phase of work.
 *
 * Return Markdown:
 *
 * - last local commit: hash
 * - last remote commit: hash
 * - dirty files: an array of fully qualified file paths (from repo root)
 * which had not yet been committed
 *
 * - if `dry-run` flag is NOT set then:
 *      - create a snapshot of the files which are dirty
 *      - snapshot name should be named: `{{planName}}-phase{{phaseNumber}}-initial`
 *      - keep the dirty files as part of the repo state
 */
async function createStartPositionReport(
    planName: string,
    phaseNumber: `${number}`,
    flags: Flags
) {
    const git = simpleGit();

    // Get last local commit hash (HEAD)
    const localCommit = await git.revparse(['HEAD']);

    // Get last remote commit hash
    // First, try to get the default remote branch
    let remoteCommit = '';
    try {
        // Try origin/HEAD first
        remoteCommit = await git.revparse(['origin/HEAD']);
    } catch (error) {
        // If that fails, try to get the current branch's upstream
        try {
            const currentBranch = await git.revparse(['--abbrev-ref', 'HEAD']);
            remoteCommit = await git.revparse([`origin/${currentBranch}`]);
        } catch (upstreamError) {
            remoteCommit = 'N/A (no remote tracking branch)';
        }
    }

    // Get dirty files (both staged and unstaged)
    const status = await git.status();
    const dirtyFiles = [
        ...status.modified,
        ...status.created,
        ...status.deleted,
        ...status.renamed.map(r => r.to),
        ...status.conflicted,
        ...status.not_added
    ];

    // Format markdown output
    console.log('# Start Position Report\n');
    console.log(`**Plan:** ${planName}`);
    console.log(`**Phase:** ${phaseNumber}\n`);
    console.log('## Git Status\n');
    console.log(`- **Last local commit:** ${localCommit.trim()}`);
    console.log(`- **Last remote commit:** ${typeof remoteCommit === 'string' ? remoteCommit.trim() : remoteCommit}\n`);

    if (dirtyFiles.length > 0) {
        console.log('## Dirty Files\n');
        dirtyFiles.forEach(file => {
            console.log(`- ${file}`);
        });
        console.log('');
    } else {
        console.log('## Dirty Files\n');
        console.log('✨ Working directory is clean\n');
    }

    // Create snapshot if not in dry-run mode
    if (!flags.dryRun && dirtyFiles.length > 0) {
        const stashName = `${planName}-phase${phaseNumber}-initial`;
        console.log(`## Snapshot\n`);
        console.log(`Creating stash: "${stashName}"\n`);

        // Create a stash with the specific name
        // The --keep-index flag would keep staged changes, but we want to stash everything
        // and then restore it to keep files in working directory
        await git.stash(['push', '-u', '-m', stashName]);

        // Restore the stashed changes to keep them in the working directory
        await git.stash(['apply', 'stash@{0}']);

        console.log('✅ Snapshot created and files restored to working directory\n');
    } else if (!flags.dryRun) {
        console.log('## Snapshot\n');
        console.log('ℹ️  No snapshot created (working directory is clean)\n');
    } else {
        console.log('## Snapshot\n');
        console.log('🏃 Dry-run mode: No snapshot created\n');
    }
}


// expects parameters to be passed in
const [planName, phaseNumber, ...rest ] = argv.slice(2);
const flags = rest.some(i => i === "--dry-run")
    ? { dryRun: true }
    : {};

if (!planName || !phaseNumber) {
    console.log("invalid syntax: 'start-position.ts' expects planName and phaseNumber to be passed in as parameters!");

    exit(1)
}

await createStartPositionReport(planName, phaseNumber as `${number}`, flags);
