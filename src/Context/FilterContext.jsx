import { createContext, useState, useContext, useEffect } from 'react'

const FilterContext = createContext()

export function FilterProvider({ children }) {
    const [allProjects, setAllProjects] = useState([])
    const [sortedProjects, setSortedProjects] = useState([])
    const [sortBy, setSortBy] = useState('newest')
    const [filters, setFilters] = useState({ tags: [], roles: [] })
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('http://155.212.247.183:5000/api/projects')
                const data = await res.json()

                setAllProjects(data)
                setSortedProjects(data)
            } catch (err) {
                console.error('Ошибка загрузки проектов:', err)
            }
        }

        fetchProjects()
    }, [])

    const applyFiltersAndSort = (newSortBy, newFilters) => {
        let result = [...allProjects]

        if (newFilters.tags.length > 0) {
            result = result.filter(project =>
                newFilters.tags.some(tag =>
                    project.tags?.includes(tag)
                )
            )
        }

        if (newFilters.roles.length > 0) {
            result = result.filter(project =>
                newFilters.roles.some(role =>
                    project.required_roles?.includes(role)
                )
            )
        }

        if (searchQuery.trim()) {
            result = result.filter(project =>
                project.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        switch (newSortBy) {
            case 'newest':
                result.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                )
                break
            case 'oldest':
                result.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                )
                break
            case 'alphabetical':
                result.sort((a, b) => a.name.localeCompare(b.name))
                break
            default:
                break
        }

        setSortedProjects(result)
        setSortBy(newSortBy)
        setFilters(newFilters)
    }

    const handleSortChange = (newSort) => {
        applyFiltersAndSort(newSort, filters)
    }

    const handleFilterChange = (newFilters) => {
        applyFiltersAndSort(sortBy, newFilters)
    }

    const clearAll = () => {
        applyFiltersAndSort('newest', { tags: [], roles: [] })
    }

    return (
        <FilterContext.Provider
            value={{
                sortedProjects,
                sortBy,
                filters,
                searchQuery,
                setSearchQuery,
                handleSortChange,
                handleFilterChange,
                clearAll,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => useContext(FilterContext)
