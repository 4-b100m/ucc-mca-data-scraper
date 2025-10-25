import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/com
import { Label } from '@/compo
import { Checkbox } from '@/components/ui/check
import { FunnelSimple, X } from '@phosphor-ic

  healthGrades: HealthGrade[]
  statuses: ProspectStatus[]
  defaultAgeRange: [number, number]
import { HealthGrade, SignalType, ProspectStatus } from '@/lib/types'

export interface AdvancedFilterState {
  healthGrades: HealthGrade[]
  signalTypes: SignalType[]
  statuses: ProspectStatus[]
  revenueRange: [number, number]
  defaultAgeRange: [number, number]
  minSignalCount: number
  sentimentTrends: ('improving' | 'stable' | 'declining')[]
  hasViolations: boolean | null
}

interface AdvancedFiltersProps {
  filters: AdvancedFilterState
  onFiltersChange: (filters: AdvancedFilterState) => void
  activeFilterCount: number
}

const initialFilters: AdvancedFilterState = {
  healthGrades: [],
  signalTypes: [],
  statuses: [],
  revenueRange: [0, 10000000],
  defaultAgeRange: [0, 7],
  minSignalCount: 0,
  sentimentTrends: [],
  hasViolations: null
}

export function AdvancedFilters({ filters, onFiltersChange, activeFilterCount }: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  const handleApply = () => {
    onFiltersChange(localFilters)
    setOpen(false)
  }

  const handleReset = () => {
    setLocalFilters(initialFilters)
    onFiltersChange(initialFilters)
    setOpen(false)
  }

  const toggleHealthGrade = (grade: HealthGrade) => {
    setLocalFilters(prev => ({
      ...prev,
      signalTypes: prev.signalTypes.includes(type)
        : [...prev.signalTypes, type]
  }
  const
   

    }))

    setLocalFi
      sentimentTrends: prev.sentimentTrends.includ
        : [...prev.sentimentTrends, trend]
  }
  retur
   

          {activeFilterCount > 0 && (
              {activeFilterCou
          )}
      </SheetTrigger>
        <SheetHeader>
          <SheetDescription>
       


            <div className="flex flex-wrap gap-2">
                <Button
              
                  onClick={() => toggleHealthGrade(grade)}
                  Grade {grade}
              ))}
       
   

          
                    id={`status-${status}`}
                    onChecke
                  <label
                    className="text-sm font-medium le
                    {statu
                </div>
            </div>

            <Label>G
            
                 
                  siz
                  className="capitalize"
                  {ty
              ))}
          </div>
          <div className="space-y-3">
            <div className="f
                <Butto

                  onClick={() => toggleS
                >
                </Button>
            </div>

            <Label>Mini
              <Slider
                onValueChange={([val]) => setLocalFilters(prev => ({ ...prev, minSignalCount:
                step={1}
              />
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

              <Button
                variant={localFilters.hasViolations === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: prev.hasViolations === true ? null : true }))}
              >
                Has Violations
              </Button>



















