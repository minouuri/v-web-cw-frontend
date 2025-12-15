import './style.css'

export default function Step2Preview({ formData, onSubmit, onBack }) {
    return (
        <div className="step-form">
            <h3>Проверьте данные проекта</h3>
            <p className="step-description">Убедитесь что все заполнено правильно перед публикацией</p>

            <div className="preview-content-create">
                <div className="preview-section-create">
                    <h4>Основная информация</h4>
                    <div className="preview-item-create"><strong>Название:</strong> {formData.name}</div>
                    <div className="preview-item-create"><strong>Описание:</strong> {formData.description}</div>
                </div>

                {formData.tags.length > 0 && (
                    <div className="preview-section-create">
                        <h4>Технологии</h4>
                        <div className="preview-tags-create">
                            {formData.tags.map(tag => <span key={tag} className="preview-tag-create">{tag}</span>)}
                        </div>
                    </div>
                )}

                {formData.required_roles.length > 0 && (
                    <div className="preview-section-create">
                        <h4>Требуемые роли</h4>
                        <div className="preview-roles-create">
                            {formData.required_roles.map(role => <span key={role} className="preview-role-create">{role}</span>)}
                        </div>
                    </div>
                )}

                {formData.contact_info && (
                    <div className="preview-section-create">
                        <h4>Контактная информация</h4>
                        <div className="preview-item-create">{formData.contact_info}</div>
                    </div>
                )}
            </div>

            <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onBack}>← Назад к редактированию</button>
                <button type="button" className="btn-primary" onClick={onSubmit}>Опубликовать проект</button>
            </div>
        </div>
    )
}
