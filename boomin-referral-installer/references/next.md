# Next.js Boomin Install

Use this reference when installing Boomin in a Next.js app.

## Detect router

- App Router: `app/` exists and route handlers use `app/api/**/route.ts` or `.js`.
- Pages Router: `pages/` exists and API routes use `pages/api/**`.

The CLI v1 scaffold targets App Router. For Pages Router, create equivalent API handlers manually using `@boomin/server`.

## Auth selection

Use the detected auth provider:

- Clerk: `npx @boomin/cli@latest referral init --framework next --auth clerk --write`
- Supabase: `npx @boomin/cli@latest referral init --framework next --auth supabase --write`
- Other/custom: `npx @boomin/cli@latest referral init --framework next --auth custom --write`

## Default scaffold

The CLI creates:

- `app/api/boomin/partner/join/route.js`
- `app/api/boomin/partner/status/route.js`
- `app/r/[code]/route.js`
- `app/partner/page.jsx`

The partner page is starter UI only. Match the app's design system after the scaffold works.

## If routes are taken

If a path already exists:

1. Do not overwrite without permission.
2. Use alternate paths if the CLI supports route flags.
3. Otherwise, dry-run the scaffold and merge the relevant handler logic into the existing routes.

Good alternates:

- UI: `/creator-program`, `/partners`, `/affiliate`, `/account/referrals`
- Redirect: `/ref/[code]`, `/go/[code]`, `/invite/[code]`
- API: `/api/partner-program/*`, `/api/referrals/*`

## Verification

After install:

1. Start the app.
2. Visit the partner/referral page as a logged-in user.
3. Join the program.
4. Confirm the page shows a referral link.
5. Visit the redirect route with the referral code.
6. Confirm metrics update after refresh.
