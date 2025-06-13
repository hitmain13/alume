import { api } from '@/lib/api'
import { Simulation, SimulationRequest, SimulationFilters, ApiError } from '@/types'
import { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react'
import { toast } from 'sonner'

interface SimulationContextType {
  simulations: Simulation[]
  isLoading: boolean
  filters: SimulationFilters
  createSimulation: (data: SimulationRequest) => Promise<Simulation>
  loadSimulations: (page?: number) => Promise<void>
  deleteSimulation: (id: number) => Promise<void>
  setFilters: (filters: SimulationFilters) => void
  clearFilters: () => void
  getSimulationById: (id: number) => Promise<Simulation>
  refreshSimulations: () => Promise<void>
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined)

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState<SimulationFilters>({})
  const filtersRef = useRef(filters)

  filtersRef.current = filters

  const loadSimulations = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.getDashboardSummary()
      setSimulations(response)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || 'Erro ao carregar simulações. Tente novamente.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createSimulation = async (data: SimulationRequest): Promise<Simulation> => {
    try {
      setIsLoading(true)
      const simulation = await api.createSimulation(data)
      toast.success('Simulação criada com sucesso!')
      await loadSimulations()
      return simulation
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || 'Erro ao criar simulação. Tente novamente.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSimulation = async (id: number) => {
    try {
      setIsLoading(true)
      await api.deleteSimulation(id)
      toast.success('Simulação excluída com sucesso!')
      await loadSimulations()
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || 'Erro ao excluir simulação. Tente novamente.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getSimulationById = async (id: number): Promise<Simulation> => {
    try {
      setIsLoading(true)
      return await api.getSimulationById(id)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || 'Erro ao carregar simulação. Tente novamente.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const clearFilters = () => {
    setFilters({})
    loadSimulations()
  }

  const refreshSimulations = useCallback(async () => {
    await loadSimulations()
  }, [loadSimulations])

  return (
    <SimulationContext.Provider
      value={{
        simulations,
        isLoading,
        filters,
        createSimulation,
        loadSimulations,
        deleteSimulation,
        setFilters,
        clearFilters,
        getSimulationById,
        refreshSimulations,
      }}
    >
      {children}
    </SimulationContext.Provider>
  )
}

export function useSimulations() {
  const context = useContext(SimulationContext)
  if (!context) {
    throw new Error('useSimulations deve ser usado dentro de um SimulationProvider')
  }
  return context
}
