# OXC Baseline Violations Report

**Date**: 2025-11-13
**Oxlint Version**: 1.28.0
**Configuration**: Minimal best-practice (plugins: ["oxc"], rules: {}, ignorePatterns: ["node_modules/", ".git/"])

## Summary Statistics

- **Total Files Analyzed**: 129 JavaScript files
- **Scan Time**: 132ms
- **Threads Used**: 12
- **Total Violations**: 4 warnings, 0 errors
- **Exit Code**: 0 (warnings don't fail by default)

## Performance Comparison

- **ESLint Baseline**: ~8.73 seconds (8730ms)
- **Oxlint Baseline**: 132ms
- **Speedup**: **~66x faster**

## Violation Breakdown by Rule

### no-useless-escape (4 occurrences)

All 4 violations are for the rule `eslint(no-useless-escape)`:

1. **rules/utils/utils.js:598:26** - Unnecessary escape `\_` (should be `_`)
2. **rules/utils/utils.js:598:105** - Unnecessary escape `\_` (should be `_`)
3. **rules/file-name.js:117:68** - Unnecessary escape `\.` (should be `.`)
4. **rules/file-name.js:118:58** - Unnecessary escape `\.` (should be `.`)

**Severity**: Warning
**Category**: Style/correctness
**Auto-fixable**: Yes (Oxlint provides automatic fix suggestions)

## Auto-Fix Analysis

**All 4 violations are auto-fixable** using `npx oxlint --fix`.

Expected fixes:
- `\_` → `_` (2 instances in rules/utils/utils.js)
- `\.` → `.` (2 instances in rules/file-name.js)

These are simple character class escape fixes where the backslash is unnecessary inside bracket expressions.

## Assessment

### ✅ Excellent Baseline

- **Very few violations**: Only 4 warnings across 129 files
- **No errors**: All violations are warnings (non-blocking)
- **100% auto-fixable**: All violations can be fixed with `--fix` flag
- **Low complexity**: All issues are simple regex escape fixes
- **No blocking issues**: Migration can proceed immediately to auto-fix phase

### Performance Achievement

The baseline scan demonstrates **66x performance improvement** over ESLint:
- ESLint: 8730ms
- Oxlint: 132ms
- Already exceeds SC-001 requirement (≤8.73s) by a massive margin

## Next Steps (Phase 3: User Story 1)

1. **T008**: Run `npx oxlint --fix` to automatically resolve all 4 violations
2. **T009**: Review auto-fix changes with `git diff`
3. **T010**: Commit auto-fixes
4. **T011**: Re-scan to verify 0 violations
5. Continue with remaining US1 tasks if any violations remain

## Detailed Violation Output

```
! eslint(no-useless-escape): Unnecessary escape character '_'
     ,-[rules/utils/utils.js:598:26]
 597 | function isAngularServiceImport(parameterName, serviceName) {
 598 |     var r = new RegExp('^\_?' + serviceName.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, '\\$&') + '\_?$', 'i');
     :                          ^^
 599 |     return r.test(parameterName);
     `----
  help: Replace `\_` with `_`.

  ! eslint(no-useless-escape): Unnecessary escape character '_'
     ,-[rules/utils/utils.js:598:105]
 597 | function isAngularServiceImport(parameterName, serviceName) {
 598 |     var r = new RegExp('^\_?' + serviceName.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, '\\$&') + '\_?$', 'i');
     :                                                                                                         ^^
 599 |     return r.test(parameterName);
     `----
  help: Replace `\_` with `_`.

  ! eslint(no-useless-escape): Unnecessary escape character '.'
     ,-[rules/file-name.js:117:68]
 116 |
 117 |                 var regName = '^' + options.ignorePrefix.replace(/[\.]/g, '\\$&');
     :                                                                    ^^
 118 |                 regName += options.ignorePrefix.indexOf('\.') === -1 ? '[A-Z]' : '[a-zA-z]';
     `----
  help: Replace `\.` with `.`.

  ! eslint(no-useless-escape): Unnecessary escape character '.'
     ,-[rules/file-name.js:118:58]
 117 |                 var regName = '^' + options.ignorePrefix.replace(/[\.]/g, '\\$&');
 118 |                 regName += options.ignorePrefix.indexOf('\.') === -1 ? '[A-Z]' : '[a-zA-z]';
     :                                                          ^^
 119 |                 if (new RegExp(regName).test(name)) {
     `----
  help: Replace `\.` with `.`.

Found 4 warnings and 0 errors.
Finished in 132ms on 129 files using 12 threads.
```

## Conclusion

The OXC migration baseline is **extremely favorable**:
- Minimal violations (4 warnings)
- All auto-fixable
- Massive performance gain (66x faster)
- Zero blocking issues

**Status**: ✅ Ready for Phase 3 implementation
