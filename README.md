# Boomin Skills

Agent skills for installing and operating Boomin inside customer applications.

## Quick Install

From any app repo:

```bash
npx @boomin/cli@latest skill install
npx @boomin/cli@latest doctor
```

Then restart Claude Code or Codex so the new skill metadata is loaded.

## Skills

- `boomin-referral-installer`: installs Boomin Partner Connect, referral-first UI/routes, and optional MCP access in an app repo.

## Use

After install, ask your agent:

```text
Use Boomin to add a partner referral program to this app.
```

Or:

```text
Use the Boomin referral installer skill. Check doctor first, then install referral-first routes.
```

## What It Does

- Detects the app framework and auth provider.
- Runs Boomin CLI health checks.
- Initializes Boomin app config when needed.
- Installs Boomin MCP when requested.
- Scaffolds referral-first routes/UI for Next.js apps.
- Verifies setup with `npx @boomin/cli@latest doctor`.

## Manual Install

The CLI installs the skill into both common local skill directories:

- Claude Code: `~/.claude/skills/boomin-referral-installer`
- Codex: `~/.codex/skills/boomin-referral-installer`

Manual copy is also possible:

```bash
git clone https://github.com/Boomin-Ai/boomin-skills.git
mkdir -p ~/.claude/skills ~/.codex/skills
cp -R boomin-skills/boomin-referral-installer ~/.claude/skills/
cp -R boomin-skills/boomin-referral-installer ~/.codex/skills/
```

Restart the agent after manual install.

## MCP

To give Claude Code live Boomin tools:

```bash
npx @boomin/cli@latest mcp install
```

Then restart Claude Code. The MCP server should show as `boomin` and connected.

## Design

The skill delegates deterministic work to `@boomin/cli`. It should not hand-roll token creation, MCP config, or route generation when the CLI can do it safely.
