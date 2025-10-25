import { useState } from 'react'
import {
  SheetC
  SheetContent,
} from '@/component
import { Label
import { Slid
import { Funnel

  healthGrades: HealthGrade[]
  statuses: ProspectStatus[]
  defaultAgeRange: [number, number]
  sentimentTrends: ('improving' | 'stable' | 'd
}
export const initialFilters: AdvancedFilterState = {
  signalTypes: [],

  minSignalCount: 0,
  hasViolations: null

  filters: AdvancedFilterSta
  activeFilterCount: number

  const [open, setOpen] 

    onFiltersChange(localFilter
 

    onFiltersChange(initialFilters)
  }
  const toggleHeal
      ...prev,
        ? prev.healthGrades.fi
    }))

    setLocalFilters(pr
      statuses: prev.
 

  const toggleSignalType = (type
      ...prev,
        ? prev.signalTypes.filter(t => t !== type)
    }))


      sentimentTrends: prev.sentimentTrends.includes(trend)
        : [...prev.sentimentTrends, trend
  }

      <SheetTrigger asChild>
          <FunnelSimple size={18}
          {activeF
   

      </SheetTrigger>
        <SheetHeader>
          <SheetDescription>
          </SheetD


            <div className="flex flex-wrap gap-2">
                <Button
              
                  onClick={() => toggleHealthGrade(gr
                  Grade {grade}
              ))}
    }))
   

                <div key={status} className="flex it
                    id={`statu
              
                  <label
                    className="text-sm font-mediu
                    {status}
       
   

            <Label>Growth Signal Types</Label>
              {(['hiring', 'pe
              
                  size="sm"
                  className="capitalize"
                  {type}
       
   

            <div className="flex flex-wrap gap-2">
                <Button
              
                  onClick={() => toggleSentimentTrend(trend
                >
        : [...prev.sentimentTrends, trend]
       
  }

          
                onValueChange={([val]) => setL
                step={1}
              />
                {localFilters.minSignalCount}+
            </div>
          {activeFilterCount > 0 && (
            <Label>Default Age (Years)</Label>
              <Slider
                onVa
          )}
                m
      </SheetTrigger>
              </Badge>
        <SheetHeader>
          <div className="space-y-3">
          <SheetDescription>
                value={localFilters.revenueRange}
                max={10000000
                classN

                ${(localFilters.revenueR
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                <Button
              >
              </Button>
                variant={lo
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

              <Button
                variant={localFilters.hasViolations === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocalFilters(prev => ({ ...prev, hasViolations: prev.hasViolations === true ? null : true }))}
              >
                Has Violations
              </Button>

















