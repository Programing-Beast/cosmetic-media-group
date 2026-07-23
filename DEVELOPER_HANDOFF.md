# Developer handoff notes

## Architecture

- `src/app`: route-level pages, metadata, API endpoints and Studio route
- `src/components`: reusable editorial UI, navigation, forms and media
- `src/data/fallback.ts`: approved placeholder content for local startup and resilience
- `src/lib/content.ts`: Sanity-first content loaders with fallback behaviour
- `src/sanity/schemaTypes`: Sanity content models
- `src/sanity/lib`: client, queries, image builder and fetch wrapper
- `public/images`: images extracted from the approved interactive mockup
- `scripts/seed.ts`: initial Sanity population script

## Editorial flexibility

The homepage uses a section-order array from Sanity. The developer can add a new section by:

1. adding a new option to `homeSection.ts`
2. extending `HomeSectionType` in `src/types.ts`
3. adding a renderer in `HomeSections.tsx`
4. adding any required fields to the homepage schema and GROQ query

## Sanity data strategy

Singleton documents use stable IDs:

- `siteSettings`
- `homepage`
- `founder`
- `mediaDesk`
- `diamondAwards`

The Studio structure prevents ordinary duplicate and delete actions for these documents.

## Caching

Published Sanity reads currently revalidate every 60 seconds. Adjust the `next` options in `src/sanity/lib/fetch.ts` or add signed Sanity webhooks and tag-based revalidation when the production publishing workflow is finalised.

## Forms

The route handler is deliberately provider-neutral. It validates the submission and forwards it to a webhook. Replace or extend it for a selected CRM or transactional email provider. Do not expose API secrets to client components.

## Future authentication and subscriptions

For memberships, add a dedicated authentication and billing layer rather than storing passwords or payment data in Sanity. Suitable architecture could combine:

- Clerk, Auth0 or Supabase Auth
- Stripe subscriptions
- a relational database for entitlements and transaction records
- Sanity references or stable identifiers for gated editorial resources

## External media

Keep video delivery outside Vercel and the main content repository. The website should store only media metadata, thumbnails and an external playback URL.
