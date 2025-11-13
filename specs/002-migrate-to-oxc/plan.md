# Implementation Plan: Migrate from ESLint to OXC

**Branch**: `002-migrate-to-oxc` | **Date**: 2025-11-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-migrate-to-oxc/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Replace ESLint with OXC (Rust-based linter) to modernize the linting toolchain while maintaining code quality standards and workflow compatibility. The migration will create a fresh OXC configuration using best-practice rules (potentially stricter than current ESLint), update npm scripts to use OXC, and ensure zero disruption to development workflows and CI/CD pipelines. Success is measured by: all 4865+ JavaScript files analyzed, faster or equal execution time (~8.73s baseline), zero ESLint dependencies remaining, and full test pipeline completing in ≤10 seconds.

## Technical Context

**Language/Version**: JavaScript (ECMAScript 6 / ES2015), Node.js environment
**Primary Dependencies**: NEEDS CLARIFICATION - OXC npm package name and version (researching: `oxc-parser`, `oxlint`, or other)
**Storage**: N/A (linting tool, no data persistence)
**Testing**: Mocha 11.7.1 + NYC 17.1.0 (code coverage) - existing test framework unchanged
**Target Platform**: Node.js CLI (npm scripts), GitHub Actions CI/CD (ubuntu-latest)
**Project Type**: Single project - ESLint plugin for AngularJS
**Performance Goals**: Lint 4865+ JavaScript files in ≤8.73 seconds (current ESLint baseline), full pipeline ≤10 seconds
**Constraints**:
- Must maintain exit code 0 (success) / non-zero (failure) behavior
- Must preserve ANSI color formatting in terminal output
- Must work with existing npm script structure (`npm run lint && npm run docs && npm run test:run`)
- Zero changes to CI/CD pipeline configuration
**Scale/Scope**: 4865+ JavaScript files across {*.js, rules/**, test/**, scripts/**} patterns

**Current ESLint Configuration**: [eslint.config.mjs](../../eslint.config.mjs) - 232 lines with ~100+ explicit rules including:
- ECMAScript 6, Node.js globals, CommonJS modules
- Strict rule set (no-console, no-debugger, strict mode, complexity checks)
- Code style rules (indent: 4 spaces, quotes: single, semi: required, etc.)
- Mocha globals for test files

**OXC Research Questions** (to be answered in Phase 0):
- What is the correct OXC npm package name and installation command?
- What is OXC's native configuration file format and location?
- Does OXC support Node.js/CommonJS/ES6 syntax used in this project?
- How do OXC rule names map to ESLint equivalents (if at all)?
- Can OXC output ANSI-colored terminal output?
- What is OXC's CLI command syntax for file patterns?

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS (No constitution file found - no constraints to validate)

This project does not have a `.specify/constitution.md` file, so there are no project-specific complexity constraints to check. The migration can proceed directly to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
specs/002-migrate-to-oxc/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output - OXC technical investigation
├── quickstart.md        # Phase 1 output - Migration guide
├── contracts/           # Phase 1 output - Configuration contracts
│   └── oxc-config.md    # OXC configuration file specification
├── checklists/
│   └── requirements.md  # Validation checklist (completed)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

**Note**: `data-model.md` is not applicable for this migration feature (no data entities to model).

### Source Code (repository root)

```text
eslint-plugin-angular/
├── eslint.config.mjs     # Current ESLint config (to be replaced with oxc.config.js or equivalent)
├── package.json          # Dependencies: remove eslint, add OXC package
├── rules/                # 60+ ESLint rule implementations (unchanged - this is an ESLint plugin)
│   ├── angularelement.js
│   ├── component-limit.js
│   └── ... (60 more rule files)
├── test/                 # 60+ Mocha test files (unchanged)
│   ├── angularelement.js
│   ├── component-limit.js
│   └── ... (60 more test files)
├── scripts/              # Build scripts (unchanged)
│   └── docs.js           # Documentation generator
├── index.js              # Plugin entry point (unchanged)
├── README.md             # Documentation (update OXC references)
└── .github/
    └── workflows/        # CI/CD pipeline (unchanged - uses npm scripts)
```

**Structure Decision**: Single project structure. This is an ESLint plugin for AngularJS, so the migration only affects:
1. **Configuration file**: Replace [eslint.config.mjs](../../eslint.config.mjs) with OXC's native config format
2. **package.json**: Replace `eslint` dependency with OXC package, update `lint` script
3. **README.md**: Update documentation to reference OXC instead of ESLint

The core plugin code (rules/, test/, scripts/) remains unchanged since this migration only affects how the plugin's own codebase is linted, not the plugin functionality itself.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - No constitution file exists, therefore no complexity violations to track.
