import { useState } from 'react'
import './style.css'

export default function RoleSelector({ selectedRoles, onAdd, onRemove }) {
    const allRoles = [
        // Разработка
        'Frontend-разработчик',
        'Backend-разработчик',
        'Fullstack-разработчик',
        'Мобильный разработчик (iOS)',
        'Мобильный разработчик (Android)',
        'Мобильный разработчик (Flutter)',
        'Game Developer',
        'Embedded-разработчик',
        'Blockchain-разработчик',
    
        // Дизайн
        'Дизайнер',
        'UI-дизайнер',
        'UX-дизайнер',
        'UI/UX дизайнер',
        'Графический дизайнер',
        'Product Designer',
        'Motion Designer',
    
        // Аналитика и данные
        'Аналитик',
        'Бизнес-аналитик',
        'Системный аналитик',
        'Data Analyst',
        'Data Scientist',
        'ML-инженер',
        'AI-инженер',
    
        // Тестирование и качество
        'Тестировщик (Manual QA)',
        'Автотестировщик (QA Automation)',
        'Инженер по качеству (QA Engineer)',
    
        // DevOps и инфраструктура
        'DevOps-инженер',
        'Cloud-инженер',
        'Site Reliability Engineer (SRE)',
        'Системный администратор',
        'Инженер по безопасности (Security Engineer)',
    
        // Управление и продукт
        'Менеджер проекта',
        'Product Manager',
        'Product Owner',
        'Scrum-мастер',
        'Team Lead',
        'Tech Lead',
    
        // Контент и маркетинг
        'Контент-менеджер',
        'Технический писатель',
        'Маркетолог',
        'SEO-специалист',
        'SMM-специалист',
    
        // Поддержка и прочее
        'Customer Support',
        'Community Manager',
        'HR / Рекрутер',
        'Research Engineer'
    ]    

    const [search, setSearch] = useState('')

    const filteredRoles = allRoles.filter(role =>
        role.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="form-group">
            <label>Требуемые роли (нажимайте несколько раз, чтобы добавить несколько ролей)</label>

            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск ролей..."
                className="search-input-create"
            />

            {selectedRoles.length > 0 && (
                <div className="selected-items-create">
                    <div className="selected-label-create">Выбранные роли:</div>

                    <div className="selected-roles-create">
                        {selectedRoles.map((role, index) => (
                            <span
                                key={`${role}-${index}`}
                                className="selected-role-create"
                            >
                                {role}
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => onRemove(index)}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="roles-tags-container-create">
                {search && filteredRoles.length > 0 ? (
                    filteredRoles.map(role => (
                        <button
                            key={role}
                            type="button"
                            className="role-create"
                            onClick={() => onAdd(role)}
                        >
                            {role}
                        </button>
                    ))
                ) : search ? (
                    <div className="no-results">Роли не найдены</div>
                ) : null}
            </div>
        </div>
    )
}
