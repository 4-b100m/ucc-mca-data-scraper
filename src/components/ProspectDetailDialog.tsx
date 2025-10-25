import { Prospect } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { HealthGradeBadge } from './HealthGradeBadge'
import { SignalTimeline } from './SignalTimeline'
import { 
  Buildings, 
  Export, 
  MapPin, 
  Calendar,
  CurrencyDollar,
  TrendUp,
  TrendDown,
  ArrowRight
} from '@phosphor-icons/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'

interface ProspectDetailDialogProps {
  prospect: Prospect | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onClaim: (prospect: Prospect) => void
}

export function ProspectDetailDialog({ 
  prospect, 
  open, 
  onOpenChange,
  onClaim 
}: ProspectDetailDialogProps) {
  if (!prospect) return null

  const yearsSinceDefault = Math.floor(prospect.timeSinceDefault / 365)
  const isClaimed = prospect.status === 'claimed'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">
                {prospect.companyName}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-4 text-base">
                <span className="flex items-center gap-1">
                  <MapPin size={16} weight="fill" />
                  {prospect.state}
                </span>
                <span>•</span>
                <span className="capitalize">{prospect.industry}</span>
                {prospect.estimatedRevenue && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <CurrencyDollar size={16} weight="fill" />
                      ${(prospect.estimatedRevenue / 1000000).toFixed(1)}M est. revenue
                    </span>
                  </>
                )}
              </DialogDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <div className="font-mono text-4xl font-semibold text-primary">
                  {prospect.priorityScore}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Priority Score
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">Opportunity Summary</h3>
            <p className="text-sm leading-relaxed">{prospect.narrative}</p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Health Score</div>
              <HealthGradeBadge grade={prospect.healthScore.grade} />
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Sentiment Trend</span>
                  <div className="flex items-center gap-1">
                    {prospect.healthScore.sentimentTrend === 'improving' ? (
                      <>
                        <TrendUp size={16} weight="bold" className="text-success" />
                        <span className="text-success">Improving</span>
                      </>
                    ) : prospect.healthScore.sentimentTrend === 'declining' ? (
                      <>
                        <TrendDown size={16} weight="bold" className="text-destructive" />
                        <span className="text-destructive">Declining</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Stable</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Reviews Analyzed</span>
                  <span className="font-mono">{prospect.healthScore.reviewCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Violations</span>
                  <span className="font-mono">{prospect.healthScore.violationCount}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Default History</div>
              <Badge variant="outline" className="font-mono text-lg mb-3">
                {yearsSinceDefault} years ago
              </Badge>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Default Date</span>
                  <span className="font-mono">{prospect.defaultDate}</span>
                </div>
                {prospect.lastFilingDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span>Last Filing</span>
                    <span className="font-mono">{prospect.lastFilingDate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span>UCC Filings</span>
                  <span className="font-mono">{prospect.uccFilings.length}</span>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="signals" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signals">
                Growth Signals ({prospect.growthSignals.length})
              </TabsTrigger>
              <TabsTrigger value="filings">
                UCC Filings ({prospect.uccFilings.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signals" className="mt-4">
              <SignalTimeline signals={prospect.growthSignals} />
            </TabsContent>
            
            <TabsContent value="filings" className="mt-4 space-y-3">
              {prospect.uccFilings.map((filing) => (
                <Card key={filing.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {filing.filingType}
                      </Badge>
                      <div className="text-sm">
                        <div className="font-medium">{filing.securedParty}</div>
                        <div className="text-muted-foreground">Secured Party</div>
                      </div>
                    </div>
                    {filing.lienAmount && (
                      <div className="text-right">
                        <div className="font-mono text-lg font-semibold">
                          ${(filing.lienAmount / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-muted-foreground">Lien Amount</div>
                      </div>
                    )}
                  </div>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Filing Date</div>
                      <div className="font-mono">{filing.filingDate}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">State</div>
                      <div className="font-mono">{filing.state}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Status</div>
                      <Badge variant="secondary" className="capitalize">
                        {filing.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="flex items-center gap-3">
            <Button 
              size="lg" 
              className="flex-1"
              disabled={isClaimed}
              onClick={() => onClaim(prospect)}
            >
              <Buildings size={20} weight="fill" className="mr-2" />
              {isClaimed ? `Claimed by ${prospect.claimedBy}` : 'Claim Lead'}
            </Button>
            <Button size="lg" variant="outline">
              <Export size={20} weight="bold" className="mr-2" />
              Export to CRM
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
