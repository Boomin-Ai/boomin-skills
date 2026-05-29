# Boomin Troubleshooting

## CLI not found

Use:

```bash
npx @boomin/cli@latest --help
```

Do not rely on a globally installed `boomin` binary unless the user has one.

## NPM prompts for install

This is normal for first-time `npx` usage. Accept the install when the user has approved package installation.

## Doctor says missing `.env.local`

Run:

```bash
npx @boomin/cli@latest init
```

## MCP installed but not visible

Claude Code loads MCP servers at session startup. Restart Claude Code after:

```bash
npx @boomin/cli@latest mcp install
```

If Claude Code has path-scope issues on Windows, `mcp install` writes user-scope config to avoid project path mismatches.

## Program Operator not available

The default MCP pack is `referral_installer`. Program mutation tools require explicit admin consent:

```bash
npx @boomin/cli@latest mcp install --pack program_operator
```

## App already has referral routes

Do not overwrite. Dry-run the scaffold, inspect generated handlers, then merge the Boomin calls into the existing app routes.
