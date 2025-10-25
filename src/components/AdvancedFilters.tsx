import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import {
  SheetContent,
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Funnel } from '@phosphor-icons/react'
import { HealthGrade, SignalType, ProspectStatus } from '@/lib/types'

export interface AdvancedFilterState {
  minSignalCount: number
  revenueRange: [number, num
}
export const initialFilters: AdvancedFilterState = {
  statuses: [],
  sentimentTrends: [],
  defaultAgeRange: [0, 7],
  hasViolations: null


  activeFilterCount: number

  const [open, 

    onFiltersChange(lo
  }
  const handleReset = () =
  }
  const toggleHealthG
 

    }))

    setLocalFilters(prev => ({
      statuses: prev.status
 

  const toggleSignalType = (type: SignalType) => {
      ...prev,
        ? prev.signalTypes.filter(t => t !== type)


    setLocalFilters(prev => ({
      sentimentTre
   

  return (
      <SheetTrigger asChild>
   

              {activeFilterCount}
          )}
      </SheetT
        <SheetHeader>
          <SheetDescription className="text-white/70
          </SheetDescription>

   

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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="glass-effect border-white/30 text-white hover:bg-white/10 relative">
          <Funnel size={18} weight="fill" className="mr-2" />
          Advanced Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="glass-effect border-white/30 overflow-y-auto w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-white">Advanced Filters</SheetTitle>
          <SheetDescription className="text-white/70">
            Refine your prospect search with detailed criteria
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
              {
            <Label className="text-white">Health Grade</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {(['A', 'B', 'C', 'D', 'F'] as HealthGrade[]).map(grade => (
                <Button
                  key={grade}
                  size="sm"
                  variant={localFilters.healthGrades.includes(grade) ? 'default' : 'outline'}
                  onClick={() => toggleHealthGrade(grade)}
                  className={localFilters.healthGrades.includes(grade) ? '' : 'glass-effect border-white/30 text-white'}
                >
                  {grade}
                </Button>
              ))}
            </div>
          </div>

          <div>
              min={0}
              step={1}
            />

            <Label className="
              value={localF
              min={0}
              step={1}
            />

            <Label classNa
              value={loca
              min
              step
            />

            <La
              <Button
                variant={localFilters.hasViolations ===
                className={localFilters.hasViolations === null ? '' : 'glass-effect border-white/30 text-
                Any
              <Button
                variant={lo
                className={localFilters.hasViolations === false ? '' : 'glass-effect border
                Clean Record
              <Button
                v
                classNam
                Has Viola
            </div

            <But

              A
          </div>
      </SheetContent>
  )




























































































