
## Release Workflow


1. the release uses the popular [`bumpp`](https://github.com/antfu-collective/bumpp) npm package (e.g., `pnpm release`) to interactively ask the user for:

  - the release number
  - get confirmation on the desire to commit
  - tag the commit locally
  - push to Github

2. a release based commit to the `main` branch uses the `.github/workflows/release.yml` workflow for Github Actions

  - while the `.github/workflows/test.yml` workflow _will_ be triggered too (as is any commit to `main`) the logic of this workflow will detect that this is a release and avoid running duplicative testing.

3. the bulk of the release work is done in the `yankeeinlondon/gha` repo's "publish.yml" workflow

    - this repo is separate from this repo but owned by the same people so changes to `yankeeinlondon/gha` can be made if appropriate.
    - this workflow will attempt to publish to [npm](https://www.npmjs.com/package/inferred-types) as a root package (aka, not namespaced), and to [JSR](https://jsr.io/@yankeeinlondon/inferred-types), and [Github Packages](https://github.com/inocan-group/inferred-types) under the workspace `inocan-group`
    - the workflow is considered successful only when ALL of the targets are published to
    - at the end of a successful publish workflow we call `npx changelogithub` to build a changelog into the release notes on Github

4. the [`changelogithub`](https://github.com/antfu/changelogithub) used in our release process is a variant of the popular [conventional-github-releaser](https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser) library but with some additional features.
   - one of the underlying resources that **changelogithub** uses is the CLI from [chanelogen](https://github.com/unjs/changelogen)

## CLI Reference

The CLI which `changelogithub` uses is shown here:

- https://github.com/antfu/changelogithub/blob/main/src/cli.ts

and looks something like this:

```ts
#!/usr/bin/env node

import fs from 'node:fs/promises'
import process from 'node:process'
import { blue, bold, cyan, dim, red, yellow } from 'ansis'
import cac from 'cac'
import { execa } from 'execa'
import { version } from '../package.json'
import { uploadAssets } from './github'
import { generate, hasTagOnGitHub, isRepoShallow, sendRelease } from './index'

const cli = cac('changelogithub')

cli
  .version(version)
  .option('-t, --token <path>', 'GitHub Token')
  .option('--from <ref>', 'From tag')
  .option('--to <ref>', 'To tag')
  .option('--github <path>', 'GitHub Repository, e.g. antfu/changelogithub')
  .option('--release-github <path>', 'Release GitHub Repository, defaults to `github`')
  .option('--name <name>', 'Name of the release')
  .option('--contributors', 'Show contributors section')
  .option('--prerelease', 'Mark release as prerelease')
  .option('-d, --draft', 'Mark release as draft')
  .option('--output <path>', 'Output to file instead of sending to GitHub')
  .option('--capitalize', 'Should capitalize for each comment message')
  .option('--emoji', 'Use emojis in section titles', { default: true })
  .option('--group', 'Nest commit messages under their scopes')
  .option('--dry', 'Dry run')
  .option('--assets <paths...>', 'Files to upload as assets to the release. Use quotes to prevent shell glob expansion, e.g., "--assets \'dist/*.js\'"')
  .help()

// ... more code below
```

The code snippet above though shows the main "switches" that the CLI exposes.
