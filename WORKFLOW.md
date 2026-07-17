# Workflow rules (every step, every agent)

These rules are invariant across all steps of an implementation plan. `<base>` is
the base branch the orchestrator specifies at implementation time (usually `master`
or `develop`).

1. Before starting any step: check out `<base>` and `git pull` to ensure the latest
   merged state. Then branch off it: `step-NN-short-slug` (e.g. `step-03-user-auth`).
2. Commit messages: one line, imperative summary of the change. No bodies, no footers.
3. Soft TDD: write the tests from the step's Test cases section FIRST, then implement
   until they pass. Writing the tests may be its own commit, but only when the step
   has more than 15 test cases; otherwise commit tests and implementation together.
4. Test execution is tiered. For T1 and T2 steps, the implementing agent runs the
   tests itself and iterates to green. For T3 steps, work splits into two phases:
   - **Implement phase** (the T3 session): write the tests and the implementation.
     Running tests is FORBIDDEN in any form — full suite, filtered subset, or a
     single test, directly or via build/watch tasks that trigger them. Compiling or
     linting is allowed only where it does not execute tests. Commit, push the
     branch, report what was built and stop. No PR.
   - **Stabilise phase** (a separate, cheaper session, started by the orchestrator
     with "Stabilise step NN"): check out the step branch, run the tests, iterate
     to green under the circuit breaker (rule 5). Fix mechanically — wiring, typos,
     off-by-ones, missing setup. Do NOT redesign the implementation; if failures
     trace back to an architectural decision, note it in the PR instead. Once done,
     continue with rules 6–9 (verification, PR, checkbox).
   In a batched run, a T3 step therefore ends the batch after its implement phase —
   the orchestrator must launch the stabilise pass separately.
5. Circuit breaker: while iterating to green, stop iterating after 10 full
   run-diagnose-fix cycles, or after 5 consecutive attempts on the same failing
   test without progress. On tripping: commit what you have and STILL open the PR
   per rule 7, but the PR description must begin with a prominent warning line —
   `⚠️ TESTS FAILING` — followed by the list of failing tests and your best
   hypothesis for each. Never delete, skip, or weaken a test to get to green.
   To keep iteration cheap: re-run only the currently failing tests with
   minimal-verbosity flags while iterating; run the full suite exactly once at
   the end.
6. Before opening the PR, run every command in the step's Verification section and
   ensure all pass. Opening a PR with failing checks is allowed only via the
   circuit breaker path in rule 5, with the warning header.
7. Open a PR against `<base>` using GitHub (`gh pr create`). The PR description
   must contain:
   - **Summary** — full prose summary of what changed and why
   - **Manual verification** — a numbered checklist of concrete actions the reviewer
     performs to confirm the change: exact URLs/pages to browse to, specific UI
     elements to interact with and what to expect, or exact commands to run and
     their expected output. (The step file's "Manual verification" list is the
     source for this.)
8. Stop after the PR is open. Do not merge. Do not start the next step unless
   explicitly instructed to continue.
9. As part of each step's changes, tick the step's checkbox in the plan Step index
   (`[ ]` → `[x]`). This ships in the step's own PR.
10. Source of truth for which step to implement next: existing `step-NN-*` branches
   (local and remote) are the PRIMARY record of progress — the highest-numbered
   step branch is the last step started. Then verify inside that branch: check out
   or inspect it, and confirm its own step's checkbox is ticked in the plan there.
   (Checkboxes on `<base>` lag behind until PRs merge — that is expected, not a
   mismatch.) If consistent, the next step is highest branch number + 1; if that
   step's file is marked SUPERSEDED, or is an H-tier step already ticked on
   `<base>`, skip forward to the next remaining step. H-tier steps never have
   branches — a "gap" in branch numbering at an H step is expected, not a
   mismatch.
   On any real inconsistency — the latest branch's checkbox unticked inside that
   branch, gaps in step branch numbering, a checkbox ticked on `<base>` with no
   corresponding branch or merged PR, or a T3 step branch that exists but has no
   PR (it may be awaiting its stabilise phase) — STOP and ask the orchestrator
   before doing anything.
11. Batched runs: when instructed to implement several steps in one go, still create
   each branch off `<base>`, then merge the previous step's branch into it before
   starting work (this carries all prior steps' code and enforces sequence). All PRs
   open against `<base>`. The orchestrator merges PRs in step order using merge
   commits (not squash), so each later PR's diff collapses to only its own changes
   once its predecessors are merged.
12. H-tier steps are human-only: NEVER attempt them — no registrations, no secret
   creation, no strategic choices on the human's behalf. An H step has no branch
   and no PR; the human ticks its checkbox directly on `<base>` when done. When
   computing the next step, skip over ticked H steps; if the next step is H-tier
   and unticked, stop, tell the orchestrator what the human must do (from the
   step's Actions list), and wait. If an H step's Outputs are verifiable without
   reading secret values (env var set, file exists), verify presence before
   relying on them — never print or commit the values themselves.
