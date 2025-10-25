import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  MagnifyingGlass,
  FunnelSimple
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
  }, [])

  const stats = generateDashboardStats(prospects || [], portfolio || [])

  const handleProspectSelect = (prospect: Prospect) => {
    setSelectedProspect(prospect)
    setDialogOpen(true)
  }

  const handleClaimLead = (prospect: Prospect) => {
    setProspects((currentProspects) => {
      if (!currentProspects) return []
      return currentProspects.map(p =>
        p.id === prospect.id
          ? { ...p, status: 'claimed', claimedBy: 'Current User', claimedDate: new Date().toISOString().split('T')[0] }
          : p
      )
    })
    setSelectedProspect(null)
    setDialogOpen(false)
    toast.success('Lead claimed successfully', {
      description: `${prospect.companyName} has been added to your pipeline.`
    })
  }

  const filteredProspects = (prospects || []).filter(p => {
    const matchesSearch = p.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = industryFilter === 'all' || p.industry === industryFilter
    const matchesState = stateFilter === 'all' || p.state === stateFilter
    const matchesScore = p.priorityScore >= minScore
    return matchesSearch && matchesIndustry && matchesState && matchesScore
  })

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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <StatsOverview stats={stats} />

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
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredProspects.length} of {(prospects || []).length} prospects
                  </div>
                  <Button variant="outline" size="sm">
                    <FunnelSimple size={16} className="mr-2" />
                    Advanced Filters
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProspects.map(prospect => (
                    <ProspectCard
                      key={prospect.id}
                      prospect={prospect}
                      onSelect={handleProspectSelect}
                    />
                  ))}
                </div>

                {filteredProspects.length === 0 && (
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
      />
    </div>
  )
}

export default App
