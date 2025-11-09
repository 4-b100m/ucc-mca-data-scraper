import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CryptoData } from '@/lib/types'
import { TrendUp, TrendDown } from '@phosphor-icons/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface CryptoChartProps {
  cryptoData: CryptoData[]
}

export function CryptoChart({ cryptoData }: CryptoChartProps) {
  const chartData = cryptoData[0]?.priceHistory.map((point, idx) => {
    const dataPoint: Record<string, string | number> = {
      time: new Date(point.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
    
    cryptoData.forEach(({ crypto, priceHistory }) => {
      dataPoint[crypto.symbol] = priceHistory[idx]?.price || 0
    })
    
    return dataPoint
  }) || []

  const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899']

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {cryptoData.map(({ crypto }) => {
          const isPositive = crypto.priceChangePercentage24h >= 0
          
          return (
            <Card 
              key={crypto.symbol} 
              className="glass-effect border-white/20 p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-xs text-white/70">{crypto.name}</div>
                  <div className="text-sm font-bold text-white">{crypto.symbol}</div>
                </div>
                {isPositive ? (
                  <TrendUp size={20} weight="bold" className="text-green-400" />
                ) : (
                  <TrendDown size={20} weight="bold" className="text-red-400" />
                )}
              </div>
              
              <div className="text-2xl font-bold text-white mb-1">
                ${crypto.currentPrice.toLocaleString()}
              </div>
              
              <Badge 
                variant={isPositive ? 'default' : 'destructive'}
                className={isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
              >
                {isPositive ? '+' : ''}{crypto.priceChangePercentage24h.toFixed(2)}%
              </Badge>
              
              <div className="mt-2 text-xs text-white/60">
                <div>H: ${crypto.high24h.toLocaleString()}</div>
                <div>L: ${crypto.low24h.toLocaleString()}</div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="glass-effect border-white/20 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-white mb-4">24h Price History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            {cryptoData.map(({ crypto }, idx) => (
              <Line
                key={crypto.symbol}
                type="monotone"
                dataKey={crypto.symbol}
                stroke={colors[idx % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
