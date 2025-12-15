import { useState } from 'react'
import './style.css'

export default function TagSelector({ selectedTags, onAdd, onRemove }) {
    
    const allTags = [
        'JavaScript',
        'TypeScript',
        'Python',
        'Java',
        'C#',
        'C++',
        'Go',
        'Rust',
        'PHP',
        'Kotlin',
        'Swift',
    
        'React',
        'Next.js',
        'Vue',
        'Nuxt',
        'Angular',
        'Svelte',
    
        'HTML',
        'CSS',
        'SCSS',
        'Tailwind CSS',
        'Bootstrap',
    
        'Node.js',
        'Express',
        'NestJS',
        'Django',
        'Flask',
        'FastAPI',
        'Spring',
        'ASP.NET',
    
        'REST API',
        'GraphQL',
        'WebSocket',
        'API',
    
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Redis',
        'SQLite',
        'Firebase',
    
        'ORM',
        'Prisma',
        'Sequelize',
        'TypeORM',
    
        'Docker',
        'Kubernetes',
        'CI/CD',
        'DevOps',
        'Linux',
    
        'AWS',
        'Google Cloud',
        'Azure',
    
        'Мобильная разработка',
        'React Native',
        'Flutter',
    
        'UI',
        'UX',
        'UI/UX',
        'Figma',
        'Web-дизайн',
    
        'Тестирование',
        'Unit-тесты',
        'E2E-тесты',
        'Jest',
        'Cypress',
    
        'Data Science',
        'Machine Learning',
        'AI',
        'Big Data',
    
        'Аналитика',
        'Бизнес-аналитика',
        'Системный анализ',
    
        'Архитектура',
        'Микросервисы',
        'Монолит',
    
        'Git',
        'GitHub',
        'GitLab',
    
        'SEO',
        'Маркетинг',
        'Стартап',
        'MVP',
        'Open Source'
    ]    

    const [search, setSearch] = useState('')

    const filteredTags = allTags.filter(tag => tag.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="form-group">
            <label>Технологии и теги</label>
            <input 
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск технологий..."
                className="search-input-create"
            />
            {selectedTags.length > 0 && (
                <div className="selected-items-create">
                    <div className="selected-label-create">Выбранные теги:</div>
                    <div className="selected-tags-create">
                        {selectedTags.map(tag => (
                            <span key={tag} className="selected-tag-create">
                                {tag}
                                <button type="button" className="remove-btn" onClick={() => onRemove(tag)}>×</button>
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <div className="tags-container-create">
                {search && filteredTags.length > 0 ? (
                    filteredTags.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            className={`tag-create ${selectedTags.includes(tag) ? 'selected' : ''}`}
                            onClick={() => selectedTags.includes(tag) ? onRemove(tag) : onAdd(tag)}
                        >
                            {tag}
                        </button>
                    ))
                ) : search ? <div className="no-results">Теги не найдены</div> : null}
            </div>
        </div>
    )
}
