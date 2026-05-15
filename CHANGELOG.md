# Changelog

All notable changes to `@mypulsecity/sdk` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] — 2026-04-20

Initial scaffolding. Public API surface frozen. Implementation in progress.

### Added

- `Pulse` class with constructor accepting `PulseConfig`.
- Stubbed `emit`, `subscribe`, `renderInto`, and `destroy` methods with final type signatures.
- Public types: `PulseConfig`, `Position`, `NearbyPulse`, `SubscribeQuery`, `SubscribeCallback`, `Unsubscribe`, `RenderOpts`, `PulseRenderView`.
- React entry point at `@mypulsecity/sdk/react` exporting `<PulseView />`.
- Dual ESM + CJS build via `tsup`, with generated `.d.ts` declarations.
- MIT license.

### Notes

- Method bodies throw `not yet implemented — see spec at mypulse.city/sdk`. Type signatures are production-final and will not change before v1.0.
- Public API stability target: v1.x API stable for two years minimum from launch.
