import './ProjectManager.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectApplications from '../../components/ProjectApplications'
import ProjectTeam from '../../components/ProjectTeam'
import ProjectSettings from '../../components/ProjectSettings'

export default function ProjectManagerPage() {
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState('applications')

    const [project, setProject] = useState(null)
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // TODO: заменить на реальные данные команды, когда появится API
    const team = [
        { id: 1, role: "Frontend-разработчик", user: "Иван Иванов", status: "filled", joinDate: "2025-01-10" },
        { id: 2, role: "Backend-разработчик", user: null, status: "open" },
        { id: 3, role: "UI/UX дизайнер", user: "Мария Сидорова", status: "filled", joinDate: "2025-01-12" },
        { id: 4, role: "Аналитик", user: null, status: "open" }
    ]

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    throw new Error('Требуется авторизация')
                }

                const [projectRes, appsRes] = await Promise.all([
                    fetch(`http://localhost:5000/api/projects/${id}`),
                    fetch(`http://localhost:5000/api/projects/${id}/applications`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ])

                if (!projectRes.ok) {
                    throw new Error('Не удалось загрузить проект')
                }
                if (!appsRes.ok) {
                    const err = await appsRes.json().catch(() => ({}))
                    throw new Error(err.error || 'Не удалось загрузить заявки')
                }

                const projectData = await projectRes.json()
                const appsData = await appsRes.json()

                setProject(projectData)
                setApplications(appsData)
            } catch (e) {
                console.error('Ошибка загрузки данных менеджера проекта:', e)
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id])

    const handleAccept = async (applicationId, role) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('Требуется авторизация')
            }

            const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/decision`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ action: 'accept' })
            })

            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.error || 'Не удалось принять заявку')
            }

            const updated = await res.json()

            setApplications(prev =>
                prev.map(app => app.id === applicationId
                    ? { ...app, status: updated.status }
                    : app
                )
            )
        } catch (e) {
            alert(e.message)
        }
    }

    const handleReject = async (applicationId) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('Требуется авторизация')
            }

            const res = await fetch(`http://localhost:5000/api/applications/${applicationId}/decision`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ action: 'reject' })
            })

            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.error || 'Не удалось отклонить заявку')
            }

            const updated = await res.json()

            setApplications(prev =>
                prev.map(app => app.id === applicationId
                    ? { ...app, status: updated.status }
                    : app
                )
            )
        } catch (e) {
            alert(e.message)
        }
    }

    const handleRemoveMember = (memberId) => {
        console.log('Удалить участника', memberId)
    }

    const handleUpdateStatus = (newStatus) => {
        console.log('Обновить статус проекта на', newStatus)
    }

    if (loading) {
        return <div className="project_manager_page">Загрузка...</div>
    }

    if (error || !project) {
        return <div className="project_manager_page">Ошибка: {error || 'Проект не найден'}</div>
    }

    // Преобразуем заявки из API к формату, который ожидает компонент ProjectApplications
    const viewApplications = applications.map(app => ({
        id: app.id,
        user: app.user_name,
        role: app.role_name,
        date: app.applied_at
            ? new Date(app.applied_at).toLocaleDateString('ru-RU')
            : '',
        message: app.message,
        status: app.status
    }))

    return (
        <div className="project_manager_page">
            <div className="manager_header">
                <div className="project_info">
                    <h2>{project.name}</h2>
                    <div className="status_selector">
                        <span>Статус проекта:</span>
                        <select 
                            value={project.status}
                            onChange={(e) => handleUpdateStatus(e.target.value)}
                            className="status_select"
                        >
                            <option value="active">Активный</option>
                            <option value="development">В разработке</option>
                            <option value="paused">Приостановлен</option>
                            <option value="completed">Завершен</option>
                            <option value="archived">В архиве</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Навигация по вкладкам */}
            <nav className="manager_tabs">
                <button 
                    className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applications')}
                >
                    Заявки ({viewApplications.length})
                </button>
                <button 
                    className={`tab ${activeTab === 'team' ? 'active' : ''}`}
                    onClick={() => setActiveTab('team')}
                >
                    Команда ({team.filter(m => m.status === 'filled').length})
                </button>
                <button 
                    className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    Настройки
                </button>
            </nav>

            {/* Контент вкладок */}
            <div className="tab_content">
                {activeTab === 'applications' && (
                    <ProjectApplications 
                        applications={viewApplications}
                        onAccept={handleAccept}
                        onReject={handleReject}
                    />
                )}

                {activeTab === 'team' && (
                    <ProjectTeam 
                        team={team}
                        onRemoveMember={handleRemoveMember}
                    />
                )}

                {activeTab === 'settings' && (
                    <ProjectSettings />
                )}
            </div>
        </div>
    )
}