import { useState } from 'react'
import {
  SheetC
  SheetContent,
  SheetDescription,
  SheetHeader,
import { Butt
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

  statuses: ProspectStatus[]
  statuses: [],
  sentimentTrends: ('improving' | 'stable' | 'declining')[]
  minSignalCount: 0,
  defaultAgeRange: [number, number]
  hasViolations: null
  hasViolations: boolean | null
i

  activeFilterCount: number
  healthGrades: [],
export function
  signalTypes: [],
  sentimentTrends: [],
  minSignalCount: 0,
    setOpen(false)
  revenueRange: [0, 10000000],
  const handleReset =
}

interface AdvancedFiltersProps {
  filters: AdvancedFilterState
  onFiltersChange: (filters: AdvancedFilterState) => void
        ? prev.healthGrades
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
  }

  const toggleHealthGrade = (grade: HealthGrade) => {
    setLocalFilters(prev => ({
              
                  onClick={() => toggleHealthGrade(gr
                >
                </Button>
       


              {(['new', 'claimed', 'contacted', 'qua
                  <Checkbox
              
                    className="glass-effect bo
                  <label
                    className="text-
       
   


            <Label className="
              
                  key={type}
                  size="sm"
                  className={`capital
       
   

          <div className="space-y-3">
            <div className="fl
              
                  variant={localFilters.sentimentTrends.inc
                  onClick={() => toggleSentimentTrend(t
                >
       
   

          
              <Slider
                onValueChang
                step={1}
              />
                {localFilt
            </div>

            <Label className="tex
              <Slide
            
                s
                minSt
              <Badge variant="outline" className="font-mono whitespace-nowrap border-white/30">
              </Badge
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
                value={localF
                max={1
                className="flex-1"
              />
                ${(localFilters.revenueRange[0] / 1000000).toF
            </div>

            <Label clas
              <Button
                size="sm"
                className={
                No Violations
              <Button
                s
                className
                Has Viola
            </div
            </div>
            <But

              Apply Filters
          </div>
            <div className="space-y-2">
              {(['new', 'claimed', 'contacted', 'qualified', 'dead'] as ProspectStatus[]).map(status => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={localFilters.statuses.includes(status)}
                    onCheckedChange={() => toggleStatus(status)}
                    className="glass-effect border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor={`status-${status}`}
                    className="text-sm font-medium leading-none capitalize cursor-pointer text-white"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white">Growth Signal Types</Label>
            <div className="flex flex-wrap gap-2">
              {(['hiring', 'permit', 'contract', 'expansion', 'equipment'] as SignalType[]).map(type => (
                <Button
                  key={type}
                  variant={localFilters.signalTypes.includes(type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSignalType(type)}
                  className={`capitalize ${localFilters.signalTypes.includes(type) ? '' : 'glass-effect border-white/30'}`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white">Sentiment Trend</Label>
            <div className="flex flex-wrap gap-2">
              {(['improving', 'stable', 'declining'] as const).map(trend => (
                <Button
                  key={trend}
                  variant={localFilters.sentimentTrends.includes(trend) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSentimentTrend(trend)}
                  className={`capitalize ${localFilters.sentimentTrends.includes(trend) ? '' : 'glass-effect border-white/30'}`}
                >
                  {trend}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white">Minimum Growth Signals</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[localFilters.minSignalCount]}
                onValueChange={([val]) => setLocalFilters(prev => ({ ...prev, minSignalCount: val }))}
                max={10}
                step={1}
                className="flex-1"
              />
              <Badge variant="outline" className="font-mono border-white/30">
                {localFilters.minSignalCount}+
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white">Default Age (Years)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={localFilters.defaultAgeRange}
                onValueChange={(val) => setLocalFilters(prev => ({ ...prev, defaultAgeRange: val as [number, number] }))}
                max={10}
                step={1}
                className="flex-1"
                minStepsBetweenThumbs={1}
              />
              <Badge variant="outline" className="font-mono whitespace-nowrap border-white/30">
                {localFilters.defaultAgeRange[0]}-{localFilters.defaultAgeRange[1]}y
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white">Estimated Revenue Range</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={localFilters.revenueRange}
                onValueChange={(val) => setLocalFilters(prev => ({ ...prev, revenueRange: val as [number, number] }))}
                max={10000000}
                step={100000}
                className="flex-1"
                minStepsBetweenThumbs={1}
              />
              <Badge variant="outline" className="font-mono whitespace-nowrap border-white/30 text-xs sm:text-sm">
                ${(localFilters.revenueRange[0] / 1000000).toFixed(1)}M-${(localFilters.revenueRange[1] / 1000000).toFixed(1)}M
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white">Violations</Label>
            <div className="flex gap-2">
              <Button
                variant={localFilters.hasViolations === false ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: prev.hasViolations === false ? null : false }))}
                className={localFilters.hasViolations === false ? '' : 'glass-effect border-white/30'}
              >
                No Violations
              </Button>
              <Button
                variant={localFilters.hasViolations === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: prev.hasViolations === true ? null : true }))}
                className={localFilters.hasViolations === true ? '' : 'glass-effect border-white/30'}
              >
                Has Violations
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-white/20">
            <Button onClick={handleReset} variant="outline" className="flex-1 glass-effect border-white/30">
              Reset
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>




