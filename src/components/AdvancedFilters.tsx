import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
import { Butt
import { Slider
import { Checkbox } from '@/co
import { HealthGrade, ProspectStatus, SignalTyp
export interface AdvancedFilterState {
  statuses: ProspectStatus[]
  sentimentTrends: ('improving' | 'stable' | 
  defaultAgeRange: [number, number]
  hasViolations: boolean | null


  signalTypes: [],
  minSignalCount: 0,
  revenueRange: [0, 10000000
}
interface AdvancedFiltersProps {
  onFiltersChange: (filt
}
export function AdvancedFilters(
  const [localFilters, setLocal
 


    setLocalFilters

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
              ))}
            <Label className="text-white">Health Grades</Label>
            <div className="flex flex-wrap gap-2">
              {(['A', 'B', 'C', 'D', 'F'] as HealthGrade[]).map(grade => (
                <Button
                  key={grade}
                  variant={localFilters.healthGrades.includes(grade) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleHealthGrade(grade)}
                  className={localFilters.healthGrades.includes(grade) ? '' : 'glass-effect border-white/30'}
                 
                  {grade}
                </Button>
              ))}
                cl
            <div

                onValueChange={(val) 
            <Label className="text-white">Lead Status</Label>
            </div>

            <Label className="text-white">Violations</Label>
              <Button
                size="sm"
                className={localFilters.hasViolations === false ? ''
                No Violations
              <Button
                size
                classNam
                Has Violations
            </div>

            <Button onClick=
            </Button>
              Apply Fi
          </div>
      </SheetConte
  )




















































































































      </SheetContent>
    </Sheet>
  )
}
