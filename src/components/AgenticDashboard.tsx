/**
 * Agentic Dashboard Component
 * 
 * Displays autonomous system improvements, agent analyses, and execution status
 */

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Robot, 
  Brain, 
  CheckCircle, 
  Clock, 
  Warning,
  TrendUp,
  Shield,
  Sparkle
} from '@phosphor-icons/react'
import { Improvement, ImprovementPriority, ImprovementCategory } from '@/lib/agentic/types'
import { UseAgenticEngineResult } from '@/hooks/use-agentic-engine'

interface AgenticDashboardProps {
  agentic: UseAgenticEngineResult
}

export function AgenticDashboard({ agentic }: AgenticDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview')
  const { systemHealth, improvements, isRunning, runCycle, approveImprovement } = agentic

  const priorityColors: Record<ImprovementPriority, string> = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500'
  }

  const categoryIcons: Record<ImprovementCategory, React.ReactNode> = {
    'performance': <TrendUp className="w-4 h-4" />,
    'security': <Shield className="w-4 h-4" />,
    'usability': <Sparkle className="w-4 h-4" />,
    'data-quality': <Brain className="w-4 h-4" />,
    'feature-enhancement': <CheckCircle className="w-4 h-4" />
  }

  const pendingImprovements = improvements.filter(i => i.status === 'detected' || i.status === 'approved')
  const completedImprovements = improvements.filter(i => i.status === 'completed')

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Robot className="w-8 h-8 text-cyan-500" weight="duotone" />
            <div>
              <h2 className="text-2xl font-semibold">Agentic Forces</h2>
              <p className="text-sm text-muted-foreground">
                Autonomous System Improvement & Continuous Evolution
              </p>
            </div>
          </div>
          <Button 
            onClick={runCycle} 
            disabled={isRunning}
            className="gap-2"
          >
            {isRunning ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                Running Analysis...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Run Council Review
              </>
            )}
          </Button>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Improvements</div>
              <div className="text-3xl font-bold">{systemHealth.totalImprovements}</div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Implemented</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {systemHealth.implemented}
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Pending Review</div>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {systemHealth.pending}
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Success Rate</div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {systemHealth.successRate.toFixed(0)}%
              </div>
            </div>
          </Card>
        </div>

        {/* Safety Score */}
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Safety Score</span>
              <span className="text-sm text-muted-foreground">
                {systemHealth.avgSafetyScore.toFixed(0)}/100
              </span>
            </div>
            <Progress value={systemHealth.avgSafetyScore} className="h-2" />
          </div>
        </Card>

        {/* Improvements Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">
              Overview ({improvements.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingImprovements.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {improvements.length === 0 ? (
              <Card className="p-8 text-center">
                <Robot className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Improvements Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Run a council review to analyze the system and detect improvement opportunities
                </p>
                <Button onClick={runCycle} disabled={isRunning}>
                  <Brain className="w-4 h-4 mr-2" />
                  Start Analysis
                </Button>
              </Card>
            ) : (
              improvements.map(improvement => (
                <ImprovementCard
                  key={improvement.id}
                  improvement={improvement}
                  onApprove={approveImprovement}
                  priorityColors={priorityColors}
                  categoryIcons={categoryIcons}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingImprovements.length === 0 ? (
              <Card className="p-8 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
                <p className="text-muted-foreground">
                  No pending improvements requiring review
                </p>
              </Card>
            ) : (
              pendingImprovements.map(improvement => (
                <ImprovementCard
                  key={improvement.id}
                  improvement={improvement}
                  onApprove={approveImprovement}
                  priorityColors={priorityColors}
                  categoryIcons={categoryIcons}
                  showActions
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}

interface ImprovementCardProps {
  improvement: Improvement
  onApprove: (id: string) => void
  priorityColors: Record<ImprovementPriority, string>
  categoryIcons: Record<ImprovementCategory, React.ReactNode>
  showActions?: boolean
}

function ImprovementCard({ 
  improvement, 
  onApprove, 
  priorityColors, 
  categoryIcons,
  showActions = false 
}: ImprovementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { suggestion, status } = improvement

  const statusColors = {
    detected: 'bg-blue-500',
    analyzing: 'bg-cyan-500',
    approved: 'bg-yellow-500',
    implementing: 'bg-orange-500',
    testing: 'bg-purple-500',
    completed: 'bg-green-500',
    rejected: 'bg-red-500'
  }

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1">
              {categoryIcons[suggestion.category]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{suggestion.title}</h3>
                <Badge className={priorityColors[suggestion.priority]}>
                  {suggestion.priority}
                </Badge>
                <Badge className={statusColors[status]}>
                  {status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{suggestion.description}</p>
            </div>
          </div>
          {suggestion.automatable && (
            <Badge variant="outline" className="ml-2">
              <Robot className="w-3 h-3 mr-1" />
              Auto
            </Badge>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-3 pt-3 border-t">
            <div>
              <h4 className="text-sm font-semibold mb-1">Reasoning</h4>
              <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-1">Estimated Impact</h4>
              <p className="text-sm text-muted-foreground">{suggestion.estimatedImpact}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Safety: {suggestion.safetyScore}/100</span>
              </div>
              <Progress value={suggestion.safetyScore} className="h-2 flex-1 max-w-xs" />
            </div>

            {suggestion.implementation && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Implementation Plan</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Steps:</p>
                    <ul className="text-sm space-y-1">
                      {suggestion.implementation.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-muted-foreground">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {improvement.result && (
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                <h4 className="text-sm font-semibold mb-1 text-green-700 dark:text-green-300">
                  Execution Result
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {improvement.result.feedback}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>

          {showActions && status === 'detected' && (
            <Button
              size="sm"
              onClick={() => onApprove(improvement.id)}
              className="gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve & Execute
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
