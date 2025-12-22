import './style.css'
import { useState, useEffect } from 'react'
import { useFilter } from '../../Context/FilterContext'

export default function SortAndFilter() {
    const { sortBy, filters, handleSortChange, handleFilterChange, clearAll } = useFilter();
    const [allTags, setAllTags] = useState([])
    const [allRoles, setAllRoles] = useState([])
    const [tagSearch, setTagSearch] = useState('')
    const [roleSearch, setRoleSearch] = useState('')

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("http://155.212.247.183:5000/api/projects")
                const data = await res.json()

                const tagsSet = new Set()
                const rolesSet = new Set()

                data.forEach(project => {
                    project.tags?.forEach(tag => {
                        if (tag?.trim()) tagsSet.add(tag.trim())
                    })
                    project.required_roles?.forEach(role => {
                        if (role?.trim()) rolesSet.add(role.trim())
                    })
                })

                setAllTags(Array.from(tagsSet).sort())
                setAllRoles(Array.from(rolesSet).sort())
            } catch (err) {
                console.error("Ошибка загрузки проектов:", err)
            }
        }

        fetchProjects()
    }, [])

    const toggleTag = (tag) => {
        const newTags = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag]
        handleFilterChange({ ...filters, tags: newTags })
    }

    const toggleRole = (role) => {
        const newRoles = filters.roles.includes(role)
            ? filters.roles.filter(r => r !== role)
            : [...filters.roles, role]
        handleFilterChange({ ...filters, roles: newRoles })
    }

    const filteredTags = tagSearch
        ? allTags.filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()))
        : []

    const filteredRoles = roleSearch
        ? allRoles.filter(role => role.toLowerCase().includes(roleSearch.toLowerCase()))
        : []

    const displayTags = [
        ...filters.tags,
        ...filteredTags.filter(tag => !filters.tags.includes(tag))
    ]

    const displayRoles = [
        ...filters.roles,
        ...filteredRoles.filter(role => !filters.roles.includes(role))
    ]

    return (
        <div className="sort_filter_container">
            <div className="filters_header">
                <h3>Фильтры и сортировка</h3>
            </div>

            <div className="filter_section">
                <div className="sort_options">
                    <button className={`sort_option ${sortBy === 'newest' ? 'active' : ''}`}
                        onClick={() => handleSortChange('newest')}>Сначала новые</button>
                    <button className={`sort_option ${sortBy === 'oldest' ? 'active' : ''}`}
                        onClick={() => handleSortChange('oldest')}>Сначала старые</button>
                    <button className={`sort_option ${sortBy === 'alphabetical' ? 'active' : ''}`}
                        onClick={() => handleSortChange('alphabetical')}>По алфавиту</button>
                </div>
            </div>

            <div className="filter_section">
                <div className="filter_header_with_search">
                    <h4>Технологии ({filters.tags.length} выбрано)</h4>
                    <input 
                        type="text"
                        value={tagSearch}
                        onChange={e => setTagSearch(e.target.value)}
                        placeholder="Поиск технологий..."
                        className="search_input"
                    />
                </div>
                <div className="tags_filter">
                    {displayTags.length > 0 ? displayTags.map(tag => (
                        <button 
                            key={tag}
                            className={`filter_tag ${filters.tags.includes(tag) ? 'active' : ''}`}
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                            {filters.tags.includes(tag) && <span className="remove_icon">×</span>}
                        </button>
                    )) : tagSearch ? <div className="no_results">Теги не найдены</div> : <div className="no_selected">Выберите теги</div>}
                </div>
            </div>

            <div className="filter_section">
                <div className="filter_header_with_search">
                    <h4>Роли ({filters.roles.length} выбрано)</h4>
                    <input 
                        type="text"
                        value={roleSearch}
                        onChange={e => setRoleSearch(e.target.value)}
                        placeholder="Поиск ролей..."
                        className="search_input"
                    />
                </div>
                <div className="roles_filter">
                    {displayRoles.length > 0 ? displayRoles.map(role => (
                        <button
                            key={role}
                            className={`filter_role ${filters.roles.includes(role) ? 'active' : ''}`}
                            onClick={() => toggleRole(role)}
                        >
                            {role}
                            {filters.roles.includes(role) && <span className="remove_icon">×</span>}
                        </button>
                    )) : roleSearch ? <div className="no_results">Роли не найдены</div> : <div className="no_selected">Выберите роли</div>}
                </div>
            </div>

            <button className="clear_filters" onClick={clearAll}>
                Сбросить фильтры
            </button>
        </div>
    )
}
