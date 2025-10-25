import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowUp, ArrowDown, ListNumbers } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export type SortField = 'priorityScore' | 'healthScore' | 'signalCount' | 'defaultAge' | 'companyName'
export type SortDirection = 'asc' | 'desc'

interface SortControlsProps {
  sortField: SortField
  sortDirection: SortDirection
  onSortChange: (field: SortField, direction: SortDirection) => void
}

export function SortControls({ sortField, sortDirection, onSortChange }: SortControlsProps) {
  const toggleDirection = () => {
    onSortChange(sortField, sortDirection === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="flex items-center gap-2">
      <ListNumbers size={16} className="text-muted-foreground" />
      <Select value={sortField} onValueChange={(val) => onSortChange(val as SortField, sortDirection)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="priorityScore">Priority Score</SelectItem>
          <SelectItem value="healthScore">Health Score</SelectItem>
          <SelectItem value="signalCount">Growth Signals</SelectItem>
          <SelectItem value="defaultAge">Default Age</SelectItem>
          <SelectItem value="companyName">Company Name</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" onClick={toggleDirection}>
        {sortDirection === 'desc' ? (
          <ArrowDown size={16} weight="bold" />
        ) : (
          <ArrowUp size={16} weight="bold" />
        )}
      </Button>
    </div>
  )
}
