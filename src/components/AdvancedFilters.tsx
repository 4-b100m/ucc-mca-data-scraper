import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { FunnelSimple } from '@phosphor-icons/react'
import { HealthGrade, ProspectStatus, SignalType } from '@/lib/types'

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
  defaultAgeRange: [0, 7],
  revenueRange: [0, 10000000],
  hasViolations: null
}

interface AdvancedFiltersProps {
  filters: AdvancedFilterState
  onFiltersChange: (filters: AdvancedFilterState) => void
  activeFilterCount: number
}

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

  const toggleSentimentTrend = (trend: 'improving' | 'stable' | 'declining') => {
    setLocalFilters(prev => ({
      ...prev,
      sentimentTrends: prev.sentimentTrends.includes(trend)
        ? prev.sentimentTrends.filter(t => t !== trend)
        : [...prev.sentimentTrends, trend]
    }))
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="glass-effect border-white/30 text-white relative">
          <FunnelSimple size={16} weight="fill" className="mr-2" />
          Advanced Filters
          {activeFilterCount > 0 && (
            <Badge 
              variant="default" 
              className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="glass-effect border-white/30 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-white">Advanced Filters</SheetTitle>
          <SheetDescription className="text-white/70">
            Refine your prospect search with detailed criteria
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          <div>
            <Label className="text-white">Health Grades</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {(['A', 'B', 'C', 'D', 'F'] as HealthGrade[]).map(grade => (
                <Button
                  key={grade}
                  variant={localFilters.healthGrades.includes(grade) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleHealthGrade(grade)}
                  className={localFilters.healthGrades.includes(grade) ? '' : 'glass-effect border-white/30 text-white'}
                >
                  {grade}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-white">Lead Status</Label>
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
            </div>
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
            <Label className="text-white">Violations</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button
                variant={localFilters.hasViolations === null ? 'default' : 'outline'}
                size="sm"
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
                No Violations
              </Button>
              <Button
                variant={localFilters.hasViolations === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: true }))}
                className={localFilters.hasViolations === true ? '' : 'glass-effect border-white/30 text-white'}
              >
                Has Violations
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleReset} variant="outline" className="flex-1 glass-effect border-white/30 text-white">
              Reset
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
