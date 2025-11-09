import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SentimentData } from '@/lib/types'
import { TrendUp, TrendDown, Minus, Hash } from '@phosphor-icons/react'
import { Progress } from '@/components/ui/progress'

interface SentimentAnalysisProps {
  sentimentData: SentimentData[]
}

export function SentimentAnalysis({ sentimentData }: SentimentAnalysisProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendUp size={20} weight="bold" className="text-green-400" />
      case 'bearish':
        return <TrendDown size={20} weight="bold" className="text-red-400" />
      default:
        return <Minus size={20} weight="bold" className="text-yellow-400" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'text-green-400'
      case 'bearish':
        return 'text-red-400'
      default:
        return 'text-yellow-400'
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sentimentData.map((data) => (
          <Card 
            key={data.keyword} 
            className="glass-effect border-white/20 p-4 sm:p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{data.keyword}</h3>
                <div className="text-xs text-white/60 mt-1">
                  {data.mentions.toLocaleString()} mentions
                </div>
              </div>
              {getSentimentIcon(data.sentiment)}
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">Sentiment Score</span>
                  <span className={`text-sm font-bold ${getSentimentColor(data.sentiment)}`}>
                    {data.score}/100
                  </span>
                </div>
                <Progress value={data.score} className="h-2" />
              </div>

              <div>
                <Badge 
                  variant="outline"
                  className={`${
                    data.sentiment === 'bullish' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                    data.sentiment === 'bearish' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  } capitalize`}
                >
                  {data.sentiment}
                </Badge>
              </div>

              <div>
                <div className="text-xs text-white/70 mb-2 flex items-center gap-1">
                  <Hash size={14} weight="bold" />
                  Trending Hashtags
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.trendingHashtags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary"
                      className="text-xs glass-effect border-white/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-xs text-white/50 mt-4">
                Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-effect border-white/20 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Social Media Intelligence</h3>
        <div className="text-sm text-white/70 space-y-2">
          <p>
            Our sentiment analysis tracks real-time social media activity across multiple platforms including Twitter, 
            Reddit, and financial forums to gauge market sentiment for cryptocurrencies and stocks.
          </p>
          <p className="mt-2">
            <span className="text-green-400 font-semibold">Bullish</span> indicates positive sentiment (60-100),
            <span className="text-yellow-400 font-semibold ml-2">Neutral</span> indicates mixed sentiment (40-60),
            <span className="text-red-400 font-semibold ml-2">Bearish</span> indicates negative sentiment (0-40).
          </p>
        </div>
      </Card>
    </div>
  )
}
