---
name: boomin-referral-installer
description: Install Boomin Partner Connect and referral-first programs into an app. Use when a user asks to add Boomin, creator or partner programs, referral links, affiliate flows, @boomin packages, Boomin MCP, or Boomin agent setup to a codebase.
---

# Boomin Referral Installer

Use this skill to install Boomin into an application with the shortest path to first value: a logged-in app user joins a partner program, gets a referral link, sees status/metrics in the app UI, and can optionally connect Instagram later.

## Core rule

Prefer `@boomin/cli` for deterministic setup. Do not manually recreate token creation, MCP config injection, or scaffolded route code unless the CLI is unavailable or the user explicitly asks for a custom implementation.

## Safety

- Never expose `sk_boomin_live_*`, handoff signing secrets, or bearer tokens in browser code.
- Treat `VITE_BOOMIN_PUBLIC_KEY` as browser-safe, but treat platform tokens and handoff secrets as server-only.
- Before writing files, inspect the app structure and avoid overwriting existing `/partner`, `/creator`, `/r/[code]`, or API routes unless the user approves or passes `--yes`.
- After setup, run the app's existing build/typecheck/test command when available.

## Default workflow

1. Inspect the app:
   - Read `package.json`.
   - Detect framework: Next.js App Router first, then Pages Router, Vite/React, Remix, or other.
   - Detect auth provider: Clerk, Supabase, Better Auth, Auth0, NextAuth, or custom.
   - Detect package manager from lockfiles.

2. Check Boomin CLI:

   ```bash
   npx @boomin/cli@latest --help
   npx @boomin/cli@latest doctor --json
   ```

3. If Boomin app config is missing, run:

   ```bash
   npx @boomin/cli@latest init
   ```

   For non-interactive agent runs, prefer:

   ```bash
   npx @boomin/cli@latest init --yes
   ```

4. If the user asks for MCP/agent tools, run:

   ```bash
   npx @boomin/cli@latest mcp install
   ```

   Tell the user that Claude Code must restart before the MCP server appears. For admin program edits, ask for approval before using:

   ```bash
   npx @boomin/cli@latest mcp install --pack program_operator
   ```

5. Scaffold the referral-first path.

   For Next.js, read [references/next.md](references/next.md), then run:

   ```bash
   npx @boomin/cli@latest referral init --framework next --auth custom --write
   ```

   Replace `custom` with `clerk` or `supabase` when detected.

6. Install runtime packages if needed (lead tracking requires SDK beta.8 and CLI 0.9.0 or later):

   ```bash
   npm install @boomin/sdk @boomin/connect @boomin/server
   ```

   Use the app's package manager if it is not npm.

7. For lead acquisition, read [references/leads.md](references/leads.md) and complete the generated `boomin/LEAD_SETUP.md`. Inspect the actual auth customer table and ID before generating the new-account migration. Wire verified session/database hooks, landing capture, both OTP/OAuth completion, and protected scheduled delivery. Adapt existing code rather than overwrite a working integration.

8. Verify:

   ```bash
   npx @boomin/cli@latest doctor --json
   ```

   Then run the app's build/test command and an isolated signup/outage rehearsal. Generated files or a passing route check do not prove signup credit. Report local verification separately from genuinely observed production events.

## Route conflicts

If `/partner`, `/creator`, `/r/[code]`, or `/api/boomin/*` already exists, do not overwrite blindly. Pick one:

- Use CLI route flags if available.
- Generate the scaffold to alternate paths.
- Integrate Boomin into the existing UI by calling the generated server helpers.

For Next.js route patterns and conflict handling, read [references/next.md](references/next.md).

## Optional channels

Instagram is optional. Referral-only programs should work with `requiredChannels: []` and show referral links immediately. If a program requires Instagram, preserve referral link visibility and show a "Connect Instagram" action as the missing channel.

## Troubleshooting

For common setup issues, read [references/troubleshooting.md](references/troubleshooting.md).
