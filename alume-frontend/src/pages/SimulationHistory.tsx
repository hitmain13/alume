import { Layout } from '@/components/layout/layout'
import { SimulationCard } from '@/components/simulation/simulation-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { useSimulations } from '@/contexts/simulation-context'
import { SimulationFilters } from '@/types'
import { Filter, ChevronDown, Search, RotateCcw, FileText, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SimulationHistory() {
  const {
    simulations,
    isLoading,
    pagination,
    filters,
    loadSimulations,
    deleteSimulation,
    setFilters,
    clearFilters,
  } = useSimulations()

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<SimulationFilters>({})

  useEffect(() => {
    loadSimulations(1)
  }, [loadSimulations])

  const handleFilterChange = (key: keyof SimulationFilters, value: string | number | undefined) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }))
  }

  const applyFilters = () => {
    setFilters(localFilters)
    loadSimulations(1)
  }

  const handleClearFilters = () => {
    setLocalFilters({})
    clearFilters()
  }

  const handlePageChange = (page: number) => {
    loadSimulations(page)
  }

  const handleDelete = async (id: number) => {
    await deleteSimulation(id)
    if (simulations.length === 1 && pagination.page > 1) {
      loadSimulations(pagination.page - 1)
    } else {
      loadSimulations(pagination.page)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Histórico de Simulações</h1>
            <p className="text-gray-600 mt-2">Visualize e gerencie suas simulações anteriores</p>
          </div>
          <Button asChild>
            <Link to="/simulation/new">
              <Plus className="w-4 h-4 mr-2" />
              Nova Simulação
            </Link>
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Filtros</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <Filter className="w-4 h-4 mr-2" />
                  {isFilterOpen ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform ${
                      isFilterOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minValue">Valor Mínimo</Label>
                  <Input
                    id="minValue"
                    type="number"
                    placeholder="R$ 0,00"
                    value={localFilters.minValue || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        'minValue',
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxValue">Valor Máximo</Label>
                  <Input
                    id="maxValue"
                    type="number"
                    placeholder="R$ 0,00"
                    value={localFilters.maxValue || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        'maxValue',
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minInstallments">Parcelas Mínimas</Label>
                  <Input
                    id="minInstallments"
                    type="number"
                    placeholder="0"
                    value={localFilters.minInstallments || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        'minInstallments',
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxInstallments">Parcelas Máximas</Label>
                  <Input
                    id="maxInstallments"
                    type="number"
                    placeholder="0"
                    value={localFilters.maxInstallments || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        'maxInstallments',
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handleClearFilters}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Limpar Filtros
                </Button>
                <Button onClick={applyFilters}>
                  <Search className="w-4 h-4 mr-2" />
                  Aplicar Filtros
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>

        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-32" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : simulations.length > 0 ? (
            simulations.map((simulation) => (
              <SimulationCard
                key={simulation.id}
                simulation={simulation}
                onDelete={() => handleDelete(simulation.id)}
                showActions={true}
              />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma simulação encontrada
                </h3>
                <p className="text-gray-600 mb-4">
                  {Object.keys(filters).length > 0
                    ? 'Tente ajustar os filtros ou criar uma nova simulação'
                    : 'Crie sua primeira simulação para começar'}
                </p>
                <Button asChild>
                  <Link to="/simulation/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Simulação
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {!isLoading && simulations.length > 0 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(pagination.page - 1)}
                    className={pagination.page === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {Array.from({ length: Math.ceil(pagination.total / pagination.perPage) }).map(
                  (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => handlePageChange(i + 1)}
                        isActive={pagination.page === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(pagination.page + 1)}
                    className={
                      pagination.page === Math.ceil(pagination.total / pagination.perPage)
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </Layout>
  )
}
