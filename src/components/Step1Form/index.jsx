import TagSelector from '../TagSelector'
import RoleSelector from '../RoleSelector'
import './stepform.css'

export default function Step1Form({ formData, updateFormData, onNext, onClose }) {
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (formData.name && formData.description) onNext()
    }

    return (
        <form className="step-form" onSubmit={handleFormSubmit}>
            <div className="form-grid">
                <div className="form-column">
                    <div className="form-group">
                        <label>Название проекта *</label>
                        <input 
                            type="text"
                            value={formData.name}
                            onChange={e => updateFormData({ name: e.target.value })}
                            placeholder="Как называется ваш проект?"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Описание проекта *</label>
                        <textarea 
                            value={formData.description}
                            onChange={e => updateFormData({ description: e.target.value })}
                            placeholder="Опишите цели и задачи проекта..."
                            rows="8"
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
                                value={formData.duration || ''}
                                onChange={e => updateFormData({ duration: e.target.value })}
                                min="1"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Контакт для связи</label>
                        <input 
                            type="text"
                            value={formData.contact_info}
                            onChange={e => updateFormData({ contact_info: e.target.value })}
                            placeholder="Email, Telegram или другой способ связи"
                        />
                    </div>

                    <div className="form-group">
                        <label>Сложность проекта</label>
                        <select 
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
                <button type="button" className="btn-secondary" onClick={onClose}>Отмена</button>
                <button type="submit" className="btn-primary" disabled={!formData.name || !formData.description}>Продолжить →</button>
            </div>
        </form>
    )
}
