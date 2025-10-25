import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { 
  CaretDown, 
  Export, 
  CheckSquare,
  Trash,
  UserPlus
} from '@phosphor-icons/react'
import { Prospect } from '@/lib/types'

interface BatchOperationsProps {
  prospects: Prospect[]
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
  onBatchClaim: (ids: string[]) => void
  onBatchExport: (ids: string[]) => void
  onBatchDelete: (ids: string[]) => void
}

export function BatchOperations({ 
  prospects, 
  selectedIds, 
  onSelectionChange,
  onBatchClaim,
  onBatchExport,
  onBatchDelete
}: BatchOperationsProps) {
  const allIds = prospects.map(p => p.id)
  const isAllSelected = allIds.length > 0 && allIds.every(id => selectedIds.has(id))
  const isSomeSelected = selectedIds.size > 0 && !isAllSelected

  const handleToggleAll = () => {
    if (isAllSelected) {
      onSelectionChange(new Set())
    } else {
      onSelectionChange(new Set(allIds))
    }
  }

  const handleBatchAction = (action: 'claim' | 'export' | 'delete') => {
    const ids = Array.from(selectedIds)
    switch (action) {
      case 'claim':
        onBatchClaim(ids)
        break
      case 'export':
        onBatchExport(ids)
        break
      case 'delete':
        onBatchDelete(ids)
        break
    }
    onSelectionChange(new Set())
  }

  if (prospects.length === 0) return null

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isAllSelected || (isSomeSelected ? 'indeterminate' : false)}
          onCheckedChange={handleToggleAll}
        />
        <span className="text-sm text-muted-foreground">
          {selectedIds.size > 0 ? `${selectedIds.size} selected` : 'Select all'}
        </span>
      </div>

      {selectedIds.size > 0 && (
        <>
          <Badge variant="secondary" className="ml-2">
            {selectedIds.size} prospects
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Batch Actions
                <CaretDown size={14} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleBatchAction('claim')}>
                <UserPlus size={16} className="mr-2" />
                Claim Selected ({selectedIds.size})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBatchAction('export')}>
                <Export size={16} className="mr-2" />
                Export Selected ({selectedIds.size})
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleBatchAction('delete')}
                className="text-destructive"
              >
                <Trash size={16} className="mr-2" />
                Remove Selected ({selectedIds.size})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  )
}
