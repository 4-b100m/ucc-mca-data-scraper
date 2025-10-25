import { DashboardStats } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { 
  TrendUp, 
  Target, 
  ChartBar, 
  Sparkle, 
  WarningCircle,
  ChartLineUp
} from '@phosphor-icons/react'

interface StatsOverviewProps {
  stats: DashboardStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statItems = [
    {
      label: 'Total Prospects',
      value: stats.totalProspects.toLocaleString(),
      icon: Target,
      color: 'text-primary'
    },
    {
      label: 'High-Value Leads',
      value: stats.highValueProspects.toLocaleString(),
      icon: TrendUp,
      color: 'text-accent',
      subtitle: `${Math.round((stats.highValueProspects / stats.totalProspects) * 100)}% of total`
    },
    {
      label: 'Avg Priority Score',
      value: stats.avgPriorityScore.toString(),
      icon: ChartBar,
      color: 'text-secondary'
    },
    {
      label: 'New Signals Today',
      value: stats.newSignalsToday.toLocaleString(),
      icon: Sparkle,
      color: 'text-warning'
    },
    {
      label: 'Portfolio At Risk',
      value: stats.portfolioAtRisk.toLocaleString(),
      icon: WarningCircle,
      color: 'text-destructive'
    },
    {
      label: 'Avg Health Grade',
      value: stats.avgHealthGrade,
      icon: ChartLineUp,
      color: 'text-success'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className={item.color}>
                <Icon size={24} weight="fill" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-semibold font-mono tracking-tight">
                {item.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {item.label}
              </div>
              {item.subtitle && (
                <div className="text-xs text-muted-foreground pt-1">
                  {item.subtitle}
                </div>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
