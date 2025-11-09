# UCC-MCA Intelligence Platform

A comprehensive merchant cash advance intelligence platform that transforms UCC filing data into actionable business opportunities through automated scraping, real-time health monitoring, growth signal detection, and ML-powered lead qualification.

## 📚 Documentation

- **[PRD.md](./PRD.md)** - Product Requirements Document
- **[LOGIC_ANALYSIS.md](./LOGIC_ANALYSIS.md)** - Logic Check & Evolution Analysis
- **[MCP_RESEARCH.md](./MCP_RESEARCH.md)** - Research on MCP Servers, Open Source Projects, and Databases
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Step-by-step Implementation Guide
- **[RESEARCH_SUMMARY.md](./RESEARCH_SUMMARY.md)** - Executive Research Summary
- **[FREE_STACK_GUIDE.md](./FREE_STACK_GUIDE.md)** - 100% Free & Open Source Technology Stack Guide ⭐
- **[SECURITY.md](./SECURITY.md)** - Security Policy

## 🚀 Technology Stack

### Frontend
- **React 19** with TypeScript ✅ FREE (MIT License)
- **Vite** for build tooling ✅ FREE (MIT License)
- **Tailwind CSS** for styling ✅ FREE (MIT License)
- **shadcn/ui** components ✅ FREE (MIT License)
- **Radix UI** primitives ✅ FREE (MIT License)
- **Framer Motion** for animations ✅ FREE (MIT License)

### Backend (Planned) - All FREE & Open Source
- **Web Scraping**: Scrapy (Python, BSD License) or Crawlee (TypeScript, Apache 2.0) ✅ FREE
- **Primary Database**: PostgreSQL 15+ (PostgreSQL License) with TimescaleDB (Apache 2.0) ✅ FREE
- **Analytics Database**: ClickHouse (Apache 2.0) for real-time dashboards ✅ FREE
- **Processing**: DuckDB (MIT License) for ETL and transformations ✅ FREE
- **MCP Servers**: Model Context Protocol for AI integration ✅ FREE

**💰 Total Software Licensing Cost: $0** - See [FREE_STACK_GUIDE.md](./FREE_STACK_GUIDE.md) for complete details.

## 🏗️ Project Structure

```
.
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── styles/         # CSS and styling
├── MCP_RESEARCH.md     # MCP servers and database research
├── IMPLEMENTATION_GUIDE.md  # Implementation instructions
├── PRD.md              # Product requirements
└── LOGIC_ANALYSIS.md   # Logic analysis report
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

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

## 🎯 Key Features

1. **Prospect Dashboard** - Prioritized list of UCC default prospects with scores and growth signals
2. **Market Intelligence** - Competitive analysis by secured party/lender
3. **Lead Re-qualification Engine** - Resurrects dead leads with new growth/risk signals
4. **Health Scoring** - Real-time business health monitoring
5. **Growth Signal Detection** - Automated detection of expansion indicators

## 🗄️ Database Architecture

The platform uses a hybrid database approach:

- **PostgreSQL**: Primary storage for UCC filings, entities, and relational data
- **TimescaleDB**: Time-series optimization for health scores and signals
- **ClickHouse**: High-performance analytics for dashboards and reporting
- **DuckDB**: Embedded analytics for ETL and data processing

See [MCP_RESEARCH.md](./MCP_RESEARCH.md) for detailed database recommendations.

## 🤖 MCP Server Integration

Model Context Protocol (MCP) servers provide standardized AI integration:

- **PostgreSQL MCP Server**: AI-ready database access
- **Puppeteer MCP Server**: Browser automation for web scraping
- **Custom Scraping Tools**: State-specific UCC portal scrapers

See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for deployment instructions.

## 🔒 Security

Please review [SECURITY.md](./SECURITY.md) for security policies and vulnerability reporting.

## 📊 Research & Analysis

Comprehensive research has been conducted on:

1. **MCP Servers** - Web scraping and database integration
2. **Open Source Projects** - Scrapy, Crawlee, Playwright
3. **Database Solutions** - PostgreSQL, ClickHouse, TimescaleDB, DuckDB
4. **Implementation Strategy** - Phased approach with recommended stack

See [MCP_RESEARCH.md](./MCP_RESEARCH.md) for full research findings.

## 🚦 Development Status

- [x] Initial research and planning
- [x] Technology stack selection
- [x] Frontend UI implementation
- [ ] Backend scraping infrastructure
- [ ] Database schema implementation
- [ ] MCP server deployment
- [ ] ML pipeline for health scoring
- [ ] Production deployment

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Review [PRD.md](./PRD.md) for product requirements
2. Follow existing code style and patterns
3. Write tests for new features
4. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
