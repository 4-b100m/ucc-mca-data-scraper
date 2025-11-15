/**
 * Agentic Forces - Type Definitions
 * 
 * This module defines the core types for the agentic system that enables
 * autonomous decision-making, continuous improvement, and self-directed actions.
 */

export type AgentRole = 
  | 'data-analyzer'
  | 'optimizer' 
  | 'security'
  | 'ux-enhancer'
  | 'quality-assurance'
  | 'competitor-agent'

export type ImprovementCategory =
  | 'performance'
  | 'security'
  | 'usability'
  | 'data-quality'
  | 'feature-enhancement'
  | 'competitor-analysis'
  | 'threat-analysis'
  | 'opportunity-analysis'
  | 'strategic-recommendation'

export type ImprovementPriority = 'critical' | 'high' | 'medium' | 'low'

export type ImprovementStatus = 
  | 'detected'
  | 'analyzing'
  | 'approved'
  | 'implementing'
  | 'testing'
  | 'completed'
  | 'rejected'

export interface Agent {
  id: string
  role: AgentRole
  name: string
  capabilities: string[]
  analyze: (context: SystemContext) => Promise<AgentAnalysis>
}

export interface SystemContext {
  prospects: any[]
  competitors: any[]
  portfolio: any[]
  userActions: UserAction[]
  performanceMetrics: PerformanceMetrics
  timestamp: string
}

export interface UserAction {
  type: string
  timestamp: string
  details: Record<string, any>
}

export interface PerformanceMetrics {
  avgResponseTime: number
  errorRate: number
  userSatisfactionScore: number
  dataFreshnessScore: number
}

export interface AgentAnalysis {
  agentId: string
  agentRole: AgentRole
  findings: Finding[]
  improvements: ImprovementSuggestion[]
  timestamp: string
}

export interface CouncilReview {
  id: string
  startedAt: string
  completedAt?: string
  agents: Agent[]
  analyses: AgentAnalysis[]
  improvements: Improvement[]
  status: 'in-progress' | 'completed' | 'failed'
}

export interface Finding {
  id: string
  category: ImprovementCategory
  severity: 'info' | 'warning' | 'critical'
  description: string
  evidence: any
}

export interface ImprovementSuggestion {
  id: string
  category: ImprovementCategory
  priority: ImprovementPriority
  title: string
  description: string
  reasoning: string
  estimatedImpact: string
  automatable: boolean
  safetyScore: number // 0-100, higher is safer
  implementation?: ImplementationPlan
}

export interface ImplementationPlan {
  steps: string[]
  risks: string[]
  rollbackPlan: string[]
  validationCriteria: string[]
}

export interface Improvement {
  id: string
  suggestion: ImprovementSuggestion
  status: ImprovementStatus
  detectedAt: string
  approvedAt?: string
  implementedAt?: string
  completedAt?: string
  result?: ImprovementResult
  reviewedBy?: AgentRole[]
}

export interface ImprovementResult {
  success: boolean
  changes: string[]
  metrics: {
    before: Record<string, any>
    after: Record<string, any>
  }
  feedback: string
}

export interface FeedbackLoop {
  id: string
  type: 'user-feedback' | 'system-metrics' | 'agent-review'
  data: any
  timestamp: string
  processedBy: string[]
}

export interface AgenticConfig {
  enabled: boolean
  autonomousExecutionEnabled: boolean
  safetyThreshold: number // Minimum safety score to execute automatically
  maxDailyImprovements: number
  reviewRequired: ImprovementCategory[]
  enabledAgents: AgentRole[]
}

export interface AgentCallbackPayload {
  review: CouncilReview
  executedImprovements: Improvement[]
  pendingImprovements: Improvement[]
}

export interface AgentCallbackTransport {
  connect?: () => Promise<void> | void
  disconnect?: () => Promise<void> | void
  send: (payload: AgentCallbackPayload) => Promise<unknown> | unknown
}

export interface AgentCallbackOptions {
  /**
   * Endpoint to POST callback payloads to. When provided, the client will use `fetch`
   * with the supplied headers instead of a custom transport.
   */
  endpoint?: string
  /**
   * Optional transport implementation. When present, the transport's `send` method will
   * be used to deliver payloads. The transport may also expose `connect`/`disconnect`
   * hooks which will be invoked when available.
   */
  transport?: AgentCallbackTransport
  /**
   * Number of retry attempts before giving up on a callback request.
   */
  retries?: number
  /**
   * Initial delay in milliseconds before retrying a failed request.
   */
  retryDelayMs?: number
  /**
   * Optional headers to include when using the default `fetch` transport.
   */
  headers?: Record<string, string>
}
