# Mobile dependency compatibility

The mobile prototype uses Expo SDK 57, React Native 0.86.3 and React 19.2.3.
Expo 54 with React Native 0.86 could install but failed to export native bundles
because its Metro/codegen toolchain did not support that React Native version.
This upgrade aligns the complete native dependency family with Expo's bundled
version recommendations.

This SDK upgrade is separate from the root advisory fixes. It raises
the minimum native platform requirements:

| Requirement                | Previous Expo 54 family | Expo 57 family |
| -------------------------- | ----------------------- | -------------- |
| iOS                        | 15.1+                   | **16.4+**      |
| Xcode                      | 16.1+                   | **26.4+**      |
| Android                    | 7+                      | 7+             |
| Android compile/target SDK | 36                      | 36             |

These requirements come from the [Expo SDK support table](https://docs.expo.dev/versions/v57.0.0/).
The [SDK 57 release notes](https://expo.dev/changelog/sdk-57) describe the React
Native 0.86.3 regression fixes included in the selected Expo patch release.
Devices below iOS 16.4 cannot use a future native build of this version.

Use the repository's Node 24.19.0 and npm 11.9.0 toolchain and its root
`package-lock.json`. React and React DOM are pinned together at the repository
root. React Native is also explicitly declared at the root and in this workspace:
the root declaration prevents npm from selecting a different version for Expo's
hoisted peer dependency. Update these declarations together with Expo's
`bundledNativeModules.json`; a newer React Native version alone is not a
compatible update.

The required `Native compatibility` CI job checks installed module resolution,
Expo's bundled recommendations, TypeScript, and independent local iOS and Android
JavaScript exports. It runs separately from formatting and advisory evidence.
The existing optional EAS workflow retains its own enablement and credentials.

Run the same local checks from the repository root:

```sh
npm ci --ignore-scripts --no-audit --no-fund
node scripts/check-mobile-dependencies.mjs
EXPO_OFFLINE=1 EXPO_NO_TELEMETRY=1 CI=1 npm exec --workspace apps/mobile -- expo install --check
npm exec --workspace apps/mobile -- tsc --noEmit
EXPO_OFFLINE=1 EXPO_NO_TELEMETRY=1 CI=1 npm exec --workspace apps/mobile -- expo export --platform ios --output-dir /tmp/ucc-mobile-ios --no-bytecode --max-workers 2
EXPO_OFFLINE=1 EXPO_NO_TELEMETRY=1 CI=1 npm exec --workspace apps/mobile -- expo export --platform android --output-dir /tmp/ucc-mobile-android --no-bytecode --max-workers 2
```

Offline Expo validation uses the installed SDK's recommendations. Local JavaScript
exports prove bundler compatibility; they do not prove device execution, a signed
native build, or an App Store submission. No EAS build or native release is part
of this change.
