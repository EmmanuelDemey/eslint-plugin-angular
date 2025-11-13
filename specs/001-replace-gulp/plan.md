# Implementation Plan: Replace Gulp with Modern Build Tooling

**Branch**: `001-replace-gulp` | **Date**: 2025-11-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-replace-gulp/spec.md`

## Summary

Replace Gulp 5.0.1 with native npm scripts to modernize the build tooling without introducing new external dependencies. The current Gulp setup orchestrates three tasks (quality checks, documentation generation, and test execution) which will be replicated using npm scripts with proper sequencing and fail-fast behavior. This migration will remove the single Gulp dependency while preserving 100% of current functionality, maintaining the same exit codes, output formats, and stdio inheritance for real-time output.

## Technical Context

**Language/Version**: Node.js (inherited from project, minimum version determined by package.json engines field if present)
**Primary Dependencies**: ESLint ^9.32.0, Mocha 11.7.1, NYC 17.1.0, parse-comments 0.4.3, lodash 4.17.21 (existing, unchanged)
**Storage**: N/A (no persistent storage, file system operations only for docs generation)
**Testing**: Mocha 11.7.1 with NYC 17.1.0 for coverage (existing test framework, unchanged)
**Target Platform**: Node.js CLI environment, GitHub Actions CI/CD (ubuntu-latest)
**Project Type**: Single project - ESLint plugin library with CLI-based build tooling
**Performance Goals**: Same or better execution time as current Gulp implementation (baseline: time gulp default)
**Constraints**:
- Zero new external dependencies (npm scripts only)
- stdio: 'inherit' must be preserved for real-time output
- Exit codes must match current implementation (0 = success, non-zero = failure)
- Fail-fast pipeline behavior (stop on first failure)
**Scale/Scope**:
- 60+ rule files in rules/ directory
- 60+ test files in test/ directory
- 60+ example files in examples/ directory
- Single package.json with 7 devDependencies
- Single CI/CD workflow file (.github/workflows/main.yml)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: N/A - No project constitution file found (constitution.md is a template)

**Assessment**: Since no constitution exists, proceeding with standard software engineering best practices:
- Minimize dependencies (aligned with clarification decision)
- Preserve existing functionality (backward compatibility)
- Maintain test coverage (existing Mocha tests remain)
- Document changes (README updates included)

## Project Structure

### Documentation (this feature)

```text
specs/001-replace-gulp/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command) - N/A for this feature
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command) - N/A for this feature
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Single project structure (ESLint plugin)
rules/                    # 60+ ESLint rule implementations (unchanged)
test/                     # 60+ Mocha test files (unchanged)
scripts/                  # Build scripts including docs.js (unchanged)
├── docs.js              # Documentation generator (unchanged)
examples/                 # 60+ example files (unchanged)
docs/                     # Generated documentation files (unchanged)

# Configuration files
package.json              # MODIFIED: Remove gulp, update scripts
package-lock.json         # MODIFIED: Regenerated after removing gulp
gulpfile.js              # DELETED: Replaced by npm scripts
eslint.config.mjs         # Unchanged
index.js                  # Unchanged
environments.js           # Unchanged

# CI/CD
.github/workflows/main.yml  # Unchanged (runs npm test which will work with new scripts)

