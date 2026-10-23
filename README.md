# Ethnocare Online Tool

A multilingual web application that helps people using Ethnocare prosthetic
products, clinics, and distributors find product sizes, access assistance, and
locate local distributors.

The app provides guided, step-by-step flows for **Overlay**, **Underlay**, and
**Liner** products, with product-specific questions, illustrations, and reference
documents.

## Features

### Product sizing

- Guided sizing for Overlay, Underlay, and Liner products.
- Metric and imperial measurement options.
- Questions tailored to the product and transtibial (TT) or transfemoral (TF)
  amputation type, including suspension, circumference, length, and other
  product-specific characteristics.
- Size results, downloadable sizing charts, and an email capture form for sizing
  information.

### Product assistance

- Access to product user guides and troubleshooting instructions.
- Guided help for issues such as pressure points, fit, air loss, and
  inflation/deflation.
- Supporting illustrations, videos, adjustment guides, and a contact form for
  further assistance.

### Distributor finder

- Choose Overlay or Underlay, select a region, and view distributors by country.
- Results are filtered by product availability.
- Region and country labels are sorted alphabetically in the selected language.
- No amputation selection is required.

### Languages and supporting tools

- English, French, Spanish, and German, with automatic language detection and a
  manual language selector.
- Links to Ethnocare's external FAQ.
- Vercel Analytics page views and custom events for flow starts, selections,
  completions, and other interactions.

## Technology

| Area | Tools |
| --- | --- |
| UI | React 19, JavaScript, Tailwind CSS |
| Routing | React Router |
| Transitions | Framer Motion |
| Translations | i18next, react-i18next, browser language detection |
| Build and development | Vite |
| Code quality | ESLint |
| Form submissions | HubSpot Forms API |
| Analytics and deployment | Vercel Analytics, Vercel SPA rewrite configuration |

This repository contains a client-side application. HubSpot forms submit
directly from the browser; no application backend is included.

## Getting started

### Prerequisites

- Node.js 22 LTS or a newer supported LTS release.
- npm, included with Node.js.

### Install and run

From the repository root:

```powershell
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

### Configure HubSpot forms

Create a `.env.local` file in the repository root with the identifiers for your
HubSpot portal and forms:

```dotenv
VITE_HS_PORTAL_ID=your_portal_id
VITE_HS_CONTACT_FORM_GUID=your_contact_form_guid
VITE_HS_EMAIL_FORM_GUID=your_email_form_guid
```

| Variable | Purpose |
| --- | --- |
| `VITE_HS_PORTAL_ID` | HubSpot portal used by both forms |
| `VITE_HS_CONTACT_FORM_GUID` | Assistance contact form |
| `VITE_HS_EMAIL_FORM_GUID` | Sizing email capture form |

The contact form submits `email`, `message`, `overlay_size_code`,
`overlay_problem`, and `overlay_detail`. The sizing email form submits `email`,
`overlay_size_code`, and `overlay_product`. Configure the corresponding fields
in HubSpot.

The app can be explored without these values, but form submissions require valid
configuration and network access. Restart the development server after changing
environment variables.

**All `VITE_` variables are exposed in the browser bundle.** Use only public
configuration identifiers here, never private API tokens or credentials. Keep
local environment files out of version control.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally after building |
| `npm run lint` | Run ESLint across the repository |

No automated test script is currently configured. When changing a flow, run the
build and lint commands, then manually check forward/back navigation,
product-specific branches, translations, and measurement validation.

## Project structure

```text
src/
  App.jsx                 Application routes and page transitions
  main.jsx                React entry point and analytics initialization
  i18n.js                 Translation resources and language detection
  assets/                 Product images, illustrations, icons, and media
  components/             Shared UI, forms, layout, and analytics helpers
  data/
    distributors.js       Distributor regions, countries, and product coverage
  locales/
    en/ fr/ es/ de/        Translations: common, pages, and errors
  pages/
    Welcome.jsx           Tool selection and external FAQ link
    sizing/               Product sizing flows and results
    assistance/           User guides and troubleshooting flows
    distributors/         Product selection, regions, and distributor results
public/                   Static PDFs, sizing charts, user guides, and icons
```

Application routes are defined in [src/App.jsx](./src/App.jsx). Folder names or
translation keys alone do not indicate that a feature is available from the
welcome page.

## Navigation and browser state

| Section | Entry route | Flow |
| --- | --- | --- |
| Home | `/` | Choose a tool or open the external FAQ |
| Sizing | `/sizing` | Units, amputation type, product, product-specific measurements, result |
| Assistance | `/assistance` | Amputation type, product, user guide or troubleshooting |
| Distributors | `/distributors` | Product, region, distributor list |

The distributor entry route redirects to `/distributors/product`. The legacy
`/distributors/amputation` URL also redirects there. The **Distributors Started**
event fires when the product selection page mounts.

Selections and measurements are shared between pages through browser
`localStorage`; the language preference is also cached there. Start from a
section's entry route when testing rather than opening a later step without its
prerequisites. To test a fresh session, clear the site's local storage, noting
that this also removes saved preferences and any locally stored email.

## Working on the project

- **Flow changes:** update routes in [src/App.jsx](./src/App.jsx), relevant pages,
  back links, progress steps, and tracking together.
- **Translations:** update the matching keys across all four language folders in
  [src/locales](./src/locales). English is the fallback language.
- **Distributors:** edit [src/data/distributors.js](./src/data/distributors.js).
  Region availability by product is configured in
  [RegionSelection.jsx](./src/pages/distributors/RegionSelection.jsx).
- **Documents:** place PDFs in the relevant [public](./public) folder and update
  their references. Preserve filename casing and account for spaces in URLs.
- **Analytics:** reuse the `track*.js` helpers in [src/components](./src/components)
  and verify event placement when adding or removing steps.

## Deployment

Build the app with `npm run build` and deploy the generated `dist/` directory.
For Vercel, use the Vite framework preset and configure the three HubSpot
environment variables in the project settings before building.

[vercel.json](./vercel.json) rewrites requests to `index.html` so React Router
routes work when opened directly or refreshed. Other static hosts need equivalent
SPA fallback behavior while still serving static assets normally.

Environment variables are embedded at build time; changing production values
requires a new build/deployment.
