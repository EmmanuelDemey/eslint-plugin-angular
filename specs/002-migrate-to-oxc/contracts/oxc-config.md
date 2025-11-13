# Configuration Contract: .oxlintrc.json

**Feature**: 002-migrate-to-oxc
**Purpose**: Define the structure, semantics, and validation rules for the OXC configuration file.
**Related**: FR-007 (MUST create OXC-specific configuration), FR-008 (MUST use best-practice rules)

---

## Overview

The `.oxlintrc.json` file configures Oxlint's linting behavior, including enabled plugins, rule overrides, and ignore patterns. This contract defines the expected structure and semantics for this project's migration.

**Location**: Project root (`/Users/emmanueldemey/Documents/workspaces/eslint-plugin-angular/.oxlintrc.json`)

**Format**: JSON (strict syntax, no comments allowed in the file itself)

---

## Schema

### Top-Level Structure

```typescript
interface OxlintConfig {
  plugins?: string[];           // Array of plugin names to enable
  rules?: Record<string, RuleSeverity | [RuleSeverity, ...any[]]>;  // Rule overrides
  ignorePatterns?: string[];    // Glob patterns to ignore
  env?: Record<string, boolean>; // Environment presets (optional)
}

type RuleSeverity = "off" | "warn" | "error" | 0 | 1 | 2;
```

### Field Definitions

#### `plugins` (optional)

**Type**: `string[]`

**Purpose**: Enable specific Oxlint plugin rule sets.

**Available Plugins**:
- `"oxc"` - Oxlint-specific rules (recommended)
- `"react"` - React/JSX rules (if applicable)
- `"typescript"` - TypeScript rules (if applicable)
- `"unicorn"` - eslint-plugin-unicorn equivalent rules
- `"jest"` - Jest testing rules (if applicable)
- `"import"` - Import/export rules (if available)
- `"node"` - Node.js specific rules (if available)

**Default**: If omitted, Oxlint uses default rule set (correctness category).

**Example**:
```json
{
  "plugins": ["oxc"]
}
```

**For This Project**: Use `["oxc"]` only, since project is JavaScript-only Node.js code without React/TypeScript/Jest.

---

#### `rules` (optional)

**Type**: `Record<string, RuleSeverity | [RuleSeverity, ...any[]]>`

**Purpose**: Override default rule severity or configure rule options.

**Rule Severity Values**:
- `"off"` or `0` - Disable rule entirely
- `"warn"` or `1` - Report as warning (does not fail build by default)
- `"error"` or `2` - Report as error (fails build)

**Rule Configuration** (with options):
```json
{
  "rules": {
    "rule-name": ["error", { "option": "value" }]
  }
}
```

**Default**: If omitted, Oxlint uses built-in defaults (correctness + suspicious categories enabled as errors).

**Example**:
```json
{
  "rules": {
    "no-console": "warn",
    "no-debugger": "error",
    "eqeqeq": "off"
  }
}
```

**Philosophy for This Project** (per FR-008):
- Start with **empty object** `{}` to accept Oxlint best-practice defaults
- Add exceptions **only when necessary** (false positives, legacy code constraints)
- Prefer fixing code over adding exceptions

---

#### `ignorePatterns` (optional)

**Type**: `string[]`

**Purpose**: Specify glob patterns for files/directories to exclude from linting.

**Pattern Syntax**: Standard glob patterns (e.g., `"*.min.js"`, `"dist/"`, `"node_modules/**"`)

**Default**: If omitted, Oxlint respects `.eslintignore` files (via `--ignore-path` flag).

**Example**:
```json
{
  "ignorePatterns": [
    "node_modules/",
    ".git/",
    "dist/",
    "coverage/",
    "*.min.js"
  ]
}
```

**For This Project**: Minimal ignore patterns:
- `"node_modules/"` - Third-party dependencies (always exclude)
- `".git/"` - Git internals (always exclude)

**Note**: The npm `lint` script explicitly specifies file patterns (`"*.js" "{rules,test,scripts}/**/*.js"`), so `ignorePatterns` acts as a safety net rather than primary filter.

---

#### `env` (optional)

**Type**: `Record<string, boolean>`

**Purpose**: Enable global variables for specific environments.

**Available Environments** (tentative - verify Oxlint docs):
- `"node": true` - Node.js globals (e.g., `process`, `__dirname`)
- `"browser": true` - Browser globals (e.g., `window`, `document`)
- `"es6": true` or `"es2015": true` - ES6 globals (e.g., `Promise`, `Set`)
- `"mocha": true` - Mocha test globals (e.g., `describe`, `it`)

**Default**: If omitted, Oxlint may not recognize environment-specific globals (reports `no-undef` errors).

