# Dependency advisory closure — 2026-09-09

This is an explicitly reviewed security and compatibility change. It is not a
routine update eligible for delegated acceptance solely because its audit is green.

## Changes and evidence boundaries

- The root audit started at 34 vulnerable package entries (18 high, 16 moderate).
  Compatible updates patch PostCSS, DOMPurify, Undici, Browserslist, shell-quote,
  xmldom, and the paired Vitest 4.1.11 packages. npm's count includes affected
  parent packages; it is not a count of distinct advisories.
- Expo's fixed transitive pins need scoped overrides: PostCSS 8.5.28 and Metro
  0.83.8/0.84.5 within their existing series. Those Metro patches remove the
  unpatched `image-size` dependency. The `xcode` override to UUID 11.1.1 is an
  explicit transitive major; UUID 11 retains CommonJS and the `v4()` interface
  that xcode uses. Remove overrides only when the resolved upstream graph stays
  patched without them.
- Puppeteer 24 has no patched `extract-zip` path. Puppeteer 25.10.0 removes it;
  this is a separate, explicit major migration. Version 25 is ESM-only, requires
  Node >=22.12, makes `defaultArgs`/`executablePath` asynchronous, and removes
  several deprecated APIs. Node 24.19.0/npm 11.9.0 now match across repository
  workflows, Docker stages and the server compilation target.
- Playwright 1.60.0 is now an explicit root runtime dependency as well as a web
  workspace dependency. Browser automation packages remain external to the
  CommonJS server bundle. Inlining Playwright's optional BiDi loader incorrectly
  resolved its private CommonJS paths against Puppeteer's ESM BiDi package;
  externalizing the packages preserves their own module boundaries.

The frozen root installation and fresh audit report zero vulnerabilities after
these changes. The Cloudflare graph is repaired separately. The required hosted
checks and trusted acceptance service must still verify each PR's exact revision.

## Runtime verification

Run all checks independently: `npm run typecheck`, `npm run lint`, frontend
Vitest, server Vitest, scraper Vitest, and `npm run build:render`. A formatting
failure must not prevent any compatibility job from running.

`scripts/test-browser-runtime.mjs` verifies both plain Puppeteer and the existing
puppeteer-extra/stealth launcher and Playwright against an already installed Chromium. It tests
CommonJS loading, the asynchronous default-arguments boundary, launch, DOM access,
page closing and browser cleanup. It downloads nothing, visits a data URL only,
and requires `PUPPETEER_EXECUTABLE_PATH` (or `CHROMIUM_EXECUTABLE_PATH`) explicitly. The local validation used
registry-packaged Chromium 152.0.7977.0 with Node 24.19.0; it does not establish
compatibility with every browser release or a live government portal. The dedicated
required `Browser runtime` CI job provisions the exact npm-locked Chromium
152.0.0 fixture from its bundled compressed executable and repeats all three
launcher probes independently from formatting and advisory evidence.

Node 24 supports `require(ESM)` and Puppeteer 25 exposes a `require` package
export; the cold CommonJS probe tests that supported boundary directly. Its
public `Browser.connected` getter is checked after cleanup. The Docker runner
explicitly provisions Alpine Chromium and validates its executable path during
image construction; release consumers must install or mount a compatible
browser. See [browser runtime configuration](../configuration/browser-runtime.md).

## Native exception at the advisory repair checkpoint

The existing mobile prototype combines Expo 54 with React Native 0.86, while
Expo 54's `bundledNativeModules.json` specifies React Native 0.81.5 and React
19.1.0. Its original React 19.1 pin also violated React Native 0.86's declared
React >=19.2.3 peer. The peer constraint is repaired here, but that does not make
this an Expo-supported native stack. Offline iOS export reproduces the existing
codegen failure in `VirtualViewExperimentalNativeComponent` (`onModeChange`).
A coordinated Expo/React Native/React migration and native bundle validation
belong to a separate behavior change. Web/server/browser success must not be
reported as native device acceptance.

The separate [native compatibility follow-up](../../apps/mobile/README.md) aligns
Expo 57, React Native 0.86.3 and React 19.2.3, and adds required local iOS and
Android JavaScript exports. It raises the native platform floor to iOS 16.4 and
Xcode 26.4. These bundle checks close the source compatibility exception without
establishing device execution or signed native release readiness.

npm 11.9 also has upstream workspace-override reporting/update defects. A fresh
install applies the declared patched resolutions, but `npm ls --all` can report
those intentional workspace overrides as invalid. Do not suppress this output,
use `--force`/`--legacy-peer-deps`, or accept a lockfile based only on that command.
Frozen installation, resolved versions, a fresh audit and the compatibility
checks are the evidence; later updates must re-establish all of them.

## Primary references

- [Puppeteer changelog](https://pptr.dev/CHANGELOG)
- [Unpatched extract-zip traversal](https://github.com/advisories/GHSA-jmr9-qjv8-65gv)
- [Unpatched image-size denial of service](https://github.com/advisories/GHSA-w3rx-r6r6-pgpr)
- [UUID buffer bounds advisory](https://github.com/advisories/GHSA-w5hq-g745-h8pq)
- [npm workspace override reporting defect](https://github.com/npm/cli/issues/9514)
- [npm workspace update override defect](https://github.com/npm/cli/issues/8258)
