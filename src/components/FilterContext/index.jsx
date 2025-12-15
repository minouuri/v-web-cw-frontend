import { createContext, useState, useContext, useEffect } from 'react'

const FilterContext = createContext()

export function FilterProvider({ children }) {
    const [sortedProjects, setSortedProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [sortBy, setSortBy] = useState('newest')
    const [filters, setFilters] = useState({ tags: [], roles: [] })
    const [searchQuery, setSearchQuery] = useState('');


    const normalizeRoleForComparison = (role) => {
        const lowerRole = role.toLowerCase().trim()
        const roleMapping = {
            'frontend-разработчик': 'frontend-разработчик',
            'frontend разработчик': 'frontend-разработчик',
            'frontend': 'frontend-разработчик',
            'backend-разработчик': 'backend-разработчик',
            'backend разработчик': 'backend-разработчик',
            'backend': 'backend-разработчик',
            'fullstack-разработчик': 'fullstack-разработчик',
            'fullstack разработчик': 'fullstack-разработчик',
            'fullstack': 'fullstack-разработчик',
            'ui/ux дизайнер': 'ui/ux дизайнер',
            'ui/ux': 'ui/ux дизайнер',
            'ux/ui дизайнер': 'ui/ux дизайнер',
            'дизайнер': 'дизайнер',
            'аналитик': 'аналитик',
            'data analyst': 'аналитик',
            'тестировщик': 'тестировщик',
            'qa': 'тестировщик',
            'менеджер проекта': 'менеджер проекта',
            'project manager': 'менеджер проекта',
            'менеджер': 'менеджер проекта',
            'devops': 'devops',
            'data scientist': 'data scientist'
        }
        return roleMapping[lowerRole] || lowerRole
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/projects");
                const data = await res.json();

                setAllProjects(data);
                setSortedProjects(data);
            } catch (err) {
                console.error("Ошибка загрузки проектов:", err);
            }
        };
        fetchProjects();
    }, []);


    const applyFiltersAndSort = (sortType, filterSettings) => {
        let filtered = [...allProjects];

        if (filterSettings.tags.length > 0) {
            filtered = filtered.filter(project =>
                filterSettings.tags.some(filterTag =>
                    project.tags.some(projectTag =>
                        projectTag.toLowerCase().trim() === filterTag.toLowerCase().trim()
                    )
                )
            );
        }

        if (filterSettings.roles.length > 0) {
            filtered = filtered.filter(project => {
                const normalizedProjectRoles = project.required_roles
                    .map(role => normalizeRoleForComparison(role))
                    .filter((role, index, arr) => arr.indexOf(role) === index);

                const normalizedFilterRoles = filterSettings.roles
                    .map(role => normalizeRoleForComparison(role));

                return normalizedFilterRoles.some(filterRole =>
                    normalizedProjectRoles.includes(filterRole)
                );
            });
        }

        if (searchQuery.trim()) {
            filtered = filtered.filter(project =>
                project.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }


        switch(sortType) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                break;
            case 'alphabetical':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        setSortedProjects(filtered);
        setSortBy(sortType);
        setFilters(filterSettings);
    };


    const handleSortChange = (newSort) => applyFiltersAndSort(newSort, filters)
    const handleFilterChange = (newFilters) => applyFiltersAndSort(sortBy, newFilters)
    const clearAll = () => applyFiltersAndSort('newest', { tags: [], roles: [] })

    return (
        <FilterContext.Provider value={{
            sortedProjects,
            sortBy,
            filters,
            handleSortChange,
            handleFilterChange,
            clearAll
        }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => useContext(FilterContext)