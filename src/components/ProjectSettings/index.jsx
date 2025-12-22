import './style.css'
import { useEffect, useState } from 'react'
import TagSelector from '../TagSelector'
import RoleSelector from '../RoleSelector'

export default function ProjectSettings({ project, onProjectUpdated }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        tags: [],
        required_roles: [],
        contact_info: '',
        start_date: '',
        duration: '',
        difficulty: '',
        team_size: ''
    })
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name || '',
                description: project.description || '',
                tags: project.tags || [],
                required_roles: project.required_roles || [],
                contact_info: project.contact_info || '',
                start_date: project.start_date ? project.start_date.split('T')[0] : '',
                duration: project.duration || '',
                difficulty: project.difficulty || '',
                team_size: project.team_size || ''
            })
        }
    }, [project])

    const updateFormData = (newData) =>
        setFormData(prev => ({ ...prev, ...newData }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!project) return

        setIsSaving(true)
        setError(null)

        try {
            const token = localStorage.getItem('token')
            if (!token) throw new Error('Требуется авторизация')

            const payload = {
                name: formData.name,
                description: formData.description,
                tags: formData.tags,
                required_roles: formData.required_roles,
                contact_info: formData.contact_info,
                start_date: formData.start_date || null,
                duration: formData.duration ? parseInt(formData.duration) : null,
                difficulty: formData.difficulty || 'Средняя',
                team_size: formData.required_roles.length,
                status: project.status
            }

            const res = await fetch(`http://155.212.247.183:5000/api/projects/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                throw new Error(data.error || 'Не удалось сохранить изменения')
            }

            if (onProjectUpdated) {
                onProjectUpdated({
                    ...project,
                    ...payload
                })
            }
        } catch (e) {
            setError(e.message)
        } finally {
            setIsSaving(false)
        }
    }

    const handleReset = () => {
        if (!project) return
        setFormData({
            name: project.name || '',
            description: project.description || '',
            tags: project.tags || [],
            required_roles: project.required_roles || [],
            contact_info: project.contact_info || '',
            start_date: project.start_date ? project.start_date.split('T')[0] : '',
            duration: project.duration || '',
            difficulty: project.difficulty || '',
            team_size: project.team_size || ''
        })
    }

    return (
        <div className="settings-tab">
            <h3>Настройки проекта</h3>

            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-column">
                        <div className="form-group">
                            <label>Название проекта *</label>
                            <input
                                type="text"
                                className="settings-input"
                                value={formData.name}
                                onChange={e => updateFormData({ name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Описание проекта *</label>
                            <textarea
                                className="settings-textarea"
                                rows="6"
                                value={formData.description}
                                onChange={e => updateFormData({ description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group-dates">
                            <div className="left_dates">
                                <label>Дата старта проекта</label>
                                <input
                                    type="date"
                                    value={formData.start_date || ''}
                                    onChange={e => updateFormData({ start_date: e.target.value })}
                                />
                            </div>
                            <div className="right_dates">
                                <label>Длительность проекта (в неделях)</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.duration || ''}
                                    onChange={e => updateFormData({ duration: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Контакт для связи</label>
                            <input
                                type="text"
                                className="settings-input"
                                value={formData.contact_info}
                                onChange={e => updateFormData({ contact_info: e.target.value })}
                                placeholder="Email, Telegram или другой способ связи"
                            />
                        </div>

                        <div className="form-group">
                            <label>Сложность проекта</label>
                            <select
                                className="settings-input"
                                value={formData.difficulty || ''}
                                onChange={e => updateFormData({ difficulty: e.target.value })}
                            >
                                <option value="">Выберите</option>
                                <option value="Легкая">Легкая</option>
                                <option value="Средняя">Средняя</option>
                                <option value="Сложная">Сложная</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-column">
                        <TagSelector
                            selectedTags={formData.tags}
                            onAdd={tag => updateFormData({ tags: [...formData.tags, tag] })}
                            onRemove={tag => updateFormData({ tags: formData.tags.filter(t => t !== tag) })}
                        />
                        <RoleSelector
                            selectedRoles={formData.required_roles}
                            onAdd={role => updateFormData({ required_roles: [...formData.required_roles, role] })}
                            onRemove={index => updateFormData({ required_roles: formData.required_roles.filter((_, i) => i !== index) })}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save" disabled={isSaving}>
                        {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={handleReset} disabled={isSaving}>
                        Отмена
                    </button>
                    <button type="button" className="btn-delete" disabled>
                        Удалить проект
                    </button>
                </div>

                {error && <div className="settings-error">{error}</div>}
            </form>
        </div>
    )
}