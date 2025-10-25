import { PortfolioCompany } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HealthGradeBadge } from './HealthGradeBadge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { WarningCircle, TrendUp, TrendDown } from '@phosphor-icons/react'

interface PortfolioMonitorProps {
  companies: PortfolioCompany[]
}

const statusConfig = {
  performing: { label: 'Performing', color: 'bg-success text-success-foreground' },
  watch: { label: 'Watch List', color: 'bg-warning text-warning-foreground' },
  'at-risk': { label: 'At Risk', color: 'bg-destructive text-destructive-foreground' },
  default: { label: 'Default', color: 'bg-destructive text-destructive-foreground' }
}

export function PortfolioMonitor({ companies }: PortfolioMonitorProps) {
  const atRiskCompanies = companies.filter(c => c.currentStatus === 'at-risk' || c.currentStatus === 'default')
  const watchListCompanies = companies.filter(c => c.currentStatus === 'watch')

  return (
    <div className="space-y-6">
      {atRiskCompanies.length > 0 && (
        <Alert variant="destructive">
          <WarningCircle size={20} weight="fill" />
          <AlertDescription>
            <span className="font-semibold">{atRiskCompanies.length} portfolio companies</span> require immediate attention due to declining health scores.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-3">At-Risk Companies</h3>
          {atRiskCompanies.length === 0 ? (
            <Card className="p-6">
              <p className="text-sm text-muted-foreground text-center">
                No companies currently at risk
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {atRiskCompanies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Watch List</h3>
          {watchListCompanies.length === 0 ? (
            <Card className="p-6">
              <p className="text-sm text-muted-foreground text-center">
                No companies on watch list
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {watchListCompanies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Performing Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {companies
              .filter(c => c.currentStatus === 'performing')
              .slice(0, 6)
              .map(company => (
                <CompanyCard key={company.id} company={company} compact />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CompanyCard({ company, compact = false }: { company: PortfolioCompany; compact?: boolean }) {
  const statusConf = statusConfig[company.currentStatus]
  const daysSinceFunding = Math.floor((Date.now() - new Date(company.fundingDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className={compact ? 'p-4' : 'p-5'}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{company.companyName}</h4>
          <div className="flex items-center gap-2">
            <Badge className={statusConf.color}>
              {statusConf.label}
            </Badge>
            {company.lastAlertDate && (
              <Badge variant="outline" className="text-xs">
                Alert: {new Date(company.lastAlertDate).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </div>
        <HealthGradeBadge grade={company.healthScore.grade} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <div className="text-muted-foreground text-xs mb-1">Funding Amount</div>
          <div className="font-mono font-semibold">
            ${(company.fundingAmount / 1000).toFixed(0)}K
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs mb-1">Days Since Funding</div>
          <div className="font-mono font-semibold">{daysSinceFunding}</div>
        </div>
      </div>

      {!compact && (
        <>
          <div className="flex items-center justify-between text-sm pt-3 border-t">
            <span className="text-muted-foreground">Sentiment Trend</span>
            <div className="flex items-center gap-1">
              {company.healthScore.sentimentTrend === 'improving' ? (
                <>
                  <TrendUp size={14} weight="bold" className="text-success" />
                  <span className="text-success text-xs">Improving</span>
                </>
              ) : company.healthScore.sentimentTrend === 'declining' ? (
                <>
                  <TrendDown size={14} weight="bold" className="text-destructive" />
                  <span className="text-destructive text-xs">Declining</span>
                </>
              ) : (
                <span className="text-muted-foreground text-xs">Stable</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm pt-2">
            <span className="text-muted-foreground">Health Score</span>
            <span className="font-mono font-semibold">{company.healthScore.score}/100</span>
          </div>
        </>
      )}
    </Card>
  )
}
