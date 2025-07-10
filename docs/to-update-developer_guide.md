# Developer Guide - EA: AI Public Policy Frame the Debate and Social Content Creation App

This guide provides technical instructions for setting up, running, customizing, and deploying the EA: AI Public Policy Frame the Debate and Social Content Creation application.

## 1. Technical Overview

*   **Frontend:** React, Vite, TailwindCSS

*   **Backend & Database:** Convex (Managed, real-time backend platform)

*   **Core Logic:**

    *   Convex functions (`/convex`) handle all database operations, business logic, and authentication.

    *   Node.js actions (`"use node";`) are used for server-side operations requiring Node APIs, like calling the Google AI API.

## 2. Local Development Setup

1.  **Prerequisites:**
    *   Node.js (v18 or higher)
    *   NPM, PNPM, or Yarn

2.  **Clone & Install:**
    ```bash
    git clone <repository_url>
    cd ai-policy-expert
    npm install # or pnpm install / yarn install
    ```

3.  **Set Up Convex Backend:**

    *   Install the Convex CLI: `npm install -g convex`

    *   Log in to your Convex account: `npx convex login`

    *   Start the local development backend:
        ```bash
        npx convex dev # or pnpm convex dev
        ```
    *   This command does several things:

        *   Creates a new dev deployment on the Convex platform for you.

        *   Writes its URL to a local `.env.local` file.

        *   Pushes your code from the `convex/` directory.

        *   Watches for changes and syncs them automatically.

        *   Provides a URL to your Convex dashboard for managing data, logs, and settings.

4.  **Set Environment Variables:**

    *   The `VITE_CONVEX_URL` in `.env.local` is handled automatically by `npx convex dev`.

    *   You must add your **Google AI API Key** to your development deployment.

    *   **How to Get Your Google AI API Key (as of July 2025):**

        1.  **Sign in to Google AI Studio:** Navigate to [https://aistudio.google.com/](https://aistudio.google.com/) and sign in with your Google Account.

        2.  **Navigate to the API Key Section:** Once logged in, click the "**Get API Key**" button, usually in the top left.

        3.  **Create Your API Key:** Click on "**Create API Key**". You may be prompted to select or create a Google Cloud project. Follow the on-screen instructions.

        4.  **Copy Your API Key:** Your new key will be displayed. Copy it to your clipboard.

    *   **Add Key to Convex:**
        1.  Open your Convex Dashboard (the URL is provided when you run `npx convex dev`).

        2.  Go to **Settings -> Environment Variables**.

        3.  Add a new variable named `GEMINI_API_KEY` and paste your key into the value field.

5.  **Run the Frontend:**
    *   In a new terminal window, run the Vite development server:
        ```bash
        npm run dev:frontend # or pnpm dev:frontend / yarn dev:frontend
        ```
    *   Open your browser to `http://localhost:5173` to see the app.

## 3. Deployment

**A. Deploying the Convex Backend:**

Simply run the deploy command. This pushes the current state of your `convex/` directory to your production deployment.

```bash
npx convex deploy # or pnpm convex deploy
```

Remember to set your production environment variables (like `GEMINI_API_KEY`) in the Convex Dashboard for the production deployment, just as you did for development.

**B. Deploying the Frontend to Netlify:**

1.  **Push to Git:** Ensure your project is on GitHub, GitLab, or Bitbucket.

2.  **Create a New Netlify Site:** Link your Git repository.

3.  **Configure Build Settings:**

    *   **Build command:** `npm run build` (or `pnpm build`)

    *   **Publish directory:** `dist`

4.  **Set Environment Variable:**

    *   In your Netlify site's settings, go to **Site configuration -> Environment variables**.

    *   Add a new variable:

        *   **Key:** `VITE_CONVEX_URL`

        *   **Value:** Get this URL from your **production** Convex dashboard. It will look like `https://<your-deployment-name>.convex.cloud`.

Netlify will now build and deploy your frontend. Any new push to your main branch will trigger a new deploy.