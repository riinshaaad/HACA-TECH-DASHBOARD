# HACA Tech School — Live Survey Dashboard

A modern, dark-mode analytics dashboard that pulls live survey data from Google Sheets and presents it with interactive charts, competitive benchmarking, and AI-detected insights.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Recharts](https://img.shields.io/badge/Recharts-2-8884d8)

## Features

- **📊 Interactive Dashboard** — KPI cards, satisfaction distribution, NPS gauge, department breakdown, and trend analysis
- **🔍 Global Filters** — Filter by department, age group, and satisfaction rating across all visualizations
- **📈 Competitive Benchmarking** — Compare your metrics against industry averages and top performers
- **💡 AI Insights** — Automatically detected trends, anomalies, and highlights from your data
- **🔄 Live Data** — Auto-refreshes every 60 seconds via ISR (Incremental Static Regeneration)
- **🌙 Dark Mode** — Professional deep-blue/slate-grey color palette with glassmorphism effects
- **📱 Responsive** — Fully responsive design that works on desktop, tablet, and mobile

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Google Sheets credentials:

```env
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEET_NAME=Form Responses 1
```

> **Note:** Without credentials, the dashboard runs with rich mock data (50 sample responses) — perfect for development and demos.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Setting Up Google Sheets API

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **Google Sheets API** from the [API Library](https://console.cloud.google.com/apis/library/sheets.googleapis.com)

### Step 2: Get an API Key

1. Navigate to **APIs & Services → Credentials**
2. Click **Create Credentials → API Key**
3. Copy the API key to your `.env.local` file

### Step 3: Get Your Spreadsheet ID

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit
                                       └──────── This is your ID ────────┘
```

### Step 4: Make the Sheet Accessible

Either:
- **Share the sheet** with "Anyone with the link" set to **Viewer**, or
- Use a **Service Account** (for private sheets — requires additional setup)

### Expected Google Form/Sheet Columns

The dashboard auto-maps these column headers (case-insensitive):

| Column Header | Maps To |
|---|---|
| `Timestamp` | Response timestamp |
| `Full Name` / `Name` | Respondent name |
| `Email Address` / `Email` | Respondent email |
| `Age Group` | Age bracket |
| `Department` | Department name |
| `Satisfaction Rating (1-5)` | 1-5 star rating |
| `Recommendation Score (0-10)` | NPS score |
| `Feedback` / `Comments` | Open-ended feedback |

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/haca-dashboard)

### Manual Deploy

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import the project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables in **Settings → Environment Variables**:
   - `GOOGLE_SHEETS_API_KEY`
   - `GOOGLE_SPREADSHEET_ID`
   - `GOOGLE_SHEET_NAME`
4. Deploy!

The dashboard will automatically:
- Build with `next build`
- Serve via Vercel's Edge Network
- Revalidate data every 60 seconds via ISR

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design system & dark-mode tokens
│   ├── layout.tsx           # Root layout with SEO metadata
│   └── page.tsx             # Server component (data fetch)
├── components/
│   ├── Navbar.tsx            # App header with live indicator
│   ├── TabNavigation.tsx     # Two-tab switcher
│   ├── KPICard.tsx           # Glassmorphism stat cards
│   ├── FilterBar.tsx         # Global data filters
│   ├── DashboardClient.tsx   # Main client orchestrator
│   ├── CompetitorTable.tsx   # Benchmarking comparison table
│   ├── InsightCard.tsx       # Dynamic insight cards
│   └── charts/
│       ├── SatisfactionChart.tsx  # Bar chart
│       ├── DepartmentChart.tsx    # Donut chart
│       ├── TrendChart.tsx         # Area chart
│       └── NPSGauge.tsx          # SVG gauge
└── lib/
    ├── types.ts              # TypeScript interfaces
    ├── sheets.ts             # Google Sheets API fetch
    └── analytics.ts          # KPI computation & insights
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Charts | Recharts 2 |
| Data Source | Google Sheets API v4 |
| Caching | ISR (60s revalidation) |
| Deployment | Vercel |

## License

MIT
