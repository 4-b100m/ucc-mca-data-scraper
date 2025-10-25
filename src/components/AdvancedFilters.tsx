import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
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
    onFiltersChange(initialFilters)
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
        <Button variant="outline" className="relative">
          <FunnelSimple size={18} weight="bold" className="mr-2" />
          Advanced Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Refine your prospect search with advanced filtering options
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <Label>Health Grade</Label>
            <div className="flex flex-wrap gap-2">
              {(['A', 'B', 'C', 'D', 'F'] as HealthGrade[]).map(grade => (
                <Button
                  key={grade}
                  variant={localFilters.healthGrades.includes(grade) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleHealthGrade(grade)}
                >
                  Grade {grade}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Prospect Status</Label>
            <div className="space-y-2">
              {(['new', 'claimed', 'contacted', 'qualified', 'dead'] as ProspectStatus[]).map(status => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={localFilters.statuses.includes(status)}
                    onCheckedChange={() => toggleStatus(status)}
                  />
                  <label
                    htmlFor={`status-${status}`}
                    className="text-sm font-medium leading-none capitalize cursor-pointer"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Growth Signal Types</Label>
            <div className="flex flex-wrap gap-2">
              {(['hiring', 'permit', 'contract', 'expansion', 'equipment'] as SignalType[]).map(type => (
                <Button
                  key={type}
                  variant={localFilters.signalTypes.includes(type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSignalType(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Sentiment Trend</Label>
            <div className="flex flex-wrap gap-2">
              {(['improving', 'stable', 'declining'] as const).map(trend => (
                <Button
                  key={trend}
                  variant={localFilters.sentimentTrends.includes(trend) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSentimentTrend(trend)}
                  className="capitalize"
                >
                  {trend}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Minimum Growth Signals</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[localFilters.minSignalCount]}
                onValueChange={([val]) => setLocalFilters(prev => ({ ...prev, minSignalCount: val }))}
                max={10}
                step={1}
                className="flex-1"
              />
              <Badge variant="outline" className="font-mono">
                {localFilters.minSignalCount}+
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Default Age (Years)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={localFilters.defaultAgeRange}
                onValueChange={(val) => setLocalFilters(prev => ({ ...prev, defaultAgeRange: val as [number, number] }))}
                max={10}
                step={1}
                className="flex-1"
                minStepsBetweenThumbs={1}
              />
              <Badge variant="outline" className="font-mono whitespace-nowrap">
                {localFilters.defaultAgeRange[0]}-{localFilters.defaultAgeRange[1]}y
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Estimated Revenue Range</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={localFilters.revenueRange}
                onValueChange={(val) => setLocalFilters(prev => ({ ...prev, revenueRange: val as [number, number] }))}
                max={10000000}
                step={100000}
                className="flex-1"
                minStepsBetweenThumbs={1}
              />
              <Badge variant="outline" className="font-mono whitespace-nowrap">
                ${(localFilters.revenueRange[0] / 1000000).toFixed(1)}M-${(localFilters.revenueRange[1] / 1000000).toFixed(1)}M
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Violations</Label>
            <div className="flex gap-2">
              <Button
                variant={localFilters.hasViolations === false ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: prev.hasViolations === false ? null : false }))}
              >
                No Violations
              </Button>
              <Button
                variant={localFilters.hasViolations === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: prev.hasViolations === true ? null : true }))}
              >
                Has Violations
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={handleReset} variant="outline" className="flex-1">
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
