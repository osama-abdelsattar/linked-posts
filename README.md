# LinkedPosts

LinkedPosts is a sleek, modern, card-based social media feed platform designed to offer an immersive, distraction-free content viewing experience. Combining the clean aesthetics of LinkedIn and Facebook, the application emphasizes responsive layouts, fluid micro-interactions, and optimized server-state handling.

## 🚀 Features

- **User Authentication & Guarded Routes:** Full Login and Signup flows. Unauthenticated users are automatically restricted via a Guard component, while authenticated users are prevented from accessing auth pages.
- **Interactive Feed:** Dynamic post builder supporting text input and image uploads (via FormData) with cached feed fetching and instant mutation updates.
- **Commenting System:** Read post-specific comments, view the top comment directly on the feed card, and submit new comments instantly.
- **Profile Management:** Customized user profiles supporting profile picture updates, post history, and public profile views (`/user/:userId`).
- **Premium UI/UX:** Persistent Light/Dark mode toggle (stored in `localStorage`), custom grid-based slide-out navigation for mobile screens, and smooth transitions powered by Framer Motion.

## 🛠️ Tech Stack

- **Core & Bundling:** React 19.2 + Vite
- **Routing:** React Router DOM v7 (featuring lazy-loaded routes)
- **Server State & Caching:** TanStack React Query v5
- **Styling & Components:** Tailwind CSS v4, HeroUI v2 (React UI library), Vanilla CSS
- **Animations:** Framer Motion
- **Forms & Validation:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Backend API:** Connects to an external REST API
