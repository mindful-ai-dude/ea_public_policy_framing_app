# EA: AI Public Policy Frame the Debate and Social Content Creation App

This project is a sophisticated web application designed to generate strategically framed AI policy content. It leverages Google's Gemini 2.5 Flash and Pro Foundation SOTA models and the Gemma-3 12B IT Open Source large language model combined with George Lakoff's cognitive and behaviorial psychology research and established marketing philosophies to create high-quality blog posts, articles, and marketing materials for those working in AI Public Policy and Advocacy, AI Safety as well as AI Research and Development. The real-time database backend is powered by [Convex](https://convex.dev), and the frontend is built with React and Vite, featuring a glassmorphic design.

## Application Architecture

```mermaid
graph TD
    subgraph User Browser
        A[Frontend: React + Vite]
    end

    subgraph Convex Cloud
        B[Convex Backend]
        C[Convex Database]
        D[Convex File Storage]
    end

    subgraph Google Cloud
        E[Google AI API (Gemini & Gemma)]
    end

    A -- HTTPS Request (Authenticated) --> B;
    B -- Generates Prompt --> E;
    B -- Calls (generateAndSaveContent) --> E;
    E -- Streams Response --> B;
    B -- Saves to DB --> C;
    B -- Searches Files --> D;
    A -- Real-time Updates (useQuery) --> C;

    C --- B;
    D --- B;

    style A fill:#d4e6f1,stroke:#333,stroke-width:2px
    style B fill:#d1f2eb,stroke:#333,stroke-width:2px
    style C fill:#fdebd0,stroke:#333,stroke-width:2px
    style D fill:#fdebd0,stroke:#333,stroke-width:2px
    style E fill:#fadbd8,stroke:#333,stroke-width:2px
```

## UI/UX User Flow

```mermaid
graph TD
    Start --> A{User visits app};
    A --> B(Sign In / Sign Up);
    B --> C{Authenticated?};
    C -- No --> B;
    C -- Yes --> D[Dashboard];

    D --> E{First Time?};
    E -- Yes --> F[Navigate to Settings];
    F --> G[Enter Google AI API Key];
    G --> D;

    E -- No --> H[Configure Generation];
    H --> I[1. Enter Topic & URL];
    I --> J[2. Select Region];
    J --> K[3. Choose Marketing Framework];
    K --> L[4. Select Content Type];
    L --> M[Click "Generate Content"];

    M --> N[Generation Screen];
    N --> O(Show Real-time Progress);
    O --> P[Content Generated];
    P --> Q(Display Final Output);
    Q --> R[Save to Library];

    D --> S[Navigate to Library];
    S --> T[View & Search History];
    T --> U{Select a piece};
    U --> V[View/Copy/Download Content];

    style Start fill:#fff,stroke:#333,stroke-width:4px
    style B fill:#eaf2f8
    style D fill:#d4e6f1
    style F fill:#fef9e7
    style G fill:#fef9e7
    style H fill:#e8f8f5
    style N fill:#e8f8f5
    style S fill:#eaf2f8
```

## Project structure

The frontend code is in the `src` directory and is built with [Vite](https://vitejs.dev/).

The backend code is in the `convex` directory.

`npm run dev` will start the frontend and backend servers.

---

# App User Guide

Welcome to the EA: AI Public Policy Frame the Debate and Social Content Creation App! This guide will walk you through everything you need to know to generate high-quality, strategically-framed content for your policy and advocacy needs.

## 1. Getting Started: Your First Login

When you first open the app, you'll be greeted with a sign-in screen.

*   **Sign In:** Use the secure sign-in form to create an account or log in.

*   **Dashboard:** After logging in, you'll land on the main dashboard, your command center for content creation.

## 2. IMPORTANT: API Key Setup

Before you can generate content, you must configure your own Google AI API key. This key is stored securely in your browser and is never sent to our servers.

1.  Navigate to the **Settings** screen using the main menu.

2.  Paste your Google AI API Key into the input field under **API Configuration**.

3.  Click **Save**. You are now ready to generate content!

## 3. How to Generate Content: A Step-by-Step Workflow

From the **Dashboard**, you can start creating content. Here’s the process:

1.  **Select Content Type:** Choose what you want to create. Each type is optimized for a different purpose:

    *   **Short Daily Blog Post:** For quick, thought-provoking updates.

    *   **Engaging Article:** For in-depth, narrative-driven pieces.

    *   **Marketing Playbook:** For comprehensive campaign strategies.

    *   **Social Media Calendar:** For a month's worth of platform-specific post ideas.

2.  **Select Marketing Framework:** Choose a strategic lens for your content. This is the "secret sauce" that makes your content more effective.

    *   **Lakoff Framing:** Shapes the narrative with positive, cognitive and behavioral science value-based language.

    *   **Godin Marketing:** Creates remarkable content that builds trust and earns attention.

    *   **Vaynerchuk Content:** Focuses on authentic, transparent, and relatable messaging.

    *   **Flanagan Acquisition:** Uses clever, counter-intuitive strategies to grow your audience.

3.  **Provide Your Topic & Context:**

    *   **Topic:** Enter the core subject of your content (e.g., "AI regulation and Public Policy").

    *   **Reference URL (Optional):** Provide an optional url link to a news article or policy document for the AI to use as context.

    *   **Knowledge Base (Automatic):** If you select the **Lakoff** or **Integrated** framework, the system will automatically search its internal knowledge base for relevant documents and use them to enhance the generated content. 

4.  **Choose Your AI Model & Region:**

    *   **AI Model:** You can choose the best model for your needs in the **Settings** screen.
    
    The options are:
        *   **Gemini 2.5 Pro:** The most capable model for complex, nuanced analysis.

        *   **Gemini 2.5 Flash:** A fast and efficient model, great for most standard tasks.

        *   **Gemma 3 12B:** A lightweight, performant cost-effective open source option.

    *   **Geographic Focus:** Select the region your content is targeting.

5.  **Generate!**

    *   Click the "**Generate Content**" button.

    *   The app will show you a real-time progress screen as it works.

    *   Once complete, the final output will be displayed and automatically saved to your Library.

## 4. Managing Your Content Library

All your generated content is automatically saved. You can access it from the **Library** screen.

*   **View & Search:** See all your past creations. Use the search bar to find specific pieces by topic.

*   **Export:** Open any piece of content and use the export button to download it as a **.txt** file.

*   **Copy & Delete:** Easily copy content to your clipboard or delete items you no longer need.

## 5. Settings

*   Visit the **Settings** screen to update your API Key, change your default AI model, and monitor your total token usage.

---

# Developer Guide

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
    npm install
    ```

3.  **Set Up Convex Backend:**
    *   Install the Convex CLI: `npm install -g convex`
    *   Log in to your Convex account: `npx convex login`
    *   Start the local development backend:
        ```bash
        npx convex dev
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
        npm run dev:frontend
        ```
    *   Open your browser to `http://localhost:5173` to see the app.

## 3. Deployment

**A. Deploying the Convex Backend:**

Simply run the deploy command. This pushes the current state of your `convex/` directory to your production deployment.

```bash
npx convex deploy
```

Remember to set your production environment variables (like `GEMINI_API_KEY`) in the Convex Dashboard for the production deployment, just as you did for development.

**B. Deploying the Frontend to Netlify:**

1.  **Push to Git:** Ensure your project is on GitHub, GitLab, or Bitbucket.

2.  **Create a New Netlify Site:** Link your Git repository.

3.  **Configure Build Settings:**

    *   **Build command:** `npm run build`

    *   **Publish directory:** `dist`

4.  **Set Environment Variable:**

    *   In your Netlify site's settings, go to **Site configuration -> Environment variables**.

    *   Add a new variable:

        *   **Key:** `VITE_CONVEX_URL`

        *   **Value:** Get this URL from your **production** Convex dashboard. It will look like `https://<your-deployment-name>.convex.cloud`.

Netlify will now build and deploy your frontend. Any new push to your main branch will trigger a new deploy.

