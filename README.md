# ⚡ FlashClaim — AI-Powered Insurance Claims Platform

A modern B2B SaaS web app that uses AI to process auto insurance claims in minutes instead of weeks. Upload a photo of car damage, get an instant AI assessment, and receive a settlement offer — all in one flow.

Built with React, Vite, Tailwind CSS, Recharts, and Lucide Icons.

![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

---

## Features

**Policyholder Side**
- Multi-step claim wizard (Vehicle Info → Photo Upload → Review & Submit)
- AI damage assessment with animated scan line and bounding box overlays
- Settlement proposal with financial breakdown and instant payout button
- Claim history timeline with status chips

**Admin / Manager Side**
- Analytics dashboard with stat cards and Recharts charts
- Filterable claims data table (search + status filters)
- Slide-out claim detail modal with approve/deny/flag actions

**Extras**
- Dark / Light mode toggle (remembers your choice)
- Role-based routing (policyholder vs admin views)
- Notifications dropdown
- Branded 404 page
- Fully responsive (mobile → desktop)

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Policyholder | `user@flashclaim.com` | anything works |
| Admin | `admin@flashclaim.com` | anything works |

Or just click the **Demo Quick Access** buttons on the login page.

---

## Tech Stack

| What | Tool |
|------|------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router 6 |
| Charts | Recharts |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── main.jsx                    # App entry point
├── App.jsx                     # Routes & auth guards
├── index.css                   # Tailwind + custom animations
├── context/
│   ├── AuthContext.jsx          # Login state & roles
│   ├── ThemeContext.jsx         # Dark/light mode
│   └── ClaimsContext.jsx        # Claims data management
├── data/
│   └── mockData.js              # Demo claims & analytics
├── pages/
│   ├── LoginPage.jsx            # Split-panel login screen
│   ├── DashboardPage.jsx        # Policyholder dashboard
│   ├── NewClaimPage.jsx         # 3-step claim wizard
│   ├── ClaimResultPage.jsx      # AI assessment + settlement
│   ├── AdminDashboardPage.jsx   # Admin analytics + table
│   └── NotFoundPage.jsx         # Branded 404
└── components/
    ├── Layout.jsx               # Page wrapper (navbar + sidebar)
    ├── Navbar.jsx               # Top bar with notifications
    ├── Sidebar.jsx              # Side navigation
    ├── common/
    │   ├── ThemeToggle.jsx
    │   └── StatusChip.jsx
    ├── claim-wizard/
    │   ├── VehicleInfoStep.jsx
    │   ├── PhotoUploadStep.jsx
    │   └── ReviewSubmitStep.jsx
    ├── dashboard/
    │   ├── AnalyticsCards.jsx
    │   ├── ClaimsTable.jsx
    │   ├── ClaimDetailModal.jsx
    │   └── ClaimTimeline.jsx
    └── assessment/
        ├── AIBoundingBox.jsx
        └── SettlementProposal.jsx
```

---

## License

MIT

---

Built by **YungD** — a frontend developer building modern, production-grade web applications.