# Documentation
README.md                 # MODIFIED: Update build instructions
```

**Structure Decision**: This is a single-project structure (ESLint plugin library). The build tooling changes are configuration-only (package.json scripts) with no source code modifications required. The gulpfile.js will be deleted and replaced by npm scripts that invoke the same underlying tools (ESLint, Mocha, NYC, node scripts/docs.js).

## Complexity Tracking

> Not applicable - no constitution violations to justify.

## Phase 0: Research & Technical Decisions

### Research Areas

1. **npm Scripts Sequencing Patterns**
   - Decision: Use `&&` operator for sequential execution with fail-fast
   - Rationale: Built-in shell operator, no dependencies, stops on first non-zero exit
   - Alternatives considered:
     - `npm-run-all --sequential` (rejected: adds dependency, violates FR-013)
     - `;` operator (rejected: doesn't fail-fast, violates FR-006)
     - Custom Node.js script (rejected: unnecessary complexity for simple sequencing)

2. **Real-time Output (stdio Inheritance)**
   - Decision: Direct command execution in npm scripts (default stdio: 'inherit' behavior)
   - Rationale: npm scripts run commands directly with inherited stdio by default
   - Alternatives considered:
     - Custom wrapper script with child_process spawn (rejected: current gulpfile already does this, but npm scripts provide same behavior more simply)

3. **Documentation Generation Invocation**
   - Decision: `node scripts/docs.js` command
   - Rationale: Direct Node.js invocation of existing script, no changes to docs.js needed
   - Alternatives considered:
     - Convert to ES module with `node --loader` (rejected: unnecessary breaking change)
     - Use `npx` (rejected: adds startup overhead for local script)

4. **Multi-glob File Pattern Support for ESLint**
   - Decision: Space-separated patterns in single eslint command
   - Rationale: ESLint natively supports multiple patterns, matches current gulpfile behavior
   - Current gulpfile pattern: `'*.js', '{rules,test,scripts}/**/*.js'`
   - npm script equivalent: `eslint "*.js" "{rules,test,scripts}/**/*.js"`

5. **Exit Code Preservation**
   - Decision: No action required - npm scripts inherit exit codes from commands
   - Rationale: ESLint, Mocha, NYC, and Node.js all follow Unix conventions (0 = success)
   - Verification: Test each command individually to confirm exit code behavior

### Output Format Verification

Current Gulp implementation uses `stdio: 'inherit'` which:
- Streams stdout/stderr directly to parent process
- Preserves ANSI color codes
- Shows progress indicators in real-time
- Displays formatted test results

npm scripts default behavior:
- **Same as stdio: 'inherit'** - commands run with inherited stdio
- No configuration needed to achieve equivalent behavior

### Migration Safety Checklist

- [ ] Baseline current execution time: `time npm test`
- [ ] Verify ESLint exit codes: intentionally introduce lint error, check exit code
- [ ] Verify Mocha exit codes: intentionally fail test, check exit code
- [ ] Verify docs.js exit code: test with invalid inputs if applicable
- [ ] Confirm output format matches (colors, formatting, progress indicators)
- [ ] Test fail-fast: verify pipeline stops at first failure
- [ ] GitHub Actions compatibility: ensure ubuntu-latest supports all commands

## Phase 1: Design & Implementation Approach

### npm Scripts Design

**package.json scripts section** (replaces gulpfile.js):

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

**Mapping to Gulpfile Tasks**:

| Gulp Task | npm Script | Command |
|-----------|------------|---------|
| `gulp.task('quality')` | `npm run lint` | `eslint "*.js" "{rules,test,scripts}/**/*.js"` |
| `gulp.task('test')` | `npm run test:run` | `nyc --reporter=lcov --reporter=text mocha test/**` |
| `gulp.task('docs')` | `npm run docs` | `node scripts/docs.js` |
| `gulp.task('default')` | `npm test` | Sequential: lint → docs → test:run |

**Script Naming Rationale**:
- `lint`: Industry standard name for code quality checks
- `test:run`: Namespaced to distinguish from `test` (which runs full pipeline)
- `docs`: Clear, concise name for documentation generation
- `test`: Default test command (npm standard), runs full validation pipeline

**Sequencing Logic**:
```bash
# In package.json "test" script:
"test": "npm run lint && npm run docs && npm run test:run"

# How && ensures fail-fast:
# If lint fails (exit code ≠ 0) → stops, never runs docs or test:run
# If docs fails (exit code ≠ 0) → stops, never runs test:run
# If test:run fails (exit code ≠ 0) → exits with failure
# If all succeed (exit code = 0) → pipeline succeeds
```

### Data Model

**Not applicable** - This feature modifies build configuration only, no data entities or persistence involved. The "entities" in the spec (Quality Task, Test Task, Documentation Task, Build Pipeline) are conceptual workflow steps, not data structures.

### API Contracts

**Not applicable** - This feature has no APIs or contracts. The interface is npm scripts which follow npm's standard conventions:
- `npm run <script-name>` to execute
- Exit code 0 for success, non-zero for failure
- stdout for output, stderr for errors

### Implementation Steps (High-Level)

1. **Preparation**
   - Baseline current behavior (timing, output samples, exit codes)
   - Backup current gulpfile.js for reference
   - Document current npm test behavior

2. **package.json Modification**
   - Update scripts section with new commands
   - Verify no other package.json changes needed
   - Keep devDependencies unchanged initially

3. **Validation**
   - Run each individual script: `npm run lint`, `npm run docs`, `npm run test:run`
   - Run full pipeline: `npm test`
   - Verify fail-fast: introduce failures at each stage
   - Check output format matches baseline
   - Verify timing meets SC-001, SC-002

4. **Cleanup**
   - Remove gulp from devDependencies
   - Delete gulpfile.js
   - Regenerate package-lock.json: `npm install`

5. **Documentation**
   - Update README.md with new commands
   - Update any contributor documentation
   - Verify .github/workflows/main.yml still works (it runs `npm test`)

6. **Final Verification**
   - Run full test suite
   - Verify GitHub Actions workflow passes
   - Confirm all success criteria met

### Testing Strategy

**Unit-level verification** (each script independently):
```bash
npm run lint     # Should lint and report violations
npm run docs     # Should update README and create doc files
npm run test:run # Should run tests with coverage
```

**Integration verification** (full pipeline):
```bash
npm test         # Should run all three in sequence
```

**Failure mode testing**:
```bash
# Introduce lint error → verify pipeline stops
# Introduce test failure → verify pipeline reports and stops
# Introduce docs error (if possible) → verify pipeline stops
```

**CI/CD verification**:
- Push to branch
- Verify GitHub Actions workflow passes
- Confirm output in Actions log matches local output

### Rollback Plan

If issues discovered post-migration:
1. Restore gulpfile.js from git history
2. Restore gulp in devDependencies: `npm install --save-dev gulp@5.0.1`
3. Restore old scripts in package.json
4. Regenerate package-lock.json: `npm install`

**Rollback Risk**: LOW - Changes are configuration-only, fully reversible, no breaking changes to source code or APIs.

## Phase 2: Task Breakdown Preview

Task generation (via `/speckit.tasks`) will include:

1. Baseline and preparation tasks
2. package.json script updates
3. Individual script verification tasks
4. Integration testing tasks
5. Gulp dependency removal
6. gulpfile.js deletion
7. Documentation updates
8. CI/CD verification
9. Final validation

**Estimated Task Count**: 15-20 tasks (to be generated in `/speckit.tasks`)

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| npm script glob patterns behave differently than Gulp | Low | High | Test with same file patterns, verify ESLint finds all files |
| Exit codes not properly propagated | Low | High | Verify with intentional failures at each stage |
| CI/CD environment differences | Low | Medium | GitHub Actions uses same ubuntu-latest, npm test command unchanged |
| Loss of stdio inheritance | Very Low | Medium | npm scripts inherit stdio by default, verified in research |
| Performance regression | Very Low | Low | npm scripts have less overhead than Gulp, likely faster |
| Developer workflow disruption | Low | Low | `npm test` still works, CI/CD unchanged, documentation provided |

## Dependencies

**Removed**:
- gulp@5.0.1 (only dependency being removed)

**Unchanged** (all existing dependencies remain):
- eslint@^9.32.0
- mocha@11.7.1
- nyc@17.1.0
- chai@5.2.1
- chai-spies@1.1.0
- espree@10.4.0
- lodash@4.17.21
- parse-comments@0.4.3

**Added**:
- None (zero new dependencies per FR-013)

## Success Metrics Validation

- **SC-001**: Time both implementations, compare (npm scripts typically equal or faster)
- **SC-002**: Time both implementations, compare
- **SC-003**: Test fail-fast with intentional failures
- **SC-004**: Verify `grep gulp package.json` returns no results
- **SC-005**: Verify no new dependencies added to devDependencies
- **SC-006**: Confirm `npm test` still works (it does - same command)
- **SC-007**: Verify .github/workflows/main.yml passes without changes
- **SC-008**: npm scripts widely adopted, zero learning curve, native to npm (2025-appropriate)

## Next Steps

1. Generate detailed task list: `/speckit.tasks`
2. Execute tasks in order
3. Validate each task completion
4. Final integration testing
5. Commit and push changes
6. Monitor CI/CD pipeline