**Example**:
```json
{
  "env": {
    "node": true,
    "es6": true
  }
}
```

**For This Project** (based on [eslint.config.mjs](../../../eslint.config.mjs)):
- **Node.js environment**: `"node": true` (for `require`, `module.exports`, `process`, etc.)
- **ES6**: `"es6": true` (project uses ECMAScript 6 syntax)
- **Mocha (test files only)**: May need separate config or inline comments for test/ directory

**Research Needed**: Verify if Oxlint supports `env` field or uses different mechanism (e.g., `languageOptions.globals`).

---

## Minimal Configuration (Starting Point)

Per FR-008 (use OXC best practices) and research findings (zero-config philosophy):

```json
{
  "plugins": ["oxc"],
  "rules": {},
  "ignorePatterns": ["node_modules/", ".git/"]
}
```

**Rationale**:
1. **`plugins: ["oxc"]`** - Enable Oxlint-specific rules
2. **`rules: {}`** - Accept all default rules (best practices)
3. **`ignorePatterns`** - Exclude common non-source directories

**Iteration Strategy**:
1. Run `npx oxlint` to identify violations
2. Fix code issues (preferred)
3. Add rule exceptions only for false positives or legacy constraints

---

## Expected Configuration (After Iteration)

After migrating and fixing violations, the config may evolve to:

```json
{
  "plugins": ["oxc"],
  "rules": {
    "no-console": "warn",
    "no-debugger": "warn"
  },
  "ignorePatterns": ["node_modules/", ".git/"]
}
```

**Changes from Minimal**:
- `"no-console": "warn"` - Downgrade console.log from error to warning (dev tooling context)
- `"no-debugger": "warn"` - Downgrade debugger statements to warning (may be used during dev)

**No Further Exceptions Expected**: The current [eslint.config.mjs](../../../eslint.config.mjs) uses strict rules, so most code should already comply with quality standards.

---

## Configuration Discovery

Oxlint searches for `.oxlintrc.json` in this order:
1. Path specified by `--config` flag (if provided)
2. `.oxlintrc.json` in current working directory
3. Parent directories (walks up until found)

**For This Project**: Place `.oxlintrc.json` in project root to ensure consistent discovery.

---

## Validation Rules

### JSON Syntax

**MUST**:
- Be valid JSON (no trailing commas, no comments)
- Use double quotes for strings
- Use UTF-8 encoding

**Example Invalid** (trailing comma):
```json
{
  "plugins": ["oxc"],
}  // ❌ Syntax error
```

**Example Valid**:
```json
{
  "plugins": ["oxc"]
}
```

---

### Semantic Validation

**MUST**:
- Plugin names in `plugins` array must exist in Oxlint (e.g., `"oxc"`, `"react"`)
- Rule names in `rules` object must exist in enabled plugins
- Rule severity must be one of: `"off"`, `"warn"`, `"error"`, `0`, `1`, `2`
- Glob patterns in `ignorePatterns` must be valid glob syntax

**MUST NOT**:
- Reference ESLint-specific plugins not supported by Oxlint (e.g., custom plugins)
- Use invalid rule configuration options

**Validation Command**:
```bash
npx oxlint --config .oxlintrc.json
```

**Expected Output**: If config is invalid, Oxlint reports error and exits non-zero.

---

## Rule Discovery

To find available rule names:

```bash
npx oxlint --rules
```

**Output**: List of all rules with categories (correctness, suspicious, style, etc.).

**Filtering by Category**:
```bash
npx oxlint --help --help
```

**Output**: Shows rule categories (correctness, suspicious, pedantic, style, nursery, restriction).

---

## Migration Notes

### ESLint vs. OXC Rule Names

Most ESLint core rules have Oxlint equivalents with **identical names**:
- `no-console` ✅ (same)
- `eqeqeq` ✅ (same)
- `no-debugger` ✅ (same)
- `no-unused-vars` ✅ (same)

However, some ESLint rules may **not exist** in Oxlint:
- `labeled` ❌ (deprecated ESLint rule, no Oxlint equivalent)
- `no-reserved-keys` ❌ (ES3-specific rule, no Oxlint equivalent)

**Strategy**: Run `npx oxlint --rules | grep "rule-name"` to verify existence before adding to config.

---

### ESLint Config Conversion (Not Used)

Oxlint provides a migration tool:
```bash
npx oxlint-migrate eslint.config.mjs
```

**Outputs**: Converted `.oxlintrc.json` with equivalent rules.

**Decision for This Project**: **NOT using migration tool** (per FR-007, FR-008, user decision Q1: B).

**Rationale**: Fresh config with best practices > converted legacy config.

---

## Testing Configuration

### Verify Config Loads

