# Boomin Skills

Agent skills for installing and operating Boomin inside customer applications.

## Skills

- `boomin-referral-installer`: installs Boomin Partner Connect, referral-first UI/routes, and optional MCP access in an app repo.

## Claude Code Install

Copy the skill folder into your Claude Code skills directory:

```bash
mkdir -p ~/.claude/skills
cp -R boomin-referral-installer ~/.claude/skills/
```

Then restart Claude Code and ask:

```text
Use Boomin to add a partner referral program to this app.
```

## Codex Install

Copy the skill folder into your Codex skills directory:

```bash
mkdir -p ~/.codex/skills
cp -R boomin-referral-installer ~/.codex/skills/
```

Then start a new Codex session in an app repo and ask:

```text
Use the Boomin referral installer skill.
```

## Notes

The skill delegates deterministic work to `@boomin/cli`. It should not hand-roll token creation, MCP config, or route generation when the CLI can do it safely.
