# Cosmetic Media Group — Next.js, React and Sanity

Production-oriented developer handoff for the Cosmetic Media Group editorial website.

## What is included

- Next.js App Router and React frontend
- Embedded Sanity Studio at `/studio`
- Structured Sanity schemas for the homepage, services, Media Hub videos, archived articles, authors, brands, toolkits, founder page, Media Desk and Diamond Awards
- Reorderable homepage sections in Sanity
- Responsive editorial design based on the approved V10 mockup
- Hover and click mega menus for About and Services
- Service listing and dynamic service pages
- Media Hub video gallery with a category filter and a page per entry that embeds one or more videos
- Archived editorial articles (previous Media Hub) retained at `/media-archive`
- External video embeds so large video files do not affect website performance
- Diamond Awards Dubai 2027 page
- Membership waiting-list form
- Newsletter, contact and journalist request forms
- Configurable webhook form delivery
- Sitemap, robots configuration, page metadata and social sharing metadata
- Local fallback content so the website runs before Sanity is connected
- Seed script to populate a new Sanity project

## Technology versions

The package file pins the tested target versions for the handoff date. Run upgrades in a branch and retest the Studio, forms and visual layouts before merging.

## 1. Install

```bash
npm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

## 2. Create or connect Sanity

Create a project in Sanity, then add the project ID and dataset to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-01
```

Add `http://localhost:3000` and the final production domain to the Sanity project CORS origins. Credentials should be allowed because the Studio is embedded.

Create a write token for the one-time seed script:

```env
SANITY_API_WRITE_TOKEN=your_write_token
```

Seed the initial content:

```bash
npm run seed
```

Remove the write token from production environment variables after seeding unless it is required for a controlled server-side workflow.

## 3. Run locally

```bash
npm run dev
```

Website: `http://localhost:3000`

Sanity Studio: `http://localhost:3000/studio`

Without Sanity environment variables, the frontend uses the bundled fallback content and local images. The Studio requires a real Sanity project.

## 4. Form delivery

All forms post to `/api/forms`. Configure one general webhook:

```env
FORMS_WEBHOOK_URL=https://your-automation-or-crm-endpoint.example
FORMS_WEBHOOK_SECRET=optional_shared_secret
```

Or use separate endpoints:

```env
CONTACT_WEBHOOK_URL=
NEWSLETTER_WEBHOOK_URL=
MEMBERSHIP_WEBHOOK_URL=
MEDIA_REQUEST_WEBHOOK_URL=
```

The webhook receives JSON containing the form type, submitted fields, timestamp and page source. Connect it to HubSpot, Brevo, Mailchimp, Make, Zapier, a serverless email service or the selected CRM.

In local development, forms return success and print the payload to the terminal when no webhook is configured. In production, an unconfigured form returns a clear service error rather than silently discarding a lead.

## 5. Video hosting

Do not upload large video files to the Next.js deployment or Sanity as ordinary website files. Host video on a dedicated service such as Vimeo, YouTube, Mux or the client’s chosen platform, then add the external URL to the Media Hub content item in Sanity.

The `ExternalVideo` component converts common YouTube and Vimeo URLs into responsive embeds. Extend `toEmbedUrl()` if the final provider uses a different embed format.

## 6. Homepage content and section order

Open the Homepage document in Sanity. The `Homepage section order` array allows editors to:

- drag sections into a new order
- disable a section without deleting it
- change hero content, statistics, publications, client logos and featured content

The frontend falls back to the approved section order if the array is empty.

## 7. Adding Media Hub videos

The Media Hub (`/media-hub`) is a video gallery. In Sanity, open **Media Hub** and create a document with:

- title and slug
- label / category (drives the gallery's filter chips, e.g. Live Broadcast, Streaming, Content)
- poster image (the gallery thumbnail)
- optional intro
- a **Videos** list — add one or more items, each with a heading and a video URL (YouTube, Vimeo or Mux); optional caption

Each document appears as a card on `/media-hub`, filterable by category, with its own page at `/media-hub/[slug]` that embeds every video in the list. Do not upload large video files — always paste an external share URL (see section 5).

### Archived articles

The previous article-based Media Hub is preserved as **Articles (archive)** in Sanity and served at `/media-archive` and `/media-archive/[slug]`. It is `noindex` and unlinked from the main navigation; use it for legacy editorial content or repurpose it later.

## 8. Adding services

Create or edit a Service document. Navigation order is controlled by the `order` field. Each service supports:

- introduction and main copy
- feature image
- outcomes
- deliverables
- SEO metadata

Dynamic pages are rendered at `/services/[slug]`.

## 9. Deployment to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables from `.env.local` in Vercel.
4. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
5. Add the production domain to Sanity CORS origins.
6. Deploy and test all forms, Studio access, images and external media.

## 10. Before launch

- Replace placeholder client and partner logos.
- Confirm the `100,000+ media features` statistic.
- Confirm the final publication list.
- Supply final legal pages and cookie-consent requirements.
- Replace placeholder social URLs.
- Connect and test all form webhooks.
- Confirm the external video provider.
- Check all Diamond Awards contact information and event details.
- Run accessibility, performance and cross-browser testing.
- Add production analytics IDs through the agreed consent mechanism.

## Important scope note

This repository provides the complete Phase 1 editorial website foundation. Secure member accounts, paid subscriptions, course progress, gated resources, advanced event booking, awards submissions and payment workflows require separate backend and product development. The current architecture is prepared so those systems can be added without rebuilding the public website.