```bash
npx oxlint --config .oxlintrc.json "*.js"
```

**Expected**: No config errors, linting runs successfully.

---

### Test Rule Override

Add a test rule to verify config applies:

```json
{
  "plugins": ["oxc"],
  "rules": {
    "no-console": "error"
  },
  "ignorePatterns": ["node_modules/", ".git/"]
}
```

**Create Test File** (`test-config.js`):
```javascript
console.log("This should trigger no-console error");
```

**Run Oxlint**:
```bash
npx oxlint test-config.js
```

**Expected Output**: Error reported for `no-console` violation.

**Clean Up**:
```bash
rm test-config.js
```

---

### Test Ignore Patterns

Add test ignore pattern:

```json
{
  "ignorePatterns": ["node_modules/", ".git/", "test-ignore.js"]
}
```

**Create Test File** (`test-ignore.js`):
```javascript
console.log("This should be ignored");
```

**Run Oxlint**:
```bash
npx oxlint
```

**Expected Output**: No errors for `test-ignore.js` (file ignored).

**Clean Up**:
```bash
rm test-ignore.js
```

---

## Contract Enforcement

### Pre-Commit Hook (Optional)

To enforce valid configuration on every commit:

```json
{
  "lint-staged": {
    ".oxlintrc.json": "npx oxlint --config .oxlintrc.json *.js"
  }
}
```

**Benefit**: Prevents invalid config from being committed.

**Scope**: Out of scope for this migration (per spec), but can be added later.

---

## Documentation References

- **Oxlint Configuration Docs**: https://oxc.rs/docs/guide/usage/linter/config
- **Oxlint CLI Reference**: https://oxc.rs/docs/guide/usage/linter/cli
- **Rule Categories**: https://oxc.rs/docs/guide/usage/linter.html#rule-categories
- **Migration Guide**: https://betterstack.com/community/guides/scaling-nodejs/oxlint-explained/

---

## Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2025-11-13 | 1.0 | Initial configuration contract for 002-migrate-to-oxc feature |

---

## Appendix: Current ESLint Rules (Reference)

The existing [eslint.config.mjs](../../../eslint.config.mjs) defines ~100+ explicit rules. Below is a summary of rule categories:

**Possible Errors** (25 rules):
- `comma-dangle`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-args`, `no-dupe-keys`, `no-duplicate-case`, `no-empty-character-class`, `no-empty`, `no-ex-assign`, `no-extra-boolean-cast`, `no-extra-semi`, `no-func-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-negated-in-lhs`, `no-obj-calls`, `no-regex-spaces`, `no-sparse-arrays`, `no-unreachable`, `use-isnan`, `valid-typeof`

**Best Practices** (30+ rules):
- `accessor-pairs`, `block-scoped-var`, `curly`, `dot-notation`, `eqeqeq`, `no-alert`, `no-caller`, `no-else-return`, `no-eq-null`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-fallthrough`, `no-floating-decimal`, `no-implied-eval`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-spaces`, `no-native-reassign`, `no-new-func`, `no-new-wrappers`, `no-octal-escape`, `no-octal`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unused-expressions`, `no-void`, `no-with`, `radix`, `wrap-iife`, `yoda`

**Strict Mode** (1 rule):
- `strict` (global)

**Variables** (7 rules):
- `no-catch-shadow`, `no-delete-var`, `no-shadow-restricted-names`, `no-shadow`, `no-undef-init`, `no-undef`, `no-unused-vars`

**Node.js** (7 rules):
- `callback-return`, `global-require`, `handle-callback-err`, `no-mixed-requires`, `no-new-require`, `no-path-concat`, `no-process-exit`

**Stylistic** (30+ rules):
- `brace-style`, `camelcase`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `func-style`, `indent` (4 spaces), `keyword-spacing`, `key-spacing`, `linebreak-style` (unix), `new-cap`, `new-parens`, `no-array-constructor`, `no-lonely-if`, `no-multiple-empty-lines`, `no-nested-ternary`, `no-new-object`, `no-spaced-func`, `no-trailing-spaces`, `no-unneeded-ternary`, `object-curly-spacing`, `one-var`, `operator-assignment`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes` (single), `semi-spacing`, `semi`, `sort-vars`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`

**Complexity** (2 rules):
- `max-len` (disabled), `max-depth` (disabled)

**Total**: ~100 explicit rules

**Migration Strategy**: Do **not** attempt 1:1 mapping. Instead:
1. Start with Oxlint defaults (empty `rules: {}`)
2. Fix violations reported by Oxlint
3. Add exceptions only for false positives

This approach leverages Oxlint's curated best-practice rule set rather than replicating legacy ESLint config decisions.

---

**Configuration Contract Status**: ✅ Ready for implementation
