import { useState, useEffect, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatsOverview } from '@/components/StatsOverview'
import { ProspectCard } from '@/components/ProspectCard'
import { ProspectDetailDialog } from '@/components/ProspectDetailDialog'
import { CompetitorChart } from '@/components/CompetitorChart'
import { PortfolioMonitor } from '@/components/PortfolioMonitor'
import { AdvancedFilters, AdvancedFilterState, initialFilters } from '@/components/AdvancedFilters'
import { StaleDataWarning } from '@/components/StaleDataWarning'
import { BatchOperations } from '@/components/BatchOperations'
import { SortControls, SortField, SortDirection } from '@/components/SortControls'
import { 
  generateProspects, 
  generateCompetitorData, 
  generatePortfolioCompanies,
  generateDashboardStats
} from '@/lib/mockData'
import { Prospect, CompetitorData, PortfolioCompany, IndustryType } from '@/lib/types'
import { 
  Target, 
  ChartBar, 
  Heart, 
  ArrowClockwise,
  MagnifyingGlass
} from '@phosphor-icons/react'
import { toast } from 'sonner'

function App() {
  const [prospects, setProspects, deleteProspects] = useKV<Prospect[]>('ucc-prospects', [])
  const [competitors, setCompetitors] = useKV<CompetitorData[]>('competitor-data', [])
  const [portfolio, setPortfolio] = useKV<PortfolioCompany[]>('portfolio-companies', [])
  
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [stateFilter, setStateFilter] = useState<string>('all')
  const [minScore, setMinScore] = useState<number>(0)
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterState>(initialFilters)
  const [selectedProspectIds, setSelectedProspectIds] = useState<Set<string>>(new Set())
  const [lastDataRefresh, setLastDataRefresh] = useKV<string>('last-data-refresh', new Date().toISOString())
  const [sortField, setSortField] = useState<SortField>('priorityScore')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  useEffect(() => {
    if (!prospects || prospects.length === 0) {
      const initialProspects = generateProspects(24)
      setProspects(initialProspects)
    }
    if (!competitors || competitors.length === 0) {
      const initialCompetitors = generateCompetitorData()
      setCompetitors(initialCompetitors)
    }
    if (!portfolio || portfolio.length === 0) {
      const initialPortfolio = generatePortfolioCompanies(15)
      setPortfolio(initialPortfolio)
    }
  }, [prospects, competitors, portfolio, setProspects, setCompetitors, setPortfolio])

  const stats = generateDashboardStats(prospects || [], portfolio || [])
  
  const handleRefreshData = () => {
    const now = new Date().toISOString()
    setProspects((current) => {
      if (!current || current.length === 0) return []
      return current.map(p => ({
        ...p,
        healthScore: {
          ...p.healthScore,
          lastUpdated: now.split('T')[0]
        }
      }))
    })
    setLastDataRefresh(now)
    toast.success('Data refreshed', {
      description: 'All health scores and signals have been updated.'
    })
  }

  const handleProspectSelect = (prospect: Prospect) => {
    setSelectedProspect(prospect)
    setDialogOpen(true)
  }

  const handleClaimLead = (prospect: Prospect) => {
    const user = 'Current User'
    
    setProspects((currentProspects) => {
      if (!currentProspects) return []
      return currentProspects.map(p =>
        p.id === prospect.id
          ? { 
              ...p, 
              status: 'claimed', 
              claimedBy: user, 
              claimedDate: new Date().toISOString().split('T')[0] 
            }
          : p
      )
    })
    setSelectedProspect(null)
    setDialogOpen(false)
    toast.success('Lead claimed successfully', {
      description: `${prospect.companyName} has been added to your pipeline.`
    })
  }

  const handleUnclaimLead = (prospect: Prospect) => {
    setProspects((currentProspects) => {
      if (!currentProspects) return []
      return currentProspects.map(p =>
        p.id === prospect.id
          ? { 
              ...p, 
              status: 'new', 
              claimedBy: undefined, 
              claimedDate: undefined 
            }
          : p
      )
    })
    toast.info('Lead unclaimed', {
      description: `${prospect.companyName} is now available for claiming.`
    })
  }

  const handleExportProspect = (prospect: Prospect) => {
    exportProspects([prospect])
  }

  const exportProspects = (prospectsToExport: Prospect[]) => {
    const exportData = prospectsToExport.map(prospect => ({
      company: prospect.companyName,
      industry: prospect.industry,
      state: prospect.state,
      priorityScore: prospect.priorityScore,
      healthGrade: prospect.healthScore.grade,
      growthSignals: prospect.growthSignals.length,
      estimatedRevenue: prospect.estimatedRevenue,
      narrative: prospect.narrative,
      status: prospect.status
    }))
    
    const jsonStr = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const filename = prospectsToExport.length === 1
      ? `prospect-${prospectsToExport[0].companyName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`
      : `prospects-batch-${Date.now()}.json`
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Prospect(s) exported', {
      description: `${prospectsToExport.length} lead(s) exported successfully.`
    })
  }

  const handleBatchClaim = (ids: string[]) => {
    const user = 'Current User'
    const now = new Date().toISOString().split('T')[0]
    
    setProspects((currentProspects) => {
      if (!currentProspects) return []
      return currentProspects.map(p =>
        ids.includes(p.id) && p.status !== 'claimed'
          ? { ...p, status: 'claimed', claimedBy: user, claimedDate: now }
          : p
      )
    })
    
    toast.success(`${ids.length} leads claimed`, {
      description: 'Selected leads have been added to your pipeline.'
    })
  }

  const handleBatchExport = (ids: string[]) => {
    const prospectsToExport = (prospects || []).filter(p => ids.includes(p.id))
    exportProspects(prospectsToExport)
  }

  const handleBatchDelete = (ids: string[]) => {
    setProspects((currentProspects) => {
      if (!currentProspects) return []
      return currentProspects.filter(p => !ids.includes(p.id))
    })
    
    toast.info(`${ids.length} prospects removed`, {
      description: 'Selected prospects have been removed from the list.'
    })
  }

  const filteredAndSortedProspects = useMemo(() => {
    const filtered = (prospects || []).filter(p => {
      const matchesSearch = p.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesIndustry = industryFilter === 'all' || p.industry === industryFilter
      const matchesState = stateFilter === 'all' || p.state === stateFilter
      const matchesScore = p.priorityScore >= minScore

      const matchesHealthGrade = advancedFilters.healthGrades.length === 0 || 
        advancedFilters.healthGrades.includes(p.healthScore.grade)
      
      const matchesStatus = advancedFilters.statuses.length === 0 ||
        advancedFilters.statuses.includes(p.status)
      
      const matchesSignalType = advancedFilters.signalTypes.length === 0 ||
        p.growthSignals.some(s => advancedFilters.signalTypes.includes(s.type))
      
      const matchesSentiment = advancedFilters.sentimentTrends.length === 0 ||
        advancedFilters.sentimentTrends.includes(p.healthScore.sentimentTrend)
      
      const matchesSignalCount = p.growthSignals.length >= advancedFilters.minSignalCount
      
      const yearsSinceDefault = Math.floor(p.timeSinceDefault / 365)
      const matchesDefaultAge = yearsSinceDefault >= advancedFilters.defaultAgeRange[0] &&
        yearsSinceDefault <= advancedFilters.defaultAgeRange[1]
      
      const revenue = p.estimatedRevenue || 0
      const matchesRevenue = revenue >= advancedFilters.revenueRange[0] &&
        revenue <= advancedFilters.revenueRange[1]
      
      const matchesViolations = advancedFilters.hasViolations === null ||
        (advancedFilters.hasViolations === true && p.healthScore.violationCount > 0) ||
        (advancedFilters.hasViolations === false && p.healthScore.violationCount === 0)

      return matchesSearch && matchesIndustry && matchesState && matchesScore &&
        matchesHealthGrade && matchesStatus && matchesSignalType && matchesSentiment &&
        matchesSignalCount && matchesDefaultAge && matchesRevenue && matchesViolations
    })

    return filtered.sort((a, b) => {
      let compareValue = 0
      
      switch (sortField) {
        case 'priorityScore':
          compareValue = a.priorityScore - b.priorityScore
          break
        case 'healthScore':
          compareValue = a.healthScore.score - b.healthScore.score
          break
        case 'signalCount':
          compareValue = a.growthSignals.length - b.growthSignals.length
          break
        case 'defaultAge':
          compareValue = a.timeSinceDefault - b.timeSinceDefault
          break
        case 'companyName':
          compareValue = a.companyName.localeCompare(b.companyName)
          break
      }
      
      return sortDirection === 'desc' ? -compareValue : compareValue
    })
  }, [prospects, searchQuery, industryFilter, stateFilter, minScore, advancedFilters, sortField, sortDirection])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (advancedFilters.healthGrades.length > 0) count++
    if (advancedFilters.statuses.length > 0) count++
    if (advancedFilters.signalTypes.length > 0) count++
    if (advancedFilters.sentimentTrends.length > 0) count++
    if (advancedFilters.minSignalCount > 0) count++
    if (advancedFilters.defaultAgeRange[0] > 0 || advancedFilters.defaultAgeRange[1] < 7) count++
    if (advancedFilters.revenueRange[0] > 0 || advancedFilters.revenueRange[1] < 10000000) count++
    if (advancedFilters.hasViolations !== null) count++
    return count
  }, [advancedFilters])

  const industries: IndustryType[] = ['restaurant', 'retail', 'construction', 'healthcare', 'manufacturing', 'services', 'technology']
  const states = Array.from(new Set((prospects || []).map(p => p.state))).sort()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                UCC-MCA Intelligence Platform
              </h1>
              <p className="text-sm text-muted-foreground">
                Automated merchant cash advance opportunity discovery
              </p>
            </div>
            <Button variant="outline" onClick={handleRefreshData}>
              <ArrowClockwise size={18} weight="bold" className="mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <StatsOverview stats={stats} />

          {lastDataRefresh && (
            <StaleDataWarning 
              lastUpdated={lastDataRefresh} 
              onRefresh={handleRefreshData}
            />
          )}

          <Tabs defaultValue="prospects" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="prospects" className="flex items-center gap-2">
                <Target size={18} weight="fill" />
                <span>Prospects</span>
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="flex items-center gap-2">
                <Heart size={18} weight="fill" />
                <span>Portfolio Health</span>
              </TabsTrigger>
              <TabsTrigger value="intelligence" className="flex items-center gap-2">
                <ChartBar size={18} weight="fill" />
                <span>Market Intelligence</span>
              </TabsTrigger>
              <TabsTrigger value="requalification" className="flex items-center gap-2">
                <ArrowClockwise size={18} weight="fill" />
                <span>Re-qualification</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prospects" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <MagnifyingGlass 
                    size={20} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries.map(ind => (
                        <SelectItem key={ind} value={ind} className="capitalize">
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={stateFilter} onValueChange={setStateFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={minScore.toString()} onValueChange={(val) => setMinScore(Number(val))}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Min Score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Score</SelectItem>
                      <SelectItem value="50">50+</SelectItem>
                      <SelectItem value="70">70+ (High)</SelectItem>
                      <SelectItem value="85">85+ (Elite)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {filteredAndSortedProspects.length} of {(prospects || []).length} prospects
                    </div>
                    <SortControls
                      sortField={sortField}
                      sortDirection={sortDirection}
                      onSortChange={(field, direction) => {
                        setSortField(field)
                        setSortDirection(direction)
                      }}
                    />
                  </div>
                  <AdvancedFilters
                    filters={advancedFilters}
                    onFiltersChange={setAdvancedFilters}
                    activeFilterCount={activeFilterCount}
                  />
                </div>

                <BatchOperations
                  prospects={filteredAndSortedProspects}
                  selectedIds={selectedProspectIds}
                  onSelectionChange={setSelectedProspectIds}
                  onBatchClaim={handleBatchClaim}
                  onBatchExport={handleBatchExport}
                  onBatchDelete={handleBatchDelete}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAndSortedProspects.map(prospect => {
                    const isSelected = selectedProspectIds.has(prospect.id)
                    return (
                      <div key={prospect.id} className="relative">
                        <div className="absolute top-4 left-4 z-10">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              const newSelected = new Set(selectedProspectIds)
                              if (checked) {
                                newSelected.add(prospect.id)
                              } else {
                                newSelected.delete(prospect.id)
                              }
                              setSelectedProspectIds(newSelected)
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <ProspectCard
                          prospect={prospect}
                          onSelect={handleProspectSelect}
                        />
                      </div>
                    )
                  })}
                </div>

                {filteredAndSortedProspects.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No prospects match your current filters
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <PortfolioMonitor companies={portfolio || []} />
            </TabsContent>

            <TabsContent value="intelligence" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Competitor Intelligence</h2>
                <p className="text-muted-foreground mb-6">
                  Market analysis of UCC filing activity by secured parties
                </p>
                <CompetitorChart data={competitors || []} />
              </div>
            </TabsContent>

            <TabsContent value="requalification" className="space-y-6">
              <div className="text-center py-12">
                <ArrowClockwise size={48} weight="fill" className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Lead Re-qualification Engine</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Upload dead leads to detect new growth signals and recompute opportunity scores
                </p>
                <Button size="lg">
                  Upload Lead List
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <ProspectDetailDialog
        prospect={selectedProspect}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onClaim={handleClaimLead}
        onUnclaim={handleUnclaimLead}
        onExport={handleExportProspect}
      />
    </div>
  )
}

export default App
