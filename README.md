# DMOA - SOEN357 Final Project Website

This is a Next.js Application that uses Typescript.

## Pages

All pages are under the ./src/pages directory:

- "/" -> Home (Homepage with featured content)
- "/artworks" -> Artworks (View all artworks)
- "/saved" => Saved (View saved artworks)
- "/about" => About (Description of the website's and project goal)
- "/exhibition" => Exhibition (Current exhibition that is customizable with separate immersive UI)
- "/search/\[search_term\]" => Search (Search results)
- "/artwork/\[id\]" => Artwork (Individual artwork)

## Components

All components are under the ./src/components directory:

### action-bar.tsx:

Rounded tiles with title and action buttons.

Variants:

- ActionBarActions: Expand to full screen and save an artwork.
- ActionBarNavigate: Navigate to previous or next artwork.
- ActionBarViewMode: Switch view mode between Grid, List and Carousel (when available).

### artwork-views.tsx

Displays multiple artworks.

Variants:

- ArtwortViewCarousel: View artworks as a carousel of items.
- ArtworkViewGrid: View artworks as a scrollable grid.
- ArtworkViewList: View artworks as a scrollable list.

### artwork.tsx

Display a single artwork.

Variants:

- Artwork(variant="PICTURE_ONLY"): Shows the artwork image only. Hovering enlarges the image.
- Artwork(variant="INFO_FLEX"): Shows detailed artwork information on the left and the image on the right.
- Artwork(variant="LIST_ELEM"): Shows the artwork image on the left and general information as a 4x4 grid on the right.
- Artwork(variant="INFO"): View information only.
- ArtworkExhibition: Same as _Artwork(variant="PICTURE_ONLY")_ but with modified information and show/hide opacity animation. Used in exhibition section.

### header.tsx

Header/TopBar/Menu.

Displays the following sections on the left as navigatable links:

- Home
- Artworks
- Saved
- About
- Exhibition

Also displays the search bar on the right.

### layout.tsx

Utility component that abstracts the layout via a header and scrollable content section.

### searchbar.tsx

Custom search bar.

### utils.tsx

Utility components:

- HeaderContentFlexLayout: Abstraction of header and content layout used with ActionBar.

## Data

A [subset of the data](https://github.com/art-institute-of-chicago/api-data) from the [Art Institute of Chicago](http://api.artic.edu/docs/) was downloaded in json format and can be found in ./data. We retrieve and manipulate it from ./src/pages/api/staticdata.ts.

---

# Next.js Boostrapped README.md

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
