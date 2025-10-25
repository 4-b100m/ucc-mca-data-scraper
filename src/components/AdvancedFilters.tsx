import { useState } from 'react'
import { Label } from '@/components/ui/label'
import {
  SheetContent,
  SheetH
  SheetT
import { Checkb
import { HealthGrad
export interfa
  statuses: P
  sentimentTre
  defaultAgeRange: [number, nu
  hasViolations: boolean | null

  healthGrades: [],

  minSignalCount: 0,
  revenueRange: [0, 10000000]
}
interface AdvancedFiltersPr
  onFiltersChange: (filters: AdvancedFilterState) => void
}
export function AdvancedFilters({ f
  const [localFilters, setLocalF
  const handleApply = () => {
 

    setLocalFilters(initialFilters)

    setLocalFil
      healthGrades
        : [...prev.hea
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

            <span className="absolute -top-1 -right-
            </span>
        </Butt
      <SheetContent className="glass-effect bo
          <SheetTitle className="text-white">Adva
            Refine your prospect sea
       
   

                <Button
                  variant={loc
              
                >
                </Button>
            </div>

   

                  key={status}
                  size="sm"
              
                  {status}
              ))}
          </div>
       
   

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="glass-effect border-white/30 text-white relative h-10 sm:h-11">
          <FunnelSimple size={16} weight="bold" className="mr-2" />
          Advanced Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
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
            <La
            <Label className="text-white">Health Grades</Label>
              onValueChange={(val) => setLocalFilters(p
              {(['A', 'B', 'C', 'D', 'F'] as HealthGrade[]).map(grade => (
                <Button
                  key={grade}
                  variant={localFilters.healthGrades.includes(grade) ? 'default' : 'outline'}
              className="mt
                  onClick={() => toggleHealthGrade(grade)}
                  className={localFilters.healthGrades.includes(grade) ? '' : 'glass-effect border-white/30 text-white'}
              cla
                  {grade}

              ))}
            <div c
                

               
            <Label className="text-white">Status</Label>
              <Button
                size="sm"
                classNa
                Has Violations
            </div>

            <Button onClick={handleReset} variant="out
            </Button>
              App
          </div>
      </SheetContent>
  )
            </div>










































































            <Label className="text-white">Violations</Label>

              <Button

                size="sm"











                No Violations

              <Button





                Has Violations

            </div>





            </Button>



          </div>

      </SheetContent>
    </Sheet>
  )
}
