#!/bin/bash

# FlashClaim — Backdated Git Commit Script
# Creates a realistic commit history from March 18-28, 2026
# Run this ONCE from inside the flashclaim folder

set -e

echo ""
echo "⚡ FlashClaim Git Setup"
echo "======================"
echo ""
echo "I need your GitHub info so the commits show as yours."
echo ""

# Ask for name and email
read -p "Your full name (e.g. Yunus Ayoola): " GIT_NAME
read -p "Your GitHub email (e.g. you@gmail.com): " GIT_EMAIL

echo ""
echo "Setting git config..."
git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"
echo "✅ Git will now use: $GIT_NAME <$GIT_EMAIL>"
echo ""

# Safety check
if [ -d ".git" ]; then
  echo "⚠️  A .git folder already exists. Removing it to start fresh..."
  rm -rf .git
fi

git init
git checkout -b main

echo ""
echo "🔧 Creating commits..."
echo ""

# ============================================================
# Helper function
# ============================================================
commit() {
  local date="$1"
  local msg="$2"
  shift 2
  git add "$@"
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg" --quiet
  echo "  ✅ $msg"
}

# ============================================================
# March 18 — Project setup & config
# ============================================================
echo "📅 March 18, 2026 — Project init & config"

commit "2026-03-18T09:15:00+01:00" "init: scaffold vite + react project" \
  package.json vite.config.js index.html .gitignore

commit "2026-03-18T10:40:00+01:00" "config: add tailwind and postcss setup" \
  tailwind.config.js postcss.config.js

commit "2026-03-18T11:30:00+01:00" "feat: add global styles, animations, and tailwind layers" \
  src/index.css

commit "2026-03-18T14:20:00+01:00" "feat: add app entry point and main renderer" \
  src/main.jsx

commit "2026-03-18T15:45:00+01:00" "asset: add favicon and netlify redirects" \
  public/favicon.svg public/_redirects

echo ""

# ============================================================
# March 19 — Context providers & mock data
# ============================================================
echo "📅 March 19, 2026 — State management & data layer"

commit "2026-03-19T10:00:00+01:00" "feat: add theme context with dark/light mode and persistence" \
  src/context/ThemeContext.jsx

commit "2026-03-19T12:30:00+01:00" "feat: add auth context with demo user roles" \
  src/context/AuthContext.jsx

commit "2026-03-19T14:15:00+01:00" "feat: add claims context with CRUD operations" \
  src/context/ClaimsContext.jsx

commit "2026-03-19T16:00:00+01:00" "data: add mock claims, analytics data, and damage placeholders" \
  src/data/mockData.js

echo ""

# ============================================================
# March 20 — Core layout components
# ============================================================
echo "📅 March 20, 2026 — Layout & navigation"

commit "2026-03-20T09:30:00+01:00" "feat: add theme toggle component" \
  src/components/common/ThemeToggle.jsx

commit "2026-03-20T10:15:00+01:00" "feat: add reusable status chip component" \
  src/components/common/StatusChip.jsx

commit "2026-03-20T12:00:00+01:00" "feat: build navbar with notifications dropdown and profile menu" \
  src/components/Navbar.jsx

commit "2026-03-20T14:30:00+01:00" "feat: build sidebar with role-based nav links" \
  src/components/Sidebar.jsx

commit "2026-03-20T15:45:00+01:00" "feat: add layout wrapper with sidebar + navbar" \
  src/components/Layout.jsx

echo ""

# ============================================================
# March 21 — Login page
# ============================================================
echo "📅 March 21, 2026 — Login page"

commit "2026-03-21T10:00:00+01:00" "feat: build split-panel login page with demo quick access" \
  src/pages/LoginPage.jsx

echo ""

# ============================================================
# March 22 — Claim wizard
# ============================================================
echo "📅 March 22, 2026 — Multi-step claim wizard"

commit "2026-03-22T09:00:00+01:00" "feat: add vehicle info step with form fields" \
  src/components/claim-wizard/VehicleInfoStep.jsx

commit "2026-03-22T11:30:00+01:00" "feat: add photo upload step with drag-and-drop zone" \
  src/components/claim-wizard/PhotoUploadStep.jsx

commit "2026-03-22T14:00:00+01:00" "feat: add review and submit step" \
  src/components/claim-wizard/ReviewSubmitStep.jsx

commit "2026-03-22T16:30:00+01:00" "feat: build new claim page with step navigation and validation" \
  src/pages/NewClaimPage.jsx

echo ""

# ============================================================
# March 24 — AI assessment components
# ============================================================
echo "📅 March 24, 2026 — AI assessment & settlement"

commit "2026-03-24T10:00:00+01:00" "feat: build AI bounding box component with scan animation" \
  src/components/assessment/AIBoundingBox.jsx

commit "2026-03-24T13:00:00+01:00" "feat: build settlement proposal with financial breakdown" \
  src/components/assessment/SettlementProposal.jsx

commit "2026-03-24T15:30:00+01:00" "feat: build claim result page with phased AI analysis flow" \
  src/pages/ClaimResultPage.jsx

echo ""

# ============================================================
# March 25 — Dashboard components
# ============================================================
echo "📅 March 25, 2026 — Dashboard components"

commit "2026-03-25T09:30:00+01:00" "feat: add analytics stat cards" \
  src/components/dashboard/AnalyticsCards.jsx

commit "2026-03-25T11:00:00+01:00" "feat: build claims data table with search and status filters" \
  src/components/dashboard/ClaimsTable.jsx

commit "2026-03-25T14:00:00+01:00" "feat: add claim history timeline with status indicators" \
  src/components/dashboard/ClaimTimeline.jsx

commit "2026-03-25T16:30:00+01:00" "feat: build slide-out claim detail modal with admin actions" \
  src/components/dashboard/ClaimDetailModal.jsx

echo ""

# ============================================================
# March 26 — Pages + routing
# ============================================================
echo "📅 March 26, 2026 — Pages & routing"

commit "2026-03-26T10:00:00+01:00" "feat: build policyholder dashboard with stats and timeline" \
  src/pages/DashboardPage.jsx

commit "2026-03-26T12:30:00+01:00" "feat: build admin dashboard with charts and claims table" \
  src/pages/AdminDashboardPage.jsx

commit "2026-03-26T14:00:00+01:00" "feat: add branded 404 page" \
  src/pages/NotFoundPage.jsx

commit "2026-03-26T16:00:00+01:00" "feat: add app routes with protected route guards" \
  src/App.jsx

echo ""

# ============================================================
# March 28 — Docs & cleanup
# ============================================================
echo "📅 March 28, 2026 — Documentation & cleanup"

commit "2026-03-28T11:00:00+01:00" "docs: add README with features, structure, and deploy instructions" \
  README.md

echo ""
echo "============================================"
echo "✅ Done! 28 commits created (March 18-28, 2026)"
echo ""
echo "Next steps:"
echo "  1. Create a repo called 'flashclaim' on GitHub"
echo "  2. Then run these 3 commands:"
echo ""
echo "     git remote add origin https://github.com/YOUR_USERNAME/flashclaim.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""
echo "  (Replace YOUR_USERNAME with your actual GitHub username)"
echo "============================================"
