import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

// Local dependency/runtime smoke. No Wrangler CLI, credentials or remote bindings.
const edge = new URL('../cloudflare/', import.meta.url)
const compatibility = JSON.parse(
  execFileSync(
    'python3',
    [
      '-c',
      'import json,sys,tomllib; c=tomllib.load(open(sys.argv[1], "rb")); print(json.dumps({"date":c["compatibility_date"],"flags":c.get("compatibility_flags",[])}))',
      fileURLToPath(new URL('wrangler.toml', edge))
    ],
    { encoding: 'utf8' }
  )
)
const requireEdge = createRequire(new URL('package.json', edge))
const { build } = requireEdge('esbuild')
const { Miniflare, convertV4MiniflareOptions } = requireEdge('miniflare')
const bundled = await build({
  absWorkingDir: fileURLToPath(edge),
  entryPoints: ['workers/api/src/index.ts'],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  write: false
})
let outboundRequests = 0
const worker = new Miniflare(
  convertV4MiniflareOptions({
    script: bundled.outputFiles[0].text,
    modules: true,
    compatibilityDate: compatibility.date,
    compatibilityFlags: compatibility.flags,
    host: '127.0.0.1',
    port: 0,
    cf: false,
    telemetry: { enabled: false },
    bindings: { ENVIRONMENT: 'local-dependency-smoke' },
    outboundService: () => {
      outboundRequests += 1
      throw new Error('This local smoke must never contact external services')
    }
  })
)
try {
  const health = await worker.dispatchFetch('http://localhost/health')
  assert.equal(health.status, 200)
  assert.deepEqual(await health.json(), { ok: true, env: 'local-dependency-smoke' })
  const protectedRoute = await worker.dispatchFetch('http://localhost/api/prospects')
  assert.equal(protectedRoute.status, 401)
  const missing = await worker.dispatchFetch('http://localhost/does-not-exist')
  assert.equal(missing.status, 404)
  assert.equal(outboundRequests, 0)
  console.log(
    'Local Worker runtime passed: health=200, unauthenticated=401, missing=404; outbound=0'
  )
} finally {
  await worker.dispose()
}
