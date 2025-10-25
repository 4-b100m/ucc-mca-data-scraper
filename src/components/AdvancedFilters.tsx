import { useState } from 'react'
  Sheet,
  SheetD
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
import { Checkbox } from '@/co
import { FunnelSimple } from '@phosphor-icons/r

  healthGrades: HealthGrade[]
  signalTypes: SignalType[]
  minSignalCount: number
  revenueRange: [number, number]
}

export interface AdvancedFilterState {
  healthGrades: HealthGrade[]
  statuses: ProspectStatus[]
  signalTypes: SignalType[]
  sentimentTrends: ('improving' | 'stable' | 'declining')[]
  minSignalCount: number
  defaultAgeRange: [number, number]
  revenueRange: [number, number]
  hasViolations: boolean | null
}

export const initialFilters: AdvancedFilterState = {
  healthGrades: [],
  statuses: [],
  signalTypes: [],
  sentimentTrends: [],
  minSignalCount: 0,
  const [localFilters, set
  const handleApply = () => {
    setOpen(false)



    setLocalFilters(prev => ({
      healthGrades: prev.healthGrades.includes(grade)
        : [...prev.healthGr
 

      ...prev,
        ? prev.statuses.filter(s => s !==
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

  const toggleSentimentTrend = (trend: 'improving' | 'stable' | 'declining') => {
    setLocalFilters(prev => ({
      ...prev,
      sentimentTrends: prev.sentimentTrends.includes(trend)
        ? prev.sentimentTrends.filter(t => t !== trend)
        : [...prev.sentimentTrends, trend]
    }))
  }

          
              {(['A', 'B', 'C', 'D', 'F'] as H
                  key={grade
                  size="sm"
                  className={localFilters.healthGrades.includes(gra
                  {grade}
              ))}
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mt-2">
             
                  variant={localF
                  on
            
                <
            </div>

            <Label cl
              {(['hiring', 'permit', 'contract', 'expansion', 'equipment']
                  key={type}
                  size="sm"
                  className={
                  {typ
        
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex flex-wrap gap-2 mt-2">
                  variant={localFilters.sentimentTrends.includes(trend) ? 
                  onCli
                >
                </Button>
            </div>

                  className={localFilters.healthGrades.includes(grade) ? '' : 'glass-effect border-white/30 text-white'}
                >
              max={10}
              className="
          </div>
            </div>
          </div>

          <div>
              step={1}
            <div className="flex flex-wrap gap-2 mt-2">
              {(['new', 'claimed', 'contacted', 'qualified', 'dead'] as ProspectStatus[]).map(status => (
                <Button
                  key={status}
                  variant={localFilters.statuses.includes(status) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleStatus(status)}
                  className={localFilters.statuses.includes(status) ? 'capitalize' : 'glass-effect border-white/30 text-white capitalize'}
                >
                  {status}
                </Button>
              ))}
              clas
          </div>

          <div>
            <Label className="text-white">Signal Types</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {(['hiring', 'permit', 'contract', 'expansion', 'equipment'] as SignalType[]).map(type => (
                <Button
                  key={type}
                  variant={localFilters.signalTypes.includes(type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSignalType(type)}
                  className={localFilters.signalTypes.includes(type) ? 'capitalize' : 'glass-effect border-white/30 text-white capitalize'}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-white">Sentiment Trends</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {(['improving', 'stable', 'declining'] as const).map(trend => (
                <Button
                  key={trend}
                  variant={localFilters.sentimentTrends.includes(trend) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSentimentTrend(trend)}
                  className={localFilters.sentimentTrends.includes(trend) ? 'capitalize' : 'glass-effect border-white/30 text-white capitalize'}
                >
                  {trend}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-white">Minimum Signal Count: {localFilters.minSignalCount}</Label>
            <Slider
              value={[localFilters.minSignalCount]}
              onValueChange={(val) => setLocalFilters(prev => ({ ...prev, minSignalCount: val[0] }))}
              max={10}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white">
              Default Age Range: {localFilters.defaultAgeRange[0]} - {localFilters.defaultAgeRange[1]} years
            </Label>
            <Slider
              value={localFilters.defaultAgeRange}
              onValueChange={(val) => setLocalFilters(prev => ({ ...prev, defaultAgeRange: [val[0], val[1]] }))}
              max={7}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white">
              Revenue Range: ${(localFilters.revenueRange[0] / 1000000).toFixed(1)}M - ${(localFilters.revenueRange[1] / 1000000).toFixed(1)}M
            </Label>
            <Slider
              value={localFilters.revenueRange}
              onValueChange={(val) => setLocalFilters(prev => ({ ...prev, revenueRange: [val[0], val[1]] }))}
              max={10000000}
              step={100000}
              className="mt-2"
            />
          </div>

          <div>

            <div className="flex flex-wrap gap-2 mt-2">

                variant={localFilters.hasViolations === null ? 'default' : 'outline'}

                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: null }))}
                className={localFilters.hasViolations === null ? '' : 'glass-effect border-white/30 text-white'}
              >
                Any
              </Button>
              <Button
                variant={localFilters.hasViolations === false ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: false }))}
                className={localFilters.hasViolations === false ? '' : 'glass-effect border-white/30 text-white'}
              >

              </Button>

                variant={localFilters.hasViolations === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: true }))}
                className={localFilters.hasViolations === true ? '' : 'glass-effect border-white/30 text-white'}
              >

              </Button>

          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleReset} variant="outline" className="flex-1 glass-effect border-white/30 text-white">
              Reset

            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>

        </div>




