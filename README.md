# UCC-MCA Intelligence Platform

A comprehensive merchant cash advance intelligence platform that transforms UCC filing data into actionable business opportunities through automated scraping, real-time health monitoring, growth signal detection, and ML-powered lead qualification.

## Features

### Core Capabilities
- **Prospect Dashboard**: Displays prioritized list of UCC default prospects with scores, growth signals, and health grades
- **Health Scoring**: Real-time business health monitoring with sentiment analysis and violation tracking
- **Growth Signal Detection**: Automated detection of hiring, permits, contracts, expansion, and equipment signals
- **Competitor Intelligence**: Market analysis of UCC filing activity by secured parties
- **Portfolio Monitoring**: Track funded companies with health alerts and risk indicators
- **Lead Re-qualification Engine**: Resurrect "dead" leads by detecting new growth/risk signals

### Data Export

The platform supports flexible data export in multiple formats:

#### Export Formats
- **JSON**: Structured data format ideal for API integration and programmatic processing
- **CSV**: Spreadsheet-compatible format perfect for Excel, Google Sheets, and CRM imports

#### Export Features
- **Single Prospect Export**: Export individual prospect details from the detail dialog
- **Bulk Export**: Select multiple prospects using checkboxes and export in batch
- **Smart Filtering**: Export includes filter information in the filename when filters are active
- **Comprehensive Data**: Exports include all prospect fields:
  - Company information (name, industry, state, revenue)
  - Scoring data (priority score, health grade, health score)
  - Growth signals (count, types, descriptions)
  - Default history (date, days since default)
  - Health metrics (sentiment trend, violations, reviews)
  - Status information (claimed by, claimed date)
  - AI-generated narrative

#### How to Export
1. Select your preferred export format from the "Export Format" dropdown (JSON or CSV)
2. For single prospects: Click "View Details" on a prospect card, then click "Export"
3. For bulk export: Select prospects using checkboxes, then use the batch export option
4. Files are automatically downloaded with timestamped filenames

### Advanced Filtering
- Filter by industry, state, minimum score
- Advanced filters for health grades, status, signal types, sentiment trends
- Filter by signal count, default age, revenue range, and violation presence
- Save and reuse filter combinations

### User Interface
- **Modern Design**: Glassmorphic UI with translucent effects inspired by Windows 11 Mica and macOS
- **Mobile-First**: Fully responsive design optimized for all device sizes
- **Real-time Updates**: Live data refresh with stale data warnings
- **Batch Operations**: Select and act on multiple prospects simultaneously

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Radix UI with custom styling
- **State Management**: GitHub Spark KV store
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Phosphor Icons
- **Charts**: Recharts for data visualization

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5000` (or next available port).

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
/src
  /components        # React components
    /ui             # Reusable UI components (Radix-based)
    ProspectCard.tsx
    ProspectDetailDialog.tsx
    AdvancedFilters.tsx
    BatchOperations.tsx
    CompetitorChart.tsx
    PortfolioMonitor.tsx
    StatsOverview.tsx
  /lib              # Utilities and types
    types.ts        # TypeScript type definitions
    mockData.ts     # Mock data generators
    utils.ts        # Utility functions
    exportUtils.ts  # Export functionality (JSON/CSV)
  App.tsx           # Main application component
```

## Competitive Analysis

See [COMPETITIVE_ANALYSIS.md](./COMPETITIVE_ANALYSIS.md) for detailed research on similar applications and implemented improvements based on industry best practices.

## Recent Improvements

Based on competitive analysis of similar B2B SaaS platforms (D&B, ZoomInfo, UCC search platforms, and MCA CRMs), we have implemented:

1. **Enhanced Export Capabilities** (✅ Completed)
   - Added CSV export format alongside existing JSON export
   - Proper CSV escaping for special characters (commas, quotes, newlines)
   - Export format selector in UI for easy switching
   - Timestamped filenames with filter context
   - Comprehensive field coverage in exports

See [COMPETITIVE_ANALYSIS.md](./COMPETITIVE_ANALYSIS.md) for the full analysis and roadmap of planned improvements.

## Documentation

- **Product Requirements**: See [PRD.md](./PRD.md) for detailed feature specifications
- **Logic Analysis**: See [LOGIC_ANALYSIS.md](./LOGIC_ANALYSIS.md) for implementation details
- **Security**: See [SECURITY.md](./SECURITY.md) for security policies
- **Competitive Analysis**: See [COMPETITIVE_ANALYSIS.md](./COMPETITIVE_ANALYSIS.md) for market research and improvement roadmap

## License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
