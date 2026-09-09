# Browser runtime configuration

Browser automation is a separately provisioned runtime capability. The frozen
`npm ci --ignore-scripts` path installs JavaScript dependencies without downloading
browsers or executing dependency lifecycle hooks.

Every server launcher (plain Puppeteer, California's extra/stealth launcher, and
both New York Playwright searches) uses the same executable resolver:

- Set `PUPPETEER_EXECUTABLE_PATH` to an absolute Chromium executable path.
  `CHROMIUM_EXECUTABLE_PATH` is an alias. If both are set, they must agree.
- Configured paths must refer to a nonempty executable file; missing files,
  directories, relative paths, empty placeholders and non-executable files are
  rejected before launching.
- With `NODE_ENV=production`, missing configuration refuses browser scraping with
  an actionable error. Importing the API module does not launch a browser, and
  API-only operations do not require one.
- In development/test, an unconfigured launcher can use the automation library's
  already downloaded browser. Configured invalid paths still fail immediately.

The Docker runner installs Alpine's `chromium` package and validates
`/usr/bin/chromium` with `test -x` during the image build. It sets
`PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium`. Override that variable when mounting
a different executable; clear it before choosing a different alias value.
The non-root application user must be able to execute the mounted browser and
read its required system libraries.

For a packaged release, use Node 24.19.0/npm 11.9.0, install or mount Chromium
through the host OS, and configure its absolute executable path before browser
scraping. The release's `RUN.md` contains the frozen-install and startup commands.

## Offline compatibility canary

The required `Browser runtime` CI job frozen-installs the root graph, extracts
the exact `@sparticuz/chromium` 152.0.0 development fixture already contained in
that lock, and runs `scripts/test-browser-runtime.mjs`. The extraction script
uses local Brotli decompression; it does not call a browser download service or
run package lifecycle scripts. The canary checks all three automation SDK paths
against a local data URL, including launch, DOM access, page close and browser
cleanup. The aggregate CI gate requires that job and records base, PR head,
tested checkout, workflow revision and lock hash.

These probes establish compatibility with the fixture browser and Node runtime.
They are not a container deployment, an OS vulnerability audit, proof of every
Chromium build, or acceptance of the separately tracked native mobile stack.
