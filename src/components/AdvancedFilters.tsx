import { useState } from 'react'
import { Button } from '@/components/ui/butto
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger
import { Funn

  healthGrades: HealthGrade[]
  signalTypes: SignalType[]
  minSignalCount: number

}
export const initialFilters: 
  statuses: [],
  sentimentTrends: [],
  defaultAgeRange: [0, 7],
  hasViolations: null

  filters: AdvancedFilterState
  activeFilterCount: number



    onFiltersChange
  }
  const handleRese
  }
  const toggleHealth
      ...prev,
        ? prev.healthGrades.fi
    }))


      statuses: prev.statuses.in
        : [...prev.statuses, s
  }
  const toggleSignalType = 
 

export function AdvancedFilters({ filters, onFiltersChange, activeFilterCount }: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<AdvancedFilterState>(filters)

  const handleApply = () => {
    onFiltersChange(localFilters)
    setOpen(false)
  }

  const handleReset = () => {
    setLocalFilters(initialFilters)
  }

  const toggleHealthGrade = (grade: HealthGrade) => {
    setLocalFilters(prev => ({
      ...prev,
      healthGrades: prev.healthGrades.includes(grade)
        ? prev.healthGrades.filter(g => g !== grade)
        : [...prev.healthGrades, grade]
    }))
  }

  const toggleStatus = (status: ProspectStatus) => {
    setLocalFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }))
  }

  const toggleSignalType = (type: SignalType) => {
    setLocalFilters(prev => ({
      ...prev,
      signalTypes: prev.signalTypes.includes(type)
        ? prev.signalTypes.filter(t => t !== type)
        : [...prev.signalTypes, type]
    }))
  }

  const toggleSentiment = (sentiment: 'improving' | 'stable' | 'declining') => {
    setLocalFilters(prev => ({
      ...prev,
      sentimentTrends: prev.sentimentTrends.includes(sentiment)
        ? prev.sentimentTrends.filter(s => s !== sentiment)
        : [...prev.sentimentTrends, sentiment]
    }))
  }

          
                  variant={localFilters.status
                  className=
                  {status}
              ))}
          </div>
          <div>
            <div className="flex gap-2 mt-2 flex-wrap">
                <Button
                  s
            
                >
                </But
            </div>

            <Label className="text-white">Sentiment Trend</Label>
              {(['improving', 'stable', 'declining'] a
                  key={sentiment}
                  variant={lo
                  clas
                  {sentiment}
          <div>
          </div>
            <div className="flex gap-2 mt-2 flex-wrap">
            <Slider
              onValueCh
              max={10}
                  size="sm"
            />
          <div>
            <Slider
                >
              max={7}
                </Button>
          </div>
            </div>
          </div>

          <div>
              className="mt-2"
            <div className="flex gap-2 mt-2 flex-wrap">
              {(['new', 'claimed', 'contacted', 'qualified', 'dead'] as ProspectStatus[]).map(status => (
                <Button
                  key={status}
                  size="sm"
                  variant={localFilters.statuses.includes(status) ? 'default' : 'outline'}
                  onClick={() => toggleStatus(status)}
                  className={localFilters.statuses.includes(status) ? 'capitalize' : 'glass-effect border-white/30 text-white capitalize'}
                >
                  {status}
                </Button>
              ))}
                on
                

          <div>
            <Label className="text-white">Signal Types</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {(['hiring', 'permit', 'contract', 'expansion', 'equipment'] as SignalType[]).map(type => (
                <Button
                  key={type}
                  size="sm"
                  variant={localFilters.signalTypes.includes(type) ? 'default' : 'outline'}
                  onClick={() => toggleSignalType(type)}
                  className={localFilters.signalTypes.includes(type) ? 'capitalize' : 'glass-effect border-white/30 text-white capitalize'}
                >
                  {type}
                </Button>
              ))}
      </SheetConte
          </div>

          <div>
            <Label className="text-white">Sentiment Trend</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {(['improving', 'stable', 'declining'] as Array<'improving' | 'stable' | 'declining'>).map(sentiment => (
                <Button
                  key={sentiment}
                  size="sm"
                  variant={localFilters.sentimentTrends.includes(sentiment) ? 'default' : 'outline'}
                  onClick={() => toggleSentiment(sentiment)}
                  className={localFilters.sentimentTrends.includes(sentiment) ? 'capitalize' : 'glass-effect border-white/30 text-white capitalize'}
                >
                  {sentiment}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-white">Minimum Signal Count: {localFilters.minSignalCount}</Label>
            <Slider
              value={[localFilters.minSignalCount]}
              onValueChange={(val) => setLocalFilters(prev => ({ ...prev, minSignalCount: val[0] }))}
              min={0}
              max={10}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white">Default Age (years): {localFilters.defaultAgeRange[0]} - {localFilters.defaultAgeRange[1]}</Label>
            <Slider
              value={localFilters.defaultAgeRange}
              onValueChange={(val) => setLocalFilters(prev => ({ ...prev, defaultAgeRange: [val[0], val[1]] }))}
              min={0}
              max={7}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white">Revenue Range: ${(localFilters.revenueRange[0] / 1000000).toFixed(1)}M - ${(localFilters.revenueRange[1] / 1000000).toFixed(1)}M</Label>
            <Slider
              value={localFilters.revenueRange}
              onValueChange={(val) => setLocalFilters(prev => ({ ...prev, revenueRange: [val[0], val[1]] }))}
              min={0}
              max={10000000}
              step={100000}
              className="mt-2"
            />
          </div>

          <div>

            <div className="flex gap-2 mt-2 flex-wrap">


                variant={localFilters.hasViolations === null ? 'default' : 'outline'}
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: null }))}
                className={localFilters.hasViolations === null ? '' : 'glass-effect border-white/30 text-white'}
              >
                Any
              </Button>
              <Button
                size="sm"
                variant={localFilters.hasViolations === false ? 'default' : 'outline'}
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: false }))}
                className={localFilters.hasViolations === false ? '' : 'glass-effect border-white/30 text-white'}
              >

              </Button>

                size="sm"
                variant={localFilters.hasViolations === true ? 'default' : 'outline'}
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: true }))}
                className={localFilters.hasViolations === true ? '' : 'glass-effect border-white/30 text-white'}
              >

              </Button>

          </div>

          <div className="flex gap-2 pt-4 border-t border-white/20">
            <Button onClick={handleReset} variant="outline" className="flex-1 glass-effect border-white/30 text-white">
              Reset

            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>

        </div>




