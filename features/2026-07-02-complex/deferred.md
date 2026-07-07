# Deferred Items

## Runtime Whole-Module Source Check

- Symbol / area: `modules/runtime` whole-module `tsc` check
- Command: `just check-runtime`
- Status: still exceeds the practical Node default-heap budget and also runs for several minutes with an 8 GB diagnostic heap before producing actionable diagnostics.
- Phase 8 mitigation: `modules/runtime/tsconfig.check.json` now avoids the runtime self-import barrel by mapping `inferred-types/runtime` to a check-only declaration shim, and maps upstream packages to declaration bundles instead of re-instantiating the full source graph.
- Reason for deferral: the remaining cost is structural to checking runtime source together with the full advanced type surface. The reliable Phase 8 gates are green: `just test`, `just lint`, `pnpm test:types`, `just check-types`, forbidden-marker scan, and `just perf-compare`.

