# Quickstart: Replace Gulp with npm Scripts

**Feature**: Replace Gulp with Modern Build Tooling
**Branch**: `001-replace-gulp`
**Last Updated**: 2025-11-12

## Overview

This guide helps you understand, test, and validate the Gulp to npm scripts migration. The migration replaces a single dependency (Gulp) with zero new dependencies while preserving 100% of functionality.

## What's Changing

### Before (Gulp)

```bash
# Current commands:
npm test           # Runs gulp default (quality → docs → test)
gulp               # Same as npm test
gulp quality       # Run ESLint
gulp test          # Run Mocha tests with NYC coverage
gulp docs          # Generate documentation
```

**Dependencies**: gulp@5.0.1

### After (npm Scripts)

```bash
# New commands:
npm test           # Runs full pipeline (lint → docs → test:run)
npm run lint       # Run ESLint
npm run test:run   # Run Mocha tests with NYC coverage
npm run docs       # Generate documentation
```

**Dependencies**: None (zero new dependencies added)

## Quick Validation

### 1. Test Individual Scripts

```bash
# Test linting:
npm run lint
# Expected: ESLint runs on *.js and {rules,test,scripts}/**/*.js
# Should show any lint errors or "✓ No problems"

# Test documentation:
npm run docs
# Expected: Updates README.md and creates doc files
# Should complete silently or show "Documentation generated"

# Test suite:
npm run test:run
# Expected: Runs all Mocha tests with NYC coverage
# Should show test results and coverage report
```

### 2. Test Full Pipeline

```bash
# Run complete validation:
npm test

# Expected sequence:
# 1. ESLint runs first
# 2. If ESLint passes, docs generation runs
# 3. If docs pass, tests run with coverage
# If any step fails, pipeline stops immediately
```

### 3. Test Fail-Fast Behavior

```bash
# Test 1: Lint failure stops pipeline
# 1. Introduce a lint error (e.g., add "var x = ;" to index.js)
# 2. Run: npm test
# 3. Expected: Fails at lint step, never runs docs or tests

# Test 2: Test failure is reported
# 1. Introduce a failing test (e.g., expect(true).to.equal(false))
# 2. Run: npm test
# 3. Expected: Lint passes, docs pass, tests fail with non-zero exit

# Clean up after testing
git checkout index.js test/**/*.js
```

### 4. Verify Output Format

```bash
# Run full pipeline and check:
npm test

# Verify:
# ✅ Colors are preserved (ANSI codes work)
# ✅ Progress indicators show in real-time
# ✅ Test results formatted correctly
# ✅ Coverage table displays properly
# ✅ No output buffering (streams in real-time)
```

### 5. Verify Performance

```bash
# Baseline current implementation:
time npm test    # Note the time

# After migration (once npm scripts in place):
time npm test    # Should be equal or faster
```

## Command Reference

### Full Command Mapping

| Old Command | New Command | Purpose |
|-------------|-------------|---------|
| `npm test` | `npm test` | Run full validation pipeline (unchanged!) |
| `gulp` or `gulp default` | `npm test` | Run full validation pipeline |
| `gulp quality` | `npm run lint` | Run ESLint on all JS files |
| `gulp test` | `npm run test:run` | Run Mocha tests with NYC coverage |
| `gulp docs` | `npm run docs` | Generate documentation |

### New Script Definitions

```json
{
  "scripts": {
    "lint": "eslint \"*.js\" \"{rules,test,scripts}/**/*.js\"",
    "test:run": "nyc --reporter=lcov --reporter=text mocha test/**",
    "docs": "node scripts/docs.js",
    "test": "npm run lint && npm run docs && npm run test:run"
  }
}
```

## Verification Checklist

Use this checklist to verify the migration is successful:

### Functional Verification

- [ ] `npm run lint` executes ESLint on all expected files
- [ ] `npm run docs` updates README.md
- [ ] `npm run docs` creates doc files in docs/
- [ ] `npm run test:run` executes all tests
- [ ] `npm run test:run` generates LCOV coverage report
- [ ] `npm run test:run` displays text coverage report
- [ ] `npm test` runs all three steps in correct order (lint → docs → test)
- [ ] Pipeline stops on first failure (fail-fast verified)

### Output Verification

