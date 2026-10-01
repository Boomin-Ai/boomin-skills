# Lead attribution installation

Use `@boomin/sdk >=1.0.0-beta.8`, `@boomin/cli >=0.9.0`, and `@boomin/server >=0.3.0`.
The CLI and hosted MCP generate the same lead-tracking implementation.

## Inspect before generating

Find the brand's existing referral routes, authenticated user lookup, PostgreSQL
driver, true account-creation table/transaction, OTP and OAuth completion paths,
and deployment scheduler. A profile row that a returning account can create is
not a signup boundary. Match the verified session ID to the customer ID column.

```sh
npx @boomin/cli@latest referral init --framework next --auth custom \
  --customer-table auth.users --customer-id-column id --json
```

Substitute actual table/column/auth. Review the output before `--write`; merge
existing routes and hooks where appropriate. MCP's `boomin_scaffold_referral_first`
accepts `customerTable` and `customerIdColumn`; hosted callers receive files for
their agent to write. Its local writer requires `overwrite:true` for existing files.

## Complete the integration

- Adapt `lib/boomin-lead-hooks.js` to the application's DB client and verified
  session. Never derive customer identity, signup eligibility or program choice
  from browser JSON. Do not bundle signing secrets in browser code.
- Review/apply `boomin/lead-tracking.sql` with existing migration tooling. Its
  trigger opens a 30-minute eligibility window only for newly inserted accounts;
  pre-existing accounts stay closed. Without a trigger, call `store.openSignup`
  in a verified new-account transaction using the original creation timestamp.
  Never open/reopen eligibility on login or when adding a profile.
- Mount `attribution.capture()` on the landing path. Preserve first touch for
  30 days. Call `reportConfirmedSignup()` after verified OTP AND OAuth
  authentication, including organic new signups. Retry failures; clear browser
  attribution only after durable acknowledgment. Do not delay normal sign-in.
- Configure all candidate programs server-side. Customer attribution is saved
  before delivery; unknown/ambiguous referral codes are invalid, while API
  outages remain pending. Use separate table-prefix stores for separate brands.
- Schedule protected delivery every five minutes with a dedicated random
  server-only token. On Workers use a scheduled handler calling `tracker.deliver()`;
  Next's generated POST endpoint is an alternative. Observe `store.deliveryStatus()`
  only through an authenticated admin interface.
- Qualified lead criteria come from verified brand business facts and a registered
  `x:` metric. Persist facts first and reconcile when attribution arrives later;
  use the same business-event ID on every retry. A bare signup is not necessarily
  payout-eligible. Stripe sales and managed DNS remain separate work.

## Evidence before claiming completion

Rehearse referred OTP/OAuth signup, organic then later referral, existing-user
login, concurrent/duplicate capture, wrong/ambiguous/unknown program routing,
qualified facts before/after capture, API outage recovery and abandoned leases.
Compare customer attribution, local delivery state, and Boomin's metric ledger.
Delivery is at least once with stable IDs and server-side dedupe; a lost
acknowledgment must not create repeat credit.

`doctor` and `boomin_verify_referral_install` cannot prove migrations, mounted
capture or cron from file existence. Say which runtime checks actually ran and
which events were synthetic. Do not report a genuine production signup without
observing one.
