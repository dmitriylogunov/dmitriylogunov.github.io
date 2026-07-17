# Workflow rules (every step, every agent)

These rules are invariant across all steps of this implementation plan. Branching
strategy: **one feature branch for the whole plan, one commit per step, one PR at
the end**. The base branch is `main`; the feature branch is `site-reframe`.

1. All work happens on the single branch `site-reframe`, created off `main` at the
   start of the plan. Before starting any step: check out `site-reframe` and
   `git pull` (create it from up-to-date `main` if it does not exist yet). Never
   create per-step branches.
2. Each step is exactly ONE commit on `site-reframe`. Message: one line, imperative,
   prefixed with the step number — e.g. `Step 03: migrate posts to _posts`. No
   bodies, no footers. The step's checkbox tick in `plan/_overview.md`
   (`[ ]` → `[x]`) is part of this same commit.
3. Soft TDD: write the tests from the step's Test cases section FIRST, then
   implement until they pass. Tests and implementation land together in the step's
   single commit.
4. Test execution is tiered. For T1 and T2 steps, the implementing agent runs the
   tests itself and iterates to green before committing. For T3 steps, work splits
   into two phases:
   - **Implement phase** (the T3 session): write the tests and the implementation.
     Running tests is FORBIDDEN in any form — full suite, filtered subset, or a
     single test, directly or via build/watch tasks that trigger them. Compiling or
     linting is allowed only where it does not execute tests. Make the step commit,
     push `site-reframe`, report what was built and stop.
   - **Stabilise phase** (a separate, cheaper session, started by the orchestrator
     with "Stabilise step NN"): check out `site-reframe`, run the tests, iterate to
     green under the circuit breaker (rule 5). Fix mechanically — wiring, typos,
     off-by-ones, missing setup. Do NOT redesign the implementation; if failures
     trace back to an architectural decision, record it per rule 9. Fold fixes into
     the step's commit with `git commit --amend` and force-push (`--force-with-lease`)
     — force-pushing `site-reframe` is allowed for exactly this purpose; never
     force-push `main`.
   In a batched run, a T3 step therefore ends the batch after its implement phase —
   the orchestrator must launch the stabilise pass separately.
5. Circuit breaker: while iterating to green, stop after 10 full run-diagnose-fix
   cycles, or after 5 consecutive attempts on the same failing test without
   progress. On tripping: commit (or amend) what you have, push, and record in
   `plan/notes-for-pr.md` a section starting `⚠️ TESTS FAILING — Step NN` listing
   the failing tests and your best hypothesis for each. Never delete, skip, or
   weaken a test to get to green. To keep iteration cheap: re-run only the
   currently failing tests with minimal-verbosity flags while iterating; run the
   full suite exactly once at the end.
6. Before pushing a step's commit, run every command in the step's Verification
   section and ensure all pass (T3 implement phase excepted — its verification runs
   in the stabilise phase). Pushing with failing checks is allowed only via the
   circuit breaker path in rule 5.
7. There are NO per-step pull requests. After the final step's commit is green and
   pushed, open ONE PR from `site-reframe` to `main` using `gh pr create`. The PR
   description must contain:
   - **Summary** — full prose summary of the whole plan's changes, step by step
   - **Manual verification** — the combined numbered checklist assembled from every
     step file's "Manual verification" section plus anything in
     `plan/notes-for-pr.md`
8. Stop after pushing the step's commit. Do not start the next step unless
   explicitly instructed to continue. Do not open the final PR before the last
   step unless the orchestrator asks for it.
9. `plan/notes-for-pr.md` is the running scratch file for anything a step must
   surface to the reviewer (check results a step file asks to report, circuit-breaker
   warnings, deviations). Create it on first use; append under a `## Step NN`
   heading; its contents are merged into the final PR description and the file is
   deleted in the same commit that opens the PR.
10. Source of truth for which step to implement next: `git log --oneline` on
   `site-reframe` — the highest `Step NN:` prefix is the last step done. Verify the
   step index in `plan/_overview.md` on the branch agrees (its checkboxes are
   ticked through that same step). Skip SUPERSEDED steps and ticked H-tier steps
   when computing the next step. On any inconsistency — a committed step whose
   checkbox is unticked, gaps in step numbering not explained by H steps, or a T3
   step committed but not yet stabilised (its tests fail) — STOP and ask the
   orchestrator before doing anything.
11. Batched runs: implement the steps sequentially as consecutive commits on
   `site-reframe`, observing rule 8's stop only at the end of the batch. A T3 step
   ends the batch (rule 4).
12. H-tier steps are human-only: NEVER attempt them — no registrations, no secret
   creation, no strategic choices on the human's behalf. The human commits the
   step's outputs themselves (on `site-reframe`, or on `main` — in the latter case
   the next agent merges `main` into `site-reframe` before starting) and ticks the
   step's checkbox. When computing the next step, skip over ticked H steps; if the
   next step is H-tier and unticked, stop, tell the orchestrator what the human
   must do (from the step's Actions list), and wait. If an H step's Outputs are
   verifiable without reading secret values (env var set, file exists), verify
   presence before relying on them — never print or commit the values themselves.
