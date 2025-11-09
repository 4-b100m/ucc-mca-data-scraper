import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PriceAlert } from '@/lib/types'
import { Bell, TrendUp, TrendDown, X } from '@phosphor-icons/react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface PriceAlertsProps {
  alerts: PriceAlert[]
  onDismiss: (alertId: string) => void
  onDismissAll: () => void
}

export function PriceAlerts({ alerts, onDismiss, onDismissAll }: PriceAlertsProps) {
  if (alerts.length === 0) {
    return (
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-3 text-white/70">
          <Bell size={24} weight="bold" />
          <div>
            <div className="font-semibold text-white">No Active Alerts</div>
            <div className="text-sm">You'll be notified when prices move significantly (±5%)</div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="glass-effect border-white/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={20} weight="fill" className="text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Price Alerts ({alerts.length})</h3>
        </div>
        {alerts.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onDismissAll}
            className="text-white/70 hover:text-white"
          >
            Clear All
          </Button>
        )}
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {alerts.map((alert) => {
            const isUp = alert.alertType === 'price_up'
            
            return (
              <div
                key={alert.id}
                className="glass-effect border-white/20 rounded-lg p-3 flex items-start gap-3"
              >
                <div className="flex-shrink-0 mt-1">
                  {isUp ? (
                    <TrendUp size={20} weight="bold" className="text-green-400" />
                  ) : (
                    <TrendDown size={20} weight="bold" className="text-red-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <Badge 
                      variant={isUp ? 'default' : 'destructive'}
                      className={`${
                        isUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      } flex-shrink-0`}
                    >
                      {alert.symbol}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDismiss(alert.id)}
                      className="h-6 w-6 p-0 text-white/50 hover:text-white"
                    >
                      <X size={14} weight="bold" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-white/90 mb-1">
                    {alert.message}
                  </p>
                  
                  <div className="text-xs text-white/60">
                    {new Date(alert.triggeredAt).toLocaleString()}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </Card>
  )
}
