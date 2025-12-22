import './respondform.css'
import { useState } from 'react'
import { useUser } from '../../Context/UserContext'

export default function RespondForm({ projectId, projectName, availableRoles, onClose }) {
    const { fetchProfile } = useUser()

    const uniqueRoles = Array.from(new Set(availableRoles))
    const [selectedRole, setSelectedRole] = useState(uniqueRoles[0] || '')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const submit = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('http://155.212.247.183:5000/api/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    project_id: projectId,
                    role: selectedRole,
                    message
                })
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.error)
            }

            await fetchProfile()   // 🔥 ОБНОВЛЯЕМ ПРОФИЛЬ
            onClose()

        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="apply-modal-overlay">
            <div className="apply-modal">
                <div className="modal-header">
                    <h3>Откликнуться на проект</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-project-name">{projectName}</div>

                <form onSubmit={submit}>
                    <div className="respond-row">
                        <div className="respond-group">
                            <label className="respond-label">Выберите роль *</label>
                            <div className="roles-grid">
                                {uniqueRoles.map(role => (
                                    <div 
                                        key={role} 
                                        className={`role-card ${selectedRole === role ? 'selected' : ''}`}
                                        onClick={() => setSelectedRole(role)}
                                    >
                                        <div className="role-checkbox">
                                            <div className="checkbox-inner"></div>
                                        </div>
                                        <span className="role-text">{role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="respond-group">
                            <label className="respond-label">О себе *</label>
                            <textarea
                                required
                                rows="4"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Расскажите о своем опыте, почему вы подходите для этой роли..."
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
                            Отмена
                        </button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Отправка...' : 'Отправить заявку'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

