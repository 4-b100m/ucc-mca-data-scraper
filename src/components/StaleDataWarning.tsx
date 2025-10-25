import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ClockCounterClockwise, ArrowClockwise } from '@phosphor-icons/react'

interface StaleDataWarningProps {
  lastUpdated: string
  onRefresh: () => void
}

export function StaleDataWarning({ lastUpdated, onRefresh }: StaleDataWarningProps) {
  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
  )

  if (daysSinceUpdate < 7) return null

  const severity = daysSinceUpdate >= 30 ? 'destructive' : 'default'

  return (
    <Alert variant={severity} className="mb-6">
      <ClockCounterClockwise size={20} weight="fill" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          <span className="font-semibold">Data is {daysSinceUpdate} days old.</span> 
          {daysSinceUpdate >= 30 ? ' Critical: Health scores may be inaccurate.' : ' Consider refreshing for latest signals.'}
        </span>
        <Button 
          variant={severity === 'destructive' ? 'destructive' : 'outline'} 
          size="sm"
          onClick={onRefresh}
        >
          <ArrowClockwise size={16} weight="bold" className="mr-2" />
          Refresh Now
        </Button>
      </AlertDescription>
    </Alert>
  )
}
