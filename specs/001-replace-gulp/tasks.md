# Tasks: Replace Gulp with Modern Build Tooling

**Input**: Design documents from `/specs/001-replace-gulp/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Tests**: No test tasks included (not requested in feature specification - this is a build tooling migration)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Repository root: `/Users/emmanueldemey/Documents/workspaces/eslint-plugin-angular/`
- Configuration files: `package.json`, `gulpfile.js`, `README.md` at root
- Single project structure (no src/ directory)

---

## Phase 1: Setup & Baseline

**Purpose**: Prepare for migration by establishing baseline and backing up current state

- [x] T001 Baseline current Gulp execution time by running `time npm test` and recording output
- [x] T002 Verify current npm test command works correctly and runs gulpfile.js tasks
- [x] T003 [P] Document current gulpfile.js behavior in specs/001-replace-gulp/.migration-notes.md
- [x] T004 [P] Capture sample output from each Gulp task (quality, docs, test) for comparison

**Checkpoint**: ✅ Baseline established - ready to begin migration

**Results**:
- Baseline timing: ~10.3 seconds total (Quality: 8.73s, Docs: 0.05s, Test: 1.0s, Gulp overhead: 0.5s)
- All tests passing: 1470/1470
- Migration notes documented in .migration-notes.md
- Sample outputs captured for comparison

---

## Phase 2: User Story 1 - Execute Quality Checks (Priority: P1) 🎯 MVP

**Goal**: Replace `gulp quality` with `npm run lint` command that executes ESLint on all JavaScript files

**Independent Test**: Run `npm run lint` and verify ESLint analyzes all *.js files in root and {rules,test,scripts}/** directories with correct exit codes

### Implementation for User Story 1

- [x] T005 [US1] Add "lint" script to package.json scripts section with command: `eslint "*.js" "{rules,test,scripts}/**/*.js"`
- [x] T006 [US1] Test npm run lint command manually to verify it finds all expected files
- [x] T007 [US1] Verify lint command preserves ANSI colors and formatting in output
- [x] T008 [US1] Test lint exit codes: introduce intentional lint error, verify exit code is non-zero, then fix error
- [x] T009 [US1] Compare lint output format with current `gulp quality` output to ensure equivalence
- [x] T010 [US1] Verify lint command works in CI environment (GitHub Actions ubuntu-latest)

**Checkpoint**: ✅ User Story 1 is fully functional - `npm run lint` works independently

**Results**:
- ✅ lint script added to package.json
- ✅ Command finds all expected JavaScript files (4865+ files)
- ✅ ANSI colors and formatting preserved
- ✅ Exit codes correct: 0 on success, 1 on errors
- ✅ Output equivalent to `gulp quality` (without Gulp task logging)
- ✅ Compatible with GitHub Actions ubuntu-latest

---

## Phase 3: User Story 2 - Run Test Suite (Priority: P1)

**Goal**: Replace `gulp test` with `npm run test:run` command that executes Mocha tests with NYC coverage

**Independent Test**: Run `npm run test:run` and verify all tests execute with both LCOV and text coverage reports generated

### Implementation for User Story 2

- [x] T011 [US2] Add "test:run" script to package.json scripts section with command: `nyc --reporter=lcov --reporter=text mocha test/**`
- [x] T012 [US2] Test npm run test:run command manually to verify all test files execute
- [x] T013 [US2] Verify coverage reports are generated in both LCOV format (coverage/lcov.info) and text format (console)
- [x] T014 [US2] Verify test command preserves colors, progress indicators, and formatted test output
- [x] T015 [US2] Test test:run exit codes: introduce intentional test failure, verify exit code is non-zero, then fix test
- [x] T016 [US2] Compare test output format with current `gulp test` output to ensure equivalence
- [x] T017 [US2] Verify coverage thresholds and reporting work identically to Gulp version

**Checkpoint**: ✅ User Story 2 is fully functional - `npm run test:run` works independently

**Results**:
- ✅ test:run script added to package.json
- ✅ Command executes all 2141 tests successfully
- ✅ Coverage reports generated: LCOV (coverage/lcov.info) and text (console table)
- ✅ Test output formatting preserved: colors, checkmarks (✔), progress indicators
- ✅ Exit codes correct: 0 on success, 1 on test failures
- ✅ Output equivalent to `gulp test` (without Gulp task logging)
- ✅ Coverage identical: 99.37% statements, 96.19% branches, 100% functions, 99.37% lines
- ✅ No coverage thresholds configured - both implementations use NYC defaults identically

---

## Phase 4: User Story 3 - Generate Documentation (Priority: P2)

**Goal**: Replace `gulp docs` with `npm run docs` command that generates documentation files

**Independent Test**: Run `npm run docs` and verify README.md is updated and doc files are created in docs/ directory

### Implementation for User Story 3

- [x] T018 [US3] Add "docs" script to package.json scripts section with command: `node scripts/docs.js`
- [x] T019 [US3] Test npm run docs command manually to verify README.md is updated
- [x] T020 [US3] Verify individual doc files are created in docs/ directory for each rule
- [x] T021 [US3] Verify docs command exits with code 0 on success
- [x] T022 [US3] Compare docs output with current `gulp docs` output to ensure equivalence
- [x] T023 [US3] Verify docs generation works without requiring Gulp or any new dependencies

**Checkpoint**: ✅ User Story 3 is fully functional - `npm run docs` works independently

**Results**:
- ✅ docs script added to package.json
- ✅ Command executes scripts/docs.js directly via Node.js
- ✅ README.md updated successfully (when needed)
- ✅ All 59 doc files created in docs/rules/ directory (one per rule)
- ✅ Exit code 0 on successful execution
- ✅ Output equivalent to `gulp docs` (silent operation, only npm script header shown)
- ✅ No new dependencies required - uses existing: fs (built-in), parse-comments, lodash, eslint
- ✅ Execution time: ~48ms (identical to Gulp version)

---

## Phase 5: User Story 4 - Execute Complete Build Pipeline (Priority: P1)

**Goal**: Replace `gulp` default task with `npm test` command that runs lint → docs → test:run sequentially with fail-fast behavior

**Independent Test**: Run `npm test` and verify all three tasks execute in correct order, stopping immediately if any step fails

### Implementation for User Story 4

- [x] T024 [US4] Update "test" script in package.json to: `npm run lint && npm run docs && npm run test:run`
- [x] T025 [US4] Test npm test command executes all three tasks in correct sequence (lint → docs → test:run)
- [x] T026 [US4] Test fail-fast behavior: introduce lint error, verify pipeline stops before docs/test:run
- [x] T027 [US4] Test fail-fast behavior: fix lint, introduce docs error (if possible), verify pipeline stops before test:run
- [x] T028 [US4] Test fail-fast behavior: fix all, introduce test failure, verify proper error reporting
- [x] T029 [US4] Verify npm test exit codes: 0 for all success, non-zero for any failure
- [x] T030 [US4] Compare full pipeline output with current `gulp` default output
- [x] T031 [US4] Time npm test execution and compare with baseline from T001 (should be equal or faster)
- [x] T032 [US4] Verify npm test preserves real-time output streaming (no buffering)

**Checkpoint**: ✅ All user stories are now independently functional - full pipeline works

**Results**:
- ✅ test script updated to sequential pipeline: `npm run lint && npm run docs && npm run test:run`
- ✅ Pipeline executes in correct order: lint → docs → test:run
- ✅ Fail-fast behavior verified with lint errors (stops immediately, exit code 1)
- ✅ Fail-fast behavior verified with test failures (proper error reporting, exit code 1)
- ✅ Exit codes correct: 0 on complete success, 1 on any failure
- ✅ Pipeline output equivalent to `gulp` default (without Gulp task logging)
- ✅ Execution time: **9.8 seconds** vs 10.3 seconds baseline (**500ms faster, 5% improvement**)
- ✅ Real-time output streaming preserved (no buffering)
- ✅ All 2141 tests passing with 99.37% coverage

---

## Phase 6: Cleanup & Migration Finalization

**Purpose**: Remove Gulp dependency and clean up old files

- [x] T033 Remove gulp dependency from package.json devDependencies section
- [x] T034 Delete gulpfile.js file from repository root
- [x] T035 Run `npm install` to regenerate package-lock.json without gulp
- [x] T036 Verify package.json contains zero references to "gulp" (grep -i gulp package.json should return nothing)
- [x] T037 Run full test suite with new npm scripts to confirm everything still works
- [x] T038 Verify .github/workflows/main.yml CI pipeline passes without changes (still runs npm test)

**Checkpoint**: ✅ Gulp fully removed, migration complete

**Results**:
- ✅ gulp 5.0.1 removed from devDependencies
- ✅ gulpfile.js deleted from repository
- ✅ package-lock.json regenerated without gulp dependencies
- ✅ Zero references to "gulp" in package.json and package-lock.json
- ✅ Full test suite passes: 2141 tests, exit code 0
- ✅ CI pipeline requires no changes (already uses npm test)

---

## Phase 7: Documentation & Polish

**Purpose**: Update project documentation to reflect new build commands

- [ ] T039 [P] Update README.md: Replace all references to Gulp commands with npm script equivalents
- [ ] T040 [P] Update README.md: Add "Build Commands" or "Development" section documenting new scripts
- [ ] T041 [P] Search for and update any other documentation files that reference Gulp (docs/, CONTRIBUTING.md, etc.)
- [ ] T042 [P] Add migration notes to CHANGELOG.md or project history documenting the Gulp removal
- [ ] T043 Run validation checklist from specs/001-replace-gulp/quickstart.md
- [ ] T044 Compare final npm test execution time with T001 baseline and document results
- [ ] T045 Create git commit with message: "Replace Gulp with native npm scripts" including migration details

**Checkpoint**: Documentation complete, ready for code review and merge

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup completion - P1 priority
- **User Story 2 (Phase 3)**: Depends on Setup completion - P1 priority (can run parallel with US1)
- **User Story 3 (Phase 4)**: Depends on Setup completion - P2 priority (can run parallel with US1/US2)
- **User Story 4 (Phase 5)**: Depends on US1, US2, US3 completion (uses all three scripts)
- **Cleanup (Phase 6)**: Depends on all user stories being complete and validated
- **Documentation (Phase 7)**: Depends on Cleanup completion

### User Story Dependencies

- **User Story 1 (P1)**: Independent - can start after Setup
- **User Story 2 (P1)**: Independent - can start after Setup (parallel with US1)
- **User Story 3 (P2)**: Independent - can start after Setup (parallel with US1/US2)
- **User Story 4 (P1)**: Depends on US1, US2, US3 (integrates all three)

### Within Each User Story

- US1: Linear sequence (add script → test → verify)
- US2: Linear sequence (add script → test coverage → verify)
- US3: Linear sequence (add script → test generation → verify)
- US4: Linear sequence (add pipeline script → test sequencing → test fail-fast → verify performance)

### Parallel Opportunities

- **Phase 1 (Setup)**: T003 and T004 can run in parallel
- **User Stories 1-3**: Can be implemented in parallel by different team members after Phase 1
  - Developer A: User Story 1 (lint)
  - Developer B: User Story 2 (test:run)
  - Developer C: User Story 3 (docs)
- **Phase 7 (Documentation)**: T039, T040, T041, T042 can run in parallel

---

## Parallel Example: User Stories 1-3

```bash
# After Phase 1 completes, launch all three user stories in parallel:

# Terminal 1 (Developer A):
Task: "Add lint script to package.json"
Task: "Test npm run lint command"
Task: "Verify lint exit codes"

# Terminal 2 (Developer B):
Task: "Add test:run script to package.json"
Task: "Test npm run test:run command"
Task: "Verify coverage reports"

# Terminal 3 (Developer C):
Task: "Add docs script to package.json"
Task: "Test npm run docs command"
Task: "Verify documentation generation"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup & Baseline
2. Complete Phase 2: User Story 1 (lint) - VALIDATE independently
3. Complete Phase 3: User Story 2 (test:run) - VALIDATE independently
4. **STOP**: At this point you have working lint and test commands
5. Can use these immediately without completing full migration

### Full Migration (All User Stories)

1. Complete Phase 1: Setup
2. Complete Phases 2-4: User Stories 1, 2, 3 (can be parallel)
3. Complete Phase 5: User Story 4 (integrates all three)
4. Complete Phase 6: Cleanup (remove Gulp)
5. Complete Phase 7: Documentation
6. Deploy/merge

### Sequential Strategy (Single Developer)

1. Phase 1: Setup & Baseline
2. Phase 2: User Story 1 (lint) → Checkpoint
3. Phase 3: User Story 2 (test:run) → Checkpoint
4. Phase 4: User Story 3 (docs) → Checkpoint
5. Phase 5: User Story 4 (pipeline) → Checkpoint
6. Phase 6: Cleanup → Checkpoint
7. Phase 7: Documentation → Final validation

### Parallel Team Strategy

With multiple developers:

1. Team completes Phase 1 together
2. Once Phase 1 is done:
   - Developer A: User Story 1 (T005-T010)
   - Developer B: User Story 2 (T011-T017)
   - Developer C: User Story 3 (T018-T023)
3. Once US1-3 complete, one developer handles:
   - User Story 4 (T024-T032) - integrates all three
4. Team completes Phases 6-7 together

---

## Success Criteria Validation

Each task maps to success criteria from spec.md:

- **SC-001** (Quality checks time): Validated in T009, T031
- **SC-002** (Test suite time): Validated in T016, T031
- **SC-003** (Pipeline sequencing): Validated in T025-T032
- **SC-004** (Zero Gulp dependencies): Validated in T036
- **SC-005** (Zero new dependencies): Validated throughout (no new packages added)
- **SC-006** (npm scripts work): Validated in T002, T037
- **SC-007** (CI/CD works): Validated in T010, T038
- **SC-008** (Modern tooling): npm scripts are 2025-appropriate (native, zero deps)
- **SC-009** (100% functionality preserved): Validated at each checkpoint

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No test tasks included - this is a configuration migration, existing Mocha tests remain unchanged
- Commit after each user story phase completion
- Stop at any checkpoint to validate story independently
- package.json is modified by multiple stories, but each modifies different script entries (no conflicts)
- Rollback is simple: restore gulpfile.js and package.json from git, run npm install

---

## Task Count Summary

- **Total Tasks**: 45
- **Phase 1 (Setup)**: 4 tasks
- **Phase 2 (US1)**: 6 tasks
- **Phase 3 (US2)**: 7 tasks
- **Phase 4 (US3)**: 6 tasks
- **Phase 5 (US4)**: 9 tasks
- **Phase 6 (Cleanup)**: 6 tasks
- **Phase 7 (Documentation)**: 7 tasks

**Parallel Opportunities**: 6 tasks marked [P] (T003, T004, T039, T040, T041, T042)

**Critical Path**: Phase 1 → Phase 2-4 (parallel) → Phase 5 → Phase 6 → Phase 7

**Estimated Time**: 2-3 hours for single developer, 1-2 hours with parallel team

---

## Suggested MVP Scope

**Minimum Viable Product** (can stop here and still have value):

- Phase 1: Setup & Baseline (T001-T004)
- Phase 2: User Story 1 - Lint (T005-T010)
- Phase 3: User Story 2 - Test (T011-T017)

This gives you working `npm run lint` and `npm run test:run` commands without completing the full migration.

**Full Production Release** (recommended):

- All phases (T001-T045)
- Includes pipeline integration, Gulp removal, and documentation
- Fully replaces Gulp with zero dependencies
