export type HealthGrade = 'A' | 'B' | 'C' | 'D' | 'F'
export type SignalType = 'hiring' | 'permit' | 'contract' | 'expansion' | 'equipment'
export type ProspectStatus = 'new' | 'claimed' | 'contacted' | 'qualified' | 'dead'
export type IndustryType = 'restaurant' | 'retail' | 'construction' | 'healthcare' | 'manufacturing' | 'services' | 'technology'

export interface UCCFiling {
  id: string
  filingDate: string
  debtorName: string
  securedParty: string
  state: string
  lienAmount?: number
  status: 'active' | 'terminated' | 'lapsed'
  filingType: 'UCC-1' | 'UCC-3'
}

export interface GrowthSignal {
  id: string
  type: SignalType
  description: string
  detectedDate: string
  sourceUrl?: string
  score: number
  confidence: number
}

export interface HealthScore {
  grade: HealthGrade
  score: number
  sentimentTrend: 'improving' | 'stable' | 'declining'
  reviewCount: number
  avgSentiment: number
  violationCount: number
  lastUpdated: string
}

export interface Prospect {
  id: string
  companyName: string
  industry: IndustryType
  state: string
  status: ProspectStatus
  priorityScore: number
  defaultDate: string
  timeSinceDefault: number
  lastFilingDate?: string
  uccFilings: UCCFiling[]
  growthSignals: GrowthSignal[]
  healthScore: HealthScore
  narrative: string
  estimatedRevenue?: number
  claimedBy?: string
  claimedDate?: string
}

export interface CompetitorData {
  lenderName: string
  filingCount: number
  avgDealSize: number
  marketShare: number
  industries: IndustryType[]
  topState: string
  monthlyTrend: number
}

export interface PortfolioCompany {
  id: string
  companyName: string
  fundingDate: string
  fundingAmount: number
  currentStatus: 'performing' | 'watch' | 'at-risk' | 'default'
  healthScore: HealthScore
  lastAlertDate?: string
}

export interface RequalificationLead {
  id: string
  originalProspect: Prospect
  newSignals: GrowthSignal[]
  netScore: number
  recommendation: 'revive' | 'dismiss'
  reasoning: string
}

export interface DashboardStats {
  totalProspects: number
  highValueProspects: number
  avgPriorityScore: number
  newSignalsToday: number
  portfolioAtRisk: number
  avgHealthGrade: string
}

// Crypto & Sentiment Analysis Types
export interface CryptoPrice {
  symbol: string
  name: string
  currentPrice: number
  priceChange24h: number
  priceChangePercentage24h: number
  high24h: number
  low24h: number
  lastUpdated: string
}

export interface CryptoPriceHistory {
  timestamp: string
  price: number
}

export interface CryptoData {
  crypto: CryptoPrice
  priceHistory: CryptoPriceHistory[]
}

export interface SentimentData {
  keyword: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  score: number
  mentions: number
  trendingHashtags: string[]
  lastUpdated: string
}

export interface PriceAlert {
  id: string
  symbol: string
  alertType: 'price_up' | 'price_down'
  threshold: number
  triggeredAt: string
  message: string
}
