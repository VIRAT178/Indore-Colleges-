<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a9fdd835-4c20-4a74-8aa3-762f2d4a04f4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy

This repo can be deployed as a single Node service or as a split frontend/backend setup.

### Single service deployment

1. Set the production environment variables in your host: `GEMINI_API_KEY`, `MONGODB_URI`, `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
2. Build and start the root app with `npm run build` and `npm start`.
3. The server will serve the built frontend and the API from the same domain.

### Split deployment

1. Deploy the backend Node service first and copy its public URL.
2. Set `VITE_API_URL` in the frontend deployment to that backend URL.
3. Deploy the frontend with its SPA rewrite fallback enabled.
