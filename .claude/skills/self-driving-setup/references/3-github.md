# Step 3 — Connect GitHub (required)

**Read ONLY this file.** Do not read any other reference file until this one tells you to.

The GitHub integration gives Signals code access: it is how findings get researched against the actual repository and how Self-driving opens fixes. **Setup cannot finish without it.** This is the GitHub App *integration* — distinct from the optional "GitHub Issues" warehouse source in step 5.

## Status

Emit:

```text
[STATUS] Checking GitHub connection
```

## Tools

Load `wizard_ask` via `ToolSearch select:mcp__wizard-tools__wizard_ask`. Reach `integrations-list` through the PostHog `exec` tool (`info` then `call`).

## Do

1. Call `integrations-list`. If any integration has `kind: "github"`, the team is already connected to *some* GitHub App install — but that install may not cover this repo. Call `integrations-github-repos-retrieve` and confirm this project's repository appears in the visible repo list before treating GitHub as connected. If it's visible, record it and continue to the next step. (If step 2's project profile already showed a GitHub integration, this call still needs to run — the profile confirms an integration exists, not that it covers this repo.) If the integration exists but this repo isn't in the visible list, treat it the same as "absent" below — the user needs to grant access to this repo specifically.

2. If absent, build the **one-click install link** from the run prompt's project URLs — same host, project id as a path segment (the same pattern Linear uses in step 5b):

```text
<posthog host>/api/environments/<project id>/integrations/authorize?kind=github
```

   Opening it in the user's logged-in browser runs the GitHub App install flow directly — no settings-page hunting. Then ask:

```javascript
{
  id: "github-connect",
  prompt: "Self-driving needs GitHub access to investigate findings in your code and open fixes — setup can't finish without it.\n\nOpen this link to install the PostHog GitHub App in one click, then approve access. Grant it the repos you want Self-driving to work with — include this project's repo so step 5 can also watch its issues:\n\n<github authorize URL>\n\nThen come back here.",
  kind: "single",
  options: [
    { label: "Done — I've installed it", value: "done" },
    { label: "I can't connect right now", value: "cant" }
  ]
}
```

3. On **done**: call `integrations-list` again, then `integrations-github-repos-retrieve` to confirm this repo is in the visible list.
   - GitHub present **and this repo visible** → continue to the next step.
   - GitHub present but this repo **not** visible, or GitHub still absent → tell the user it hasn't appeared yet (the install, or the repo grant, may take a few seconds to land) and re-ask with the same two options. Verify after each "done" (integration presence and repo visibility, both). Give this **at most 3 rounds**.
   - **After the third miss, stop retrying with the same prompt.** Ask one final, terminal question instead:

```javascript
{
  id: "github-connect-terminal",
  prompt: "Still not seeing GitHub access to this repo after 3 checks. Keep waiting one more time, or stop here?",
  kind: "single",
  options: [
    { label: "Keep waiting — check one more time", value: "keep-waiting" },
    { label: "Exit setup", value: "exit" }
  ]
}
```

     - **keep-waiting** → do exactly one more `integrations-list` + `integrations-github-repos-retrieve` check after a short pause, then stop regardless of the result — success continues to the next step; failure falls through to the same abort as "exit". This is a single bounded action, not another round of the retry loop — never re-ask this terminal question again.
     - **exit** → emit exactly `[ABORT] github connection declined` (step 4 below) and stop immediately.

4. On **cant** (at any point), or on a "keep-waiting" final check that still fails, or on **exit** from the terminal question above: emit exactly:

   ```text
   [ABORT] github connection declined
   ```

   and stop. Never continue setup without GitHub, and never leave it "half-finished" — the abort happens before this step makes any writes, and the source/scout writes only happen after GitHub is verified.

---

**Upon completion, continue with:** [3b-enable-products.md](3b-enable-products.md)