import { CompetitorData } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import { TrendUp, TrendDown } from '@phosphor-icons/react'

interface CompetitorChartProps {
  data: CompetitorData[]
}

export function CompetitorChart({ data }: CompetitorChartProps) {
  const top10 = data.slice(0, 10)

  const chartData = top10.map(item => ({
    name: item.lenderName.length > 20 ? item.lenderName.substring(0, 20) + '...' : item.lenderName,
    filings: item.filingCount,
    avgDeal: Math.round(item.avgDealSize / 1000),
    trend: item.monthlyTrend
  }))

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Top Lenders by Filing Volume</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              className="text-xs"
            />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'oklch(1 0 0)',
                border: '1px solid oklch(0.88 0.01 270)',
                borderRadius: '0.5rem'
              }}
            />
            <Bar dataKey="filings" fill="oklch(0.25 0.06 250)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {top10.map((competitor, index) => (
          <Card key={competitor.lenderName} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="font-mono">
                    #{index + 1}
                  </Badge>
                  <h4 className="font-semibold text-sm">{competitor.lenderName}</h4>
                </div>
                <div className="text-xs text-muted-foreground">
                  Top State: {competitor.topState}
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xl font-semibold">
                  {competitor.filingCount}
                </div>
                <div className="text-xs text-muted-foreground">Filings</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Avg Deal Size</div>
                <div className="font-mono text-sm font-semibold">
                  ${(competitor.avgDealSize / 1000).toFixed(0)}K
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Market Share</div>
                <div className="font-mono text-sm font-semibold">
                  {competitor.marketShare}%
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-xs text-muted-foreground mb-1">Industries</div>
              <div className="flex flex-wrap gap-1">
                {competitor.industries.map(ind => (
                  <Badge key={ind} variant="secondary" className="text-xs capitalize">
                    {ind}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-xs text-muted-foreground">Monthly Trend</span>
              <div className="flex items-center gap-1">
                {competitor.monthlyTrend > 0 ? (
                  <>
                    <TrendUp size={14} weight="bold" className="text-success" />
                    <span className="font-mono text-sm text-success">
                      +{competitor.monthlyTrend.toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendDown size={14} weight="bold" className="text-destructive" />
                    <span className="font-mono text-sm text-destructive">
                      {competitor.monthlyTrend.toFixed(1)}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
