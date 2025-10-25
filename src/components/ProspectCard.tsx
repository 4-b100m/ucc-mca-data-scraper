import { Prospect } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HealthGradeBadge } from './HealthGradeBadge'
import { Buildings, TrendUp, MapPin } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface ProspectCardProps {
  prospect: Prospect
  onSelect: (prospect: Prospect) => void
}

const industryIcons: Record<string, string> = {
  restaurant: '🍽️',
  retail: '🛍️',
  construction: '🏗️',
  healthcare: '🏥',
  manufacturing: '🏭',
  services: '💼',
  technology: '💻'
}

export function ProspectCard({ prospect, onSelect }: ProspectCardProps) {
  const isClaimed = prospect.status === 'claimed'
  const hasGrowthSignals = prospect.growthSignals.length > 0
  const yearsSinceDefault = Math.floor(prospect.timeSinceDefault / 365)

  return (
    <Card 
      className={cn(
        'p-6 hover:shadow-lg transition-all duration-200 cursor-pointer',
        isClaimed && 'bg-muted border-primary/30'
      )}
      onClick={() => onSelect(prospect)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-2xl">
            {industryIcons[prospect.industry]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight mb-1 truncate">
              {prospect.companyName}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} weight="fill" />
              <span>{prospect.state}</span>
              <span>•</span>
              <span className="capitalize">{prospect.industry}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="font-mono text-2xl font-semibold text-primary">
            {prospect.priorityScore}
          </div>
          <div className="text-xs text-muted-foreground">Priority</div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Health Score</span>
          <HealthGradeBadge grade={prospect.healthScore.grade} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Default Age</span>
          <Badge variant="outline" className="font-mono">
            {yearsSinceDefault}y ago
          </Badge>
        </div>

        {hasGrowthSignals && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Growth Signals</span>
            <Badge className="bg-accent text-accent-foreground">
              <TrendUp size={14} weight="bold" className="mr-1" />
              {prospect.growthSignals.length} detected
            </Badge>
          </div>
        )}
      </div>

      <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
        {prospect.narrative}
      </p>

      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          className="flex-1"
          disabled={isClaimed}
        >
          <Buildings size={16} weight="fill" className="mr-2" />
          {isClaimed ? 'Claimed' : 'View Details'}
        </Button>
        {isClaimed && prospect.claimedBy && (
          <Badge variant="secondary" className="text-xs">
            {prospect.claimedBy}
          </Badge>
        )}
      </div>
    </Card>
  )
}