- [ ] ESLint output shows colors and formatting
- [ ] Mocha output shows colors and test results
- [ ] NYC coverage table displays properly
- [ ] Output appears in real-time (not buffered)
- [ ] Error messages are clear and actionable

### Exit Code Verification

- [ ] `npm run lint` exits with 0 on success, 1 on lint errors
- [ ] `npm run test:run` exits with 0 on passing tests, 1 on failures
- [ ] `npm test` exits with 0 if all steps pass
- [ ] `npm test` exits with non-zero if any step fails
- [ ] Exit codes work correctly in CI/CD (GitHub Actions)

### Performance Verification

- [ ] `npm test` execution time ≤ current Gulp implementation
- [ ] Individual scripts have negligible overhead
- [ ] No noticeable startup delay

### Cleanup Verification

- [ ] `gulp` package removed from devDependencies
- [ ] `gulpfile.js` deleted
- [ ] `package-lock.json` regenerated
- [ ] No references to Gulp in package.json
- [ ] README.md updated with new commands
- [ ] GitHub Actions workflow still passes

## Troubleshooting

### Issue: "eslint: command not found"

**Cause**: ESLint not installed or not in PATH

**Solution**:
```bash
npm install
# ESLint is in devDependencies, should install automatically
```

### Issue: "mocha: command not found"

**Cause**: Mocha not installed or not in PATH

**Solution**:
```bash
npm install
# Mocha is in devDependencies, should install automatically
```

### Issue: Glob patterns not expanding correctly

**Symptom**: ESLint only checks root files, not subdirectories

**Solution**: Ensure quotes are present in package.json:
```json
"lint": "eslint \"*.js\" \"{rules,test,scripts}/**/*.js\""
//               ↑               ↑ Quotes required
```

### Issue: Pipeline doesn't stop on failure

**Symptom**: Tests run even when lint fails

**Solution**: Verify `&&` operator is used in test script:
```json
"test": "npm run lint && npm run docs && npm run test:run"
//                     ↑↑            ↑↑ && required for fail-fast
```

### Issue: Output looks different than Gulp

**Symptom**: Colors missing, formatting changed, or buffered output

**Solution**: Verify npm scripts run commands directly (no wrappers):
```json
// ✅ Correct: Direct command
"lint": "eslint \"*.js\" \"{rules,test,scripts}/**/*.js\""

// ❌ Incorrect: Wrapper that buffers output
"lint": "node -e \"require('child_process').exec('eslint ...')\""
```

### Issue: "Cannot find module 'scripts/docs.js'"

**Symptom**: `npm run docs` fails with module not found

**Solution**: Verify file path is correct:
```bash
ls scripts/docs.js  # Should exist
```

If docs.js is not executable as a script, may need modification.

## CI/CD Integration

### GitHub Actions

The existing workflow should work without changes:

```yaml
# .github/workflows/main.yml
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm test  # ← No changes needed!
```

**Why it works**: `npm test` still runs the full validation pipeline, just using npm scripts instead of Gulp internally.

### Other CI Systems

If your CI uses explicit Gulp commands:

```bash
# Before:
gulp
gulp quality
gulp test

# After:
npm test
npm run lint
npm run test:run
```

Update your CI configuration files accordingly.

## Rollback Procedure

If you need to revert to Gulp:

```bash
# 1. Restore gulpfile.js
git checkout HEAD^ -- gulpfile.js

# 2. Restore package.json scripts
git checkout HEAD^ -- package.json

# 3. Reinstall dependencies
npm install

# 4. Verify Gulp works
npm test
```

**Note**: Rollback is safe because changes are configuration-only.

## Next Steps

1. Review [plan.md](./plan.md) for detailed implementation strategy
2. Review [research.md](./research.md) for technical decision rationale
3. Generate tasks: `/speckit.tasks`
4. Execute tasks in order
5. Verify all checklist items
6. Commit and push changes
7. Monitor CI/CD pipeline

## Support

- **Feature Spec**: [spec.md](./spec.md)
- **Implementation Plan**: [plan.md](./plan.md)
- **Research**: [research.md](./research.md)
- **Issues**: Report on GitHub or contact maintainers

---

**Ready to implement?** Run `/speckit.tasks` to generate the detailed task list.
