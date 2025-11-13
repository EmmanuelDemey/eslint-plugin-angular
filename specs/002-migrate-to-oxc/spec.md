# Feature Specification: Migrate from ESLint to OXC

**Feature Branch**: `002-migrate-to-oxc`
**Created**: 2025-11-13
**Status**: Draft
**Input**: User description: "Je veux migrer de ESLint vers OXC."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Execute Code Quality Checks with OXC (Priority: P1) 🎯 MVP

Developers need to run code quality and linting checks on the project using OXC instead of ESLint, preserving the same quality standards and error detection capabilities.

**Why this priority**: This is the core functionality - replacing ESLint with OXC for linting. This is the minimum viable product that must work before any other migration aspects.

**Independent Test**: Can be fully tested by running the new lint command and verifying it analyzes all JavaScript files, reports errors correctly, and exits with appropriate codes.

**Acceptance Scenarios**:

1. **Given** the project has JavaScript files in multiple directories, **When** developer runs the lint command, **Then** OXC analyzes all JavaScript files (*.js, rules/, test/, scripts/) and reports any quality issues
2. **Given** code contains a linting violation, **When** developer runs the lint command, **Then** OXC reports the violation with file location, line number, and rule name, and exits with non-zero code
3. **Given** code passes all linting rules, **When** developer runs the lint command, **Then** OXC completes successfully with zero violations reported and exits with code 0
4. **Given** developer is working in their IDE or terminal, **When** OXC reports errors, **Then** error messages include ANSI colors and formatting for readability

---

### User Story 2 - Maintain Development Workflow Compatibility (Priority: P2)

Development team needs to continue using the same npm scripts and commands (npm run lint, npm test) without changing their workflow or CI/CD pipeline configuration.

**Why this priority**: Ensures zero disruption to existing workflows. The migration should be transparent to developers and CI systems.

**Independent Test**: Run existing npm scripts (npm run lint, npm test) and verify they execute successfully using OXC instead of ESLint without requiring command changes.

**Acceptance Scenarios**:

1. **Given** developer runs `npm run lint`, **When** command executes, **Then** OXC performs linting instead of ESLint and provides equivalent output
2. **Given** CI/CD pipeline runs `npm test`, **When** pipeline executes, **Then** all quality checks pass using OXC without requiring pipeline configuration changes
3. **Given** developer uses the full test pipeline, **When** running `npm test`, **Then** lint step executes with OXC and proceeds to docs and test:run steps if linting passes
4. **Given** OXC detects errors, **When** developer fixes the errors, **Then** subsequent lint runs pass without needing to learn new error formats

---

### User Story 3 - Performance Optimization (Priority: P3)

Development team experiences faster linting execution times due to OXC's Rust-based performance advantages over ESLint's JavaScript implementation.

**Why this priority**: This is a bonus benefit but not essential for migration success. The primary goal is functional equivalence, not performance gains.

**Independent Test**: Measure and compare lint execution times before (ESLint) and after (OXC) migration on the same codebase.

**Acceptance Scenarios**:

1. **Given** the project has 4865+ JavaScript files, **When** running lint with OXC, **Then** execution time is equal to or faster than previous ESLint execution time
2. **Given** developer runs full pipeline `npm test`, **When** pipeline executes, **Then** total execution time is equal to or faster than baseline (currently ~10 seconds)

---

### Edge Cases

- What happens when OXC encounters JavaScript syntax that ESLint handled but OXC doesn't support?
- How does the system handle configuration file differences between ESLint and OXC formats?
- What happens if OXC doesn't support a specific ESLint rule that was previously enforced?
- How are custom ESLint rules or plugins handled during migration?
- What happens when OXC's error reporting format differs significantly from ESLint's?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST replace ESLint with OXC as the primary linting tool for all JavaScript files
- **FR-002**: System MUST preserve the ability to lint all file patterns currently supported (*.js, {rules,test,scripts}/**/*.js)
- **FR-003**: Lint command MUST exit with code 0 on success and non-zero on violations (matching ESLint behavior)
- **FR-004**: System MUST preserve ANSI color formatting and error message readability in terminal output
- **FR-005**: System MUST maintain fail-fast behavior in the test pipeline (stop on first lint failure)
- **FR-006**: System MUST remove ESLint dependency from project dependencies
- **FR-007**: System MUST create a new OXC-specific configuration file (using OXC's native format) to define linting rules and settings
- **FR-008**: System MUST use OXC's best-practice rules even if stricter than current ESLint configuration, prioritizing code quality improvements over exact rule parity
- **FR-009**: Lint errors MUST include file path, line number, column number, and rule identifier
- **FR-010**: System MUST work with the existing CI/CD pipeline (GitHub Actions) without configuration changes
- **FR-011**: npm scripts (npm run lint, npm test) MUST continue to work without command syntax changes

### Key Entities

- **Linting Configuration**: Represents the rules and settings that define code quality standards, migrating from ESLint config format to OXC config format
- **Error Report**: Represents a linting violation with location information (file, line, column), rule identifier, and descriptive message
- **File Pattern**: Represents the glob patterns that define which files to analyze (*.js, {rules,test,scripts}/**/*.js)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Linting completes on all 4865+ JavaScript files with OXC in time equal to or less than current ESLint execution (~8.73 seconds or faster)
- **SC-002**: All existing npm scripts (npm run lint, npm test) continue to work without modification
- **SC-003**: CI/CD pipeline passes without requiring configuration file changes
- **SC-004**: Zero ESLint dependencies remain in package.json (eslint package removed)
- **SC-005**: Error reporting maintains or improves readability (ANSI colors, clear messages, actionable information)
- **SC-006**: Full test pipeline (npm test) completes in 10 seconds or less (equal to or faster than current baseline)
- **SC-007**: 100% of JavaScript files can be analyzed by OXC without syntax compatibility issues
- **SC-008**: Development team can continue using familiar lint commands and workflows without retraining

## Assumptions

- OXC supports the JavaScript syntax used in this AngularJS project (ES5/ES6 features)
- OXC provides equivalent or better linting capabilities compared to ESLint 9.32.0
- OXC can output error reports in a format compatible with terminal display and CI/CD parsing
- The project's build pipeline structure (npm scripts using &&) is compatible with OXC
- OXC is available as an npm package that can replace ESLint in package.json
- Performance improvements from Rust-based implementation will benefit this project's file count
- OXC has a native configuration format that can be created from scratch (not requiring ESLint config conversion)
- The development team is willing to fix code quality issues revealed by OXC's stricter rules
- Any stricter OXC rules will improve code quality and are worth the effort of fixing violations

## Scope

### In Scope

- Replacing ESLint with OXC in package.json dependencies
- Creating a new OXC-specific configuration file (not converting from ESLint)
- Configuring OXC rules using best practices (may be stricter than current ESLint)
- Updating npm run lint script to use OXC
- Fixing any new code quality issues revealed by stricter OXC rules
- Ensuring OXC works in the npm test pipeline (lint → docs → test:run)
- Verifying error output format and colors
- Performance validation and benchmarking
- CI/CD compatibility testing
- README documentation updates to reflect OXC usage

### Out of Scope

- Maintaining 100% rule parity with ESLint (OXC best practices take precedence)
- Converting existing .eslintrc file (creating fresh OXC config instead)
- Modifications to test suite (Mocha) or coverage tools (NYC)
- Changes to documentation generation (npm run docs)
- IDE integration or editor plugin configuration
- Custom rule development for OXC
- Migration of ESLint plugins to OXC equivalents (if not compatible, document limitations)
- Keeping ESLint as a fallback or parallel linting tool
