#!/usr/bin/env node
// Extract only the frozen npm fixture's bundled executable. No network access,
// lifecycle scripts, archive ownership changes, or platform browser download.
import { createReadStream, createWriteStream } from 'node:fs'
import { mkdtemp, chmod, stat } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { pipeline } from 'node:stream/promises'
import { createBrotliDecompress } from 'node:zlib'

const require = createRequire(import.meta.url)
const packageRoot = dirname(dirname(require.resolve('@sparticuz/chromium')))
const directory = await mkdtemp(join(process.env.RUNNER_TEMP || tmpdir(), 'ucc-chromium-'))
const executablePath = join(directory, 'chromium')
await pipeline(
  createReadStream(join(packageRoot, 'bin/chromium.br')),
  createBrotliDecompress(),
  createWriteStream(executablePath, { flags: 'wx', mode: 0o755 })
)
if ((await stat(executablePath)).size === 0) throw new Error('Bundled Chromium executable is empty')
await chmod(executablePath, 0o755)
console.log(`executable_path=${executablePath}`)
