import { SimulationFilters } from '@/components/simulation/simulation-filters'
import { SimulationForm } from '@/components/simulation/simulation-form'
import { SimulationList } from '@/components/simulation/simulation-list'
import { useAuth } from '@/contexts/auth-context'
import { useSimulations } from '@/contexts/simulation-context'
import { Simulation, SimulationRequest, SimulationFilters as SimulationFiltersType } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function SimulationsPage() {
  const { student } = useAuth()
  const {
    simulations,
    isLoading,
    pagination,
    filters,
    createSimulation,
    loadSimulations,
    deleteSimulation,
    setFilters,
    clearFilters,
  } = useSimulations()

  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (student) {
      loadSimulations()
    }
  }, [student, loadSimulations])

  const handleCreateSimulation = async (data: SimulationRequest): Promise<Simulation> => {
    try {
      setIsCreating(true)
      const simulation = await createSimulation(data)
      toast.success('Simulação criada com sucesso!')
      return simulation
    } catch (error) {
      toast.error('Erro ao criar simulação. Tente novamente.')
      throw error
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteSimulation = async (id: number) => {
    try {
      await deleteSimulation(id)
      toast.success('Simulação excluída com sucesso!')
    } catch (error) {
      toast.error('Erro ao excluir simulação. Tente novamente.')
    }
  }

  const handleFilter = (newFilters: SimulationFiltersType) => {
    setFilters(newFilters)
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Simulações</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <SimulationForm onSubmit={handleCreateSimulation} isLoading={isCreating} />
        </div>

        <div>
          <SimulationFilters onFilter={handleFilter} onClear={clearFilters} isLoading={isLoading} />
        </div>
      </div>

      <SimulationList
        simulations={simulations}
        onDelete={handleDeleteSimulation}
        isLoading={isLoading}
      />
    </div>
  )
}
