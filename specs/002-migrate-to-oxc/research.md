# Phase 0: Research - OXC Technical Investigation

**Date**: 2025-11-13
**Status**: Completed
**Purpose**: Investigate OXC (Oxlint) capabilities, installation, configuration, and compatibility with the project's requirements.

## Executive Summary

**✅ OXC Migration is Technically Viable**

Oxlint is a production-ready, Rust-based JavaScript/TypeScript linter (v1.0+ stable since Jun 2025) that can replace ESLint in this project. It provides:
- **50-100x faster** performance than ESLint
- **600+ built-in rules** covering ESLint, TypeScript, React, Jest, and more
- **Zero-config philosophy** with sensible defaults
- **.oxlintrc.json configuration** format (ESLint-familiar structure)
- **npm package**: `oxlint` (installable via `npm install -D oxlint`)
- **Node.js compatibility**: Requires Node.js >= 20.19.0 or >= 22.12.0

## Key Research Questions (Resolved)

### Q1: What is the correct OXC npm package name and installation command?

**Answer**: `oxlint`

**Installation**:
```bash
npm install -D oxlint
```

**Latest Version**: 1.28.0 (as of 2025-11-11, very actively maintained)

**Real-World Adoption**: Airbnb (126k+ files, 7s on CI), Preact, Shopify, ByteDance, Shopee

---

### Q2: What is OXC's native configuration file format and location?

**Answer**: `.oxlintrc.json` in project root

**Format** (ESLint-familiar structure):
```json
{
  "plugins": ["react", "unicorn", "typescript", "oxc"],
  "rules": {
    "no-unused-vars": "error",
    "react/jsx-no-undef": "warn"
  },
  "ignorePatterns": ["dist/", "node_modules/"]
}
```

**Rule Severity Levels**: `"off"`, `"warn"`, `"error"` (same as ESLint)

**Initialization Command**:
```bash
npx oxlint --init
```

**Custom Config Path** (if needed):
```bash
npx oxlint --config path/to/config.json
```

---

### Q3: Does OXC support Node.js/CommonJS/ES6 syntax used in this project?

**Answer**: ✅ **YES** - Full support

**Supported File Extensions**: `.js, .mjs, .cjs, .jsx, .ts, .mts, .cts, .tsx`

**Language Support**:
- ECMAScript 6 (ES2015+)
- CommonJS modules (`.cjs` extension and `require/module.exports` syntax)
- ES6 modules (`.mjs` extension and `import/export` syntax)
- Node.js globals and APIs

**Additional Support**: Vue SFC `<script>`, Astro, Svelte components

**Node.js Requirement**: >= 20.19.0 or >= 22.12.0 (project should verify current Node version)

---

### Q4: How do OXC rule names map to ESLint equivalents?

**Answer**: **ESLint-Compatible Rule Names**

Oxlint uses ESLint-compatible rule naming for its 600+ built-in rules, sourced from:
- **eslint** core rules (e.g., `no-unused-vars`, `no-debugger`, `eqeqeq`)
- **@typescript-eslint** rules
- **eslint-plugin-react** rules
- **eslint-plugin-jest** rules
- **eslint-plugin-unicorn** rules
- **eslint-plugin-jsx-a11y** rules
- **oxc** custom rules (Oxlint-specific)

**Rule Categories** (severity hints):
- `correctness` - Code that is outright wrong or useless (default enabled)
- `suspicious` - Code that is most likely wrong or useless
- `pedantic` - Strict lints with occasional false positives
- `style` - Non-idiomatic code style
- `nursery` - New lints under development
- `restriction` - Prevents use of specific language/library features

**Rule Discovery**:
```bash
npx oxlint --rules          # List all rule names
npx oxlint --help --help    # Show rule categories
```

**Mapping Strategy**: Since Oxlint uses ESLint-compatible naming, most rules from [eslint.config.mjs](../../eslint.config.mjs) can be directly ported by name (e.g., `no-console`, `comma-dangle`, `strict`). However, per spec requirements (FR-008), the migration prioritizes **OXC's best-practice rules** over exact 1:1 mapping.

---

### Q5: Can OXC output ANSI-colored terminal output?

**Answer**: ✅ **YES** - Multiple output formats including colored terminal output

**Output Formats** (`--format=ARG`):
- `default` - Default colored terminal output (ANSI colors)
- `stylish` - Stylish formatted output
- `unix` - Unix-style output
- `json` - Machine-readable JSON
- `checkstyle` - Checkstyle XML
- `github` - GitHub Actions annotations
- `gitlab` - GitLab CI format
- `junit` - JUnit XML

**Default Behavior**: Colored terminal output with ANSI escape codes (meets FR-004 requirement)

---

### Q6: What is OXC's CLI command syntax for file patterns?

**Answer**: Flexible file pattern support via positional arguments and ignore options

**Basic Syntax**:
```bash
oxlint [OPTIONS]... [PATH]...
```

