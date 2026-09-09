import assert from 'node:assert/strict'
import { readFileSync, realpathSync } from 'node:fs'
import { createRequire } from 'node:module'

const root = new URL('../', import.meta.url)
const mobile = createRequire(new URL('apps/mobile/package.json', root))
const web = createRequire(new URL('apps/web/package.json', root))
const expo = mobile('expo/package.json')
const expected = mobile('expo/bundledNativeModules.json')
const expoRequire = createRequire(mobile.resolve('expo/package.json'))
const nativeRequire = createRequire(mobile.resolve('react-native/package.json'))
const lock = JSON.parse(readFileSync(new URL('package-lock.json', root), 'utf8'))

// Moving to another SDK family needs review of native platform requirements.
assert.equal(expo.version.split('.')[0], '57', 'Review the platform floor before changing SDKs')
for (const name of ['react', 'react-native']) {
  const installed = mobile(`${name}/package.json`).version
  assert.equal(installed, expected[name], `${name} must match the installed Expo SDK`)
  const entries = Object.entries(lock.packages).filter(([path]) =>
    path.endsWith(`node_modules/${name}`)
  )
  assert.equal(entries.length, 1, `The workspace must contain one ${name} version`)
  assert.equal(entries[0][1].version, installed, `${name} lock and installation differ`)
  const resolved = realpathSync(mobile.resolve(`${name}/package.json`))
  for (const requireFrom of [expoRequire, nativeRequire]) {
    assert.equal(
      realpathSync(requireFrom.resolve(`${name}/package.json`)),
      resolved,
      `Expo and React Native must resolve the mobile app's ${name}`
    )
  }
}
assert.equal(web('react/package.json').version, expected.react)
assert.equal(web('react-dom/package.json').version, expected['react-dom'])
assert.equal(
  realpathSync(web.resolve('react/package.json')),
  realpathSync(mobile.resolve('react/package.json')),
  'Web and mobile must resolve the same React installation'
)
console.log(
  `Native graph verified: Expo ${expo.version}, React ${expected.react}, React Native ${expected['react-native']}`
)
