# UCC-MCA Intelligence Platform

A comprehensive merchant cash advance intelligence platform that transforms UCC filing data into actionable business opportunities through automated scraping, real-time health monitoring, growth signal detection, and ML-powered lead qualification.

## 🎯 Overview

This is a sophisticated B2B SaaS platform designed for MCA providers to identify and qualify high-value prospects through:

- **Automated UCC Data Scraping**: Multi-state filing collection with intelligent CAPTCHA handling
- **Real-time Health Monitoring**: DEWS (Default Early Warning System) scoring
- **Growth Signal Detection**: Hiring, permits, contracts, and expansion indicators
- **ML-Powered Qualification**: Ensemble models for opportunity scoring
- **Portfolio Management**: Lead claiming, batch operations, and CRM export
- **Competitive Intelligence**: Lender market share and trend analysis

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Documentation

Comprehensive documentation is available in the [`/docs`](./docs) directory:

- **[Architecture Documentation](./docs/ARCHITECTURE.md)**: Complete architectural overview, technology stack, component design, security, performance, and scalability considerations
- **[Product Requirements](./PRD.md)**: Detailed product specifications and feature definitions
- **[Logic Analysis](./LOGIC_ANALYSIS.md)**: Comprehensive logic review and evolutionary enhancements
- **[Security Policy](./SECURITY.md)**: Vulnerability reporting and security guidelines

## 🛠️ Technology Stack

- **Frontend**: React 19.0, TypeScript 5.7, Vite 6.3
- **UI Framework**: Radix UI, Tailwind CSS 4.1, Framer Motion
- **State Management**: React Hooks, @github/spark KV
- **Design System**: OKLCH color space, IBM Plex Sans typography
- **Development**: ESLint, TypeScript ESLint, Vite plugins

## 🏗️ Project Structure

```
public-record-data-scrapper/
├── docs/                    # Documentation
│   ├── README.md           # Documentation index
│   └── ARCHITECTURE.md     # Architecture documentation
├── src/                    # Source code
│   ├── components/         # React components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility libraries
│   └── styles/            # Global styles
├── PRD.md                 # Product Requirements Document
├── LOGIC_ANALYSIS.md      # Logic review and enhancements
└── SECURITY.md            # Security policy
```

## 🎨 Key Features

- ✅ **Advanced Filtering**: 11-dimensional prospect filtering
- ✅ **Batch Operations**: Multi-select claim, export, and delete
- ✅ **Flexible Sorting**: 5-field customizable sorting
- ✅ **Stale Data Detection**: Automatic freshness monitoring
- ✅ **Health Scoring**: Visual DEWS grade indicators
- ✅ **Growth Signals**: Chronological intelligence timeline
- ✅ **Mobile-First Design**: Responsive across all devices
- ✅ **Accessibility**: WCAG 2.1 AA compliant

## 🔒 Security

See [SECURITY.md](./SECURITY.md) for vulnerability reporting and security policies.

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
