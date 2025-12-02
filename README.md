# Kosuke Landing Page

Marketing website for Kosuke - Your Technical Co-founder for the 0 to 1.

## 🚀 Getting Started

### Prerequisites

- **bun** - Package manager
  - Install: `curl -fsSL https://bun.com/install | bash`
  - See [Bun installation](https://bun.com/docs/installation) for alternatives

### Setup

```bash
# Clone the repository
git clone https://github.com/Kosuke-Org/kosuke-landing.git
cd kosuke-landing

# Install dependencies
bun install

# Setup environment
cp .env.local .env
# Edit .env with your configuration
```

### Development

```bash
# Start development server
bun run dev
```

The application will be available at http://localhost:3000

### Build

```bash
# Build for production
bun run build

# Preview production build
bun run start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (logged-out)/       # Public marketing pages
│   │   ├── home/           # Landing page
│   │   ├── pricing/        # Pricing page
│   │   ├── blog/           # Blog (Ghost CMS)
│   │   ├── customers/      # Customer stories
│   │   ├── solutions/      # Solutions pages
│   │   └── ...             # Legal pages
│   └── api/
│       └── newsletter/     # Newsletter subscription
├── components/
│   ├── ui/                 # Shadcn UI components
│   └── ...                 # Shared components
├── hooks/                  # Custom React hooks
└── lib/
    ├── analytics/          # PostHog
    ├── ghost/              # Ghost CMS client
    └── types/              # TypeScript types
```

## 🔧 Environment Variables

```env
# Ghost CMS
GHOST_URL=https://your-ghost-instance.com
GHOST_CONTENT_API_KEY=your-content-key
GHOST_ADMIN_API_KEY=your-admin-key

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sentry (optional)
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_INDEXING=false
```

## 🧪 Code Quality

```bash
bun run lint          # Run ESLint
bun run typecheck     # TypeScript check
bun run knip          # Check unused code
bun run build         # Verify build
```

## 🚢 Deployment

Deployed automatically to Vercel on push to `main` branch.

### Required Vercel Secrets

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **CMS**: Ghost
- **Analytics**: PostHog, Sentry, Plausible
- **Deployment**: Vercel

## 🛡️ License

Kosuke is licensed under the [MIT License](LICENSE).

## 📬 Contact

For questions or support, create an issue or email filippo.pedrazzini (at) kosuke.ai