**File Pattern Examples**:
```bash
oxlint                                    # Lint all supported files in current directory
oxlint src/                               # Lint all files in src/
oxlint "*.js" "rules/**/*.js"             # Lint specific glob patterns
oxlint file1.js file2.js                  # Lint specific files
```

**Ignore Options**:
- `--ignore-path=PATH` - Specify custom ignore file (like `.eslintignore`)
- `--ignore-pattern=PAT` - Specify ignore patterns via CLI
- `--no-ignore` - Disable all ignore rules
- `.oxlintrc.json` - Configure `ignorePatterns` array in config file

**Example for This Project** (replace `npm run lint` script):
```json
{
  "scripts": {
    "lint": "oxlint \"*.js\" \"{rules,test,scripts}/**/*.js\""
  }
}
```

**Alternative** (if Oxlint auto-discovers all files):
```json
{
  "scripts": {
    "lint": "oxlint"
  }
}
```
with `.oxlintrc.json` configuring `ignorePatterns` for `node_modules/`, etc.

---

### Q7: Exit Codes and Error Handling

**Exit Code Behavior**:
- **Exit 0**: No lint errors or warnings (success)
- **Exit 1**: Lint errors detected (failure)

**Warning Threshold** (`--max-warnings=INT`):
- Force exit code 1 if warning count exceeds threshold
- Useful for CI/CD pipelines requiring strict quality gates

**Known Issue** (github.com/oxc-project/oxc/issues/5073):
- Oxlint may return exit code 1 even for warnings when using `--max-warnings`
- Monitor for resolution or workaround in future releases

**Meets Requirement**: ✅ FR-003 (exit code 0 on success, non-zero on violations)

---

## Additional Capabilities

### Auto-Fixing (`--fix`)

Oxlint supports automatic fixing of many linting violations:
```bash
oxlint --fix
```

**Use Case**: Speed up migration by auto-fixing style violations introduced by stricter OXC rules.

---

### Type-Aware Linting (`--type-aware`)

Oxlint v1.0+ includes TypeScript type-aware linting (released Aug 2025):
```bash
oxlint --type-aware
```

**Relevance**: This project uses JavaScript (not TypeScript), so type-aware linting is **not applicable**.

---

### JavaScript Plugin Support (2025)

Oxlint now supports **ESLint-compatible plugins** written in JavaScript, enabling migration of custom ESLint plugins without rewriting in Rust.

