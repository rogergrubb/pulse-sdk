# Publishing `@mypulsecity/sdk` to npm

Exact commands to ship v0.1.0. Run from your normal terminal (not from inside Claude).

---

## 0. Prerequisites (one-time)

```bash
# 1. Claim the npm org "mypulsecity"
#    Open: https://www.npmjs.com/org/create
#    Org name: mypulsecity
#    Plan: Free (unlimited public packages)
#    Members: just you for now (roger@grubb.net)

# 2. Verify Node 18+ is on PATH
node --version   # expect v18+ (v20 LTS recommended)
npm --version    # expect 10+
```

If you ever need to upgrade Node, install from https://nodejs.org/en/download (LTS).

---

## 1. Sanity-check the package locally

```bash
# Navigate to the package
cd C:\Users\Roger\AppData\Roaming\Claude\local-agent-mode-sessions\f58d710e-3057-493b-bfa1-d906cb673d76\215b0a37-1006-4d7b-bedb-21ff39067348\local_4950ca32-dfd1-4103-b175-dd3e8d8399d9\outputs\squads\sdk\pulse-sdk

# Clean install (skip postinstall scripts not needed for publish)
npm install

# Run the full prepublish gate (lint + test + build)
npm run lint
npm test
npm run build

# Preview exactly what will go in the tarball — should be ~18 files, ~10 KB packed
npm pack --dry-run
```

Expected `npm pack --dry-run` output: `mypulsecity-sdk-0.1.0.tgz`, **packed ~9.6 KB / unpacked ~60 KB**, 18 files, all under `dist/` + `LICENSE` + `README.md` + `CHANGELOG.md` + `package.json`. No `src/`, no tests, no config files.

---

## 2. Log in to npm

```bash
npm login
# Username:  rogergrubb        (or your npm handle — match the one on the mypulsecity org)
# Password:  ********
# Email:     roger@grubb.net
# OTP:       ******            (if 2FA is enabled — which it should be)
```

Verify:

```bash
npm whoami       # should print your npm username
npm org ls mypulsecity   # should list you as owner of the org
```

---

## 3. Publish

```bash
# Still in the pulse-sdk directory
npm publish --access public
```

`--access public` is required the first time a scoped package is published. (It's also set in `publishConfig` in package.json as a belt-and-suspenders, but pass the flag anyway.)

The publish will:
1. Re-run `prepublishOnly` (lint + test + build) — must pass.
2. Pack the tarball.
3. Push to https://registry.npmjs.org under the `mypulsecity` org.
4. Make it instantly installable as `npm install @mypulsecity/sdk`.

---

## 4. Verify it landed

```bash
# View on npm
start https://www.npmjs.com/package/@mypulsecity/sdk

# Smoke-test install in a scratch dir
cd $env:TEMP
mkdir pulse-smoke && cd pulse-smoke
npm init -y
npm install @mypulsecity/sdk
node -e "const Pulse = require('@mypulsecity/sdk').default; console.log(new Pulse({apiKey:'pk_test', userId:'u1'}).config)"
# Should print: { apiKey: 'pk_test', userId: 'u1' }
```

---

## 5. Tag the release in git (if/when this lives in a repo)

```bash
git tag -a sdk-v0.1.0 -m "Pulse SDK 0.1.0 — public API surface, stubbed impls"
git push origin sdk-v0.1.0
```

---

## Common gotchas

- **403 on publish** → you're not a member of the `mypulsecity` org, or 2FA OTP wasn't entered. Re-run `npm login` and `npm org ls mypulsecity`.
- **402 / "scope requires payment"** → you tried to publish a scoped package as private without a paid plan. The fix is `--access public` (already in `publishConfig`, just confirm).
- **`prepublishOnly` script fails on `npm test`** → if vitest fails with `spawn ... esbuild.exe ENOENT`, this is a Defender/Smart App Control quirk on first run. Re-running `npm test` usually clears it after Defender finishes scanning the binary. As a last resort: `npm publish --ignore-scripts --access public` (after manually running `npm run build` to ensure `dist/` is current).
- **Name conflict / "package name too similar"** → name `@mypulsecity/sdk` is scoped under your org, so this won't happen unless someone squats `mypulsecity`. Claim the org first.

---

## After 0.1.0

Next versions: `npm version patch|minor|major` then `npm publish`. Both auto-bump `package.json` and create a git tag (in repos).

Use `npm dist-tag` for prereleases:

```bash
npm version 0.2.0-beta.1
npm publish --tag beta --access public
# Users opt in with: npm install @mypulsecity/sdk@beta
```