**Relevance**: This project is an **ESLint plugin** (provides rules to ESLint), not a consumer of ESLint plugins. The plugin functionality itself remains unchanged (this migration only affects how the plugin's codebase is linted).

---

### Pre-Commit Integration

Oxlint integrates with `lint-staged` for pre-commit hooks:
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "oxlint"
  }
}
```

**Out of Scope**: Per spec (Scope section), IDE/editor integration is out of scope, but this could be added in future enhancements.

---

## Migration Tooling

### ESLint Config Conversion

Oxlint provides `oxlint-migrate` for converting existing `eslint.config.*` files to `.oxlintrc.json`.

**Decision**: Per spec FR-007 and user decision (Q1: B), this migration will **create a new OXC-specific configuration** using best practices rather than converting the existing [eslint.config.mjs](../../eslint.config.mjs).

**Rationale**:
1. Opportunity to adopt stricter, modern rules (FR-008, user decision Q2: C)
2. Clean slate removes legacy ESLint rule cruft
3. Oxlint's zero-config philosophy aligns with minimal configuration

---

## Performance Benchmarks

**ESLint Baseline** (from spec):
- 4865+ JavaScript files
- ~8.73 seconds execution time

**Oxlint Performance Claims**:
- **50-100x faster** than ESLint
- Airbnb: 126,000 files linted in **7 seconds** on CI
- Scales with CPU cores

**Projected Performance**:
- Estimated: **0.1 - 0.2 seconds** for 4865 files (50x speedup = 0.17s)
- **Exceeds SC-001** requirement (≤8.73 seconds)
- **Exceeds SC-006** requirement (full pipeline ≤10 seconds)

**Validation Required**: Actual timing benchmarks must be measured during implementation to confirm performance gains.

---

## Risk Assessment

### ✅ Low Risk Items

1. **Installation**: Standard npm package installation (no custom build steps)
2. **Node.js Compatibility**: Project likely already meets Node.js >= 20.19.0 requirement
3. **File Pattern Support**: Glob patterns directly compatible with existing `npm run lint` script
4. **Output Formatting**: ANSI colors and error messages meet FR-004 requirement
5. **CI/CD Compatibility**: GitHub Actions integration confirmed (meets FR-010)

### ⚠️ Medium Risk Items

1. **Rule Coverage Gaps**: Some specific ESLint rules (e.g., `labeled`, `no-reserved-keys`) may not have Oxlint equivalents
   - **Mitigation**: Per FR-008, prioritize OXC best practices over exact parity; document unsupported rules

2. **Stricter Rules**: OXC's best-practice rules may introduce many new violations (user accepted this risk)
   - **Mitigation**: Use `oxlint --fix` for auto-fixable violations; manual fixes for remaining issues

3. **Exit Code Issue**: Known bug with `--max-warnings` returning exit code 1 for warnings
   - **Mitigation**: Monitor Oxlint releases; workaround by treating warnings as errors or ignoring exit codes

### 🔴 High Risk Items

**None Identified** - All critical requirements have confirmed technical solutions.

---

## Configuration Strategy

### Approach: Progressive Migration

1. **Phase 1**: Install Oxlint, create minimal `.oxlintrc.json` with default rules
2. **Phase 2**: Run `npx oxlint` to identify baseline violations
3. **Phase 3**: Apply `oxlint --fix` for auto-fixable violations
4. **Phase 4**: Manually fix remaining violations or add rule exceptions
5. **Phase 5**: Update `package.json` scripts, remove ESLint dependency
6. **Phase 6**: Validate CI/CD pipeline, performance benchmarks, documentation

### Minimal Configuration (Starting Point)

```json
{
  "plugins": ["oxc"],
  "rules": {},
  "ignorePatterns": ["node_modules/"]
}
```

**Rationale**: Oxlint's zero-config philosophy means starting with defaults and iteratively adding exceptions only as needed. This aligns with FR-008 (use OXC best practices).

---

## Compatibility Matrix

| Requirement | ESLint (Current) | Oxlint (Target) | Status |
|-------------|------------------|-----------------|--------|
| FR-001: Replace ESLint | ✅ Current tool | ✅ Replacement ready | ✅ Compatible |
| FR-002: File pattern support | ✅ `{*.js,rules/**}` | ✅ Glob patterns | ✅ Compatible |
| FR-003: Exit codes | ✅ 0/1 codes | ✅ 0/1 codes | ✅ Compatible |
| FR-004: ANSI colors | ✅ Colored output | ✅ Colored output | ✅ Compatible |
| FR-005: Fail-fast pipeline | ✅ `&&` operator | ✅ `&&` operator | ✅ Compatible |
| FR-006: Remove ESLint | ✅ Current dep | ✅ Not needed | ✅ Compatible |
| FR-007: OXC config | ❌ N/A | ✅ `.oxlintrc.json` | ✅ Compatible |
| FR-008: Best-practice rules | ⚠️ Manual config | ✅ Defaults + zero-config | ✅ Compatible |
| FR-009: Error details | ✅ File/line/rule | ✅ File/line/rule | ✅ Compatible |
| FR-010: CI/CD (GitHub Actions) | ✅ Works | ✅ Works | ✅ Compatible |
| FR-011: npm script compatibility | ✅ `npm run lint` | ✅ `npm run lint` | ✅ Compatible |

**Conclusion**: ✅ **All functional requirements have confirmed technical solutions in Oxlint.**

---

## Open Questions (To Be Resolved in Phase 1)

1. **Node.js Version Check**: Verify project's Node.js version meets >= 20.19.0 requirement
   - **Action**: Check `.nvmrc`, `package.json` `engines`, or CI configuration

2. **Rule Mapping Details**: Identify which specific rules from [eslint.config.mjs](../../eslint.config.mjs) have no Oxlint equivalent
   - **Action**: Run `npx oxlint --rules` and compare against current 100+ ESLint rules

3. **Baseline Violation Count**: Determine how many violations OXC's stricter rules introduce
   - **Action**: Run initial `npx oxlint` scan on current codebase

4. **Auto-Fix Coverage**: Determine percentage of violations fixable with `--fix`
   - **Action**: Run `npx oxlint --fix` and compare before/after violation counts

---

## Recommendations

### ✅ Proceed with Migration

Based on this research:
1. **Oxlint is production-ready** (v1.0+ stable, real-world adoption at scale)
2. **All functional requirements are technically feasible**
3. **Performance gains will significantly exceed targets** (projected 50x+ speedup)
4. **Migration risk is low-to-medium** with clear mitigation strategies

### Next Steps (Phase 1)

1. Generate [quickstart.md](./quickstart.md) - Step-by-step migration guide
2. Generate [contracts/oxc-config.md](./contracts/oxc-config.md) - Configuration file specification
3. Resolve open questions (Node.js version, rule mapping, baseline violations)
4. Update [agent context](.specify/agent-context.json) with research findings

---

## References

- **Oxlint Official Docs**: https://oxc.rs/docs/guide/usage/linter
- **Oxlint CLI Reference**: https://oxc.rs/docs/guide/usage/linter/cli
- **Oxlint Configuration**: https://oxc.rs/docs/guide/usage/linter/config
- **npm Package**: https://www.npmjs.com/package/oxlint
- **GitHub Repository**: https://github.com/oxc-project/oxc
- **v1.0 Announcement**: https://voidzero.dev/posts/announcing-oxlint-1-stable
- **Getting Started Guide**: https://betterstack.com/community/guides/scaling-nodejs/oxlint-explained/
- **Known Issues**: https://github.com/oxc-project/oxc/issues/5073 (exit code bug)

---

**Research Status**: ✅ **COMPLETE** - Ready for Phase 1 design artifacts.
