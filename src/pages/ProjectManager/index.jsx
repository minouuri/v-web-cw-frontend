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
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    throw new Error('Требуется авторизация')
                }

                const [projectRes, appsRes, membersRes] = await Promise.all([
                    fetch(`http://155.212.247.183:5000/api/projects/${id}`),
                    fetch(`http://155.212.247.183:5000/api/projects/${id}/applications`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch(`http://155.212.247.183:5000/api/projects/${id}/members`, {
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
                if (!membersRes.ok) {
                    const err = await membersRes.json().catch(() => ({}))
                    throw new Error(err.error || 'Не удалось загрузить участников')
                }

                const projectData = await projectRes.json()
                const appsData = await appsRes.json()
                const membersData = await membersRes.json()

                setProject(projectData)
                setApplications(appsData)
                setMembers(membersData)
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

            const res = await fetch(`http://155.212.247.183:5000/api/applications/${applicationId}/decision`, {
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

            const res = await fetch(`http://155.212.247.183:5000/api/applications/${applicationId}/decision`, {
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

    const handleRemoveMember = async (member) => {
        try {
            if (!member.userId) return

            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('Требуется авторизация')
            }

            const res = await fetch(`http://155.212.247.183:5000/api/projects/${id}/members/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_id: member.userId,
                    role: member.role
                })
            })

            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.error || 'Не удалось удалить участника')
            }

            const data = await res.json()

            // обновляем список участников локально
            setMembers(prev =>
                prev.filter(m => !(m.user_id === member.userId && m.role_name === member.role))
            )

            if (data.reverted_application) {
                setApplications(prev => [...prev, data.reverted_application])
            }
        } catch (e) {
            alert(e.message)
        }
    }

    const handleUpdateStatus = (newStatus) => {
        console.log('Обновить статус проекта на', newStatus)
    }

    if (loading) {
        return <div className="status-message loading">Загрузка...</div>
    }

    if (error || !project) {
        return <div className="status-message loading error">Ошибка: {error || 'Проект не найден'}</div>
    }

    const viewApplications = applications
        .filter(app => app.status === 'pending')
        .map(app => ({
            id: app.id,
            userId: app.user_id,
            user: app.user_name,
            role: app.role_name,
            date: app.applied_at
                ? new Date(app.applied_at).toLocaleDateString('ru-RU')
                : '',
            message: app.message,
            status: app.status
        }))

    const projectRoles = Array.from(new Set(project.required_roles || []))

    const teamSlots = (() => {
        const slots = []
        const membersByRole = {}

        members.forEach(m => {
            const key = m.role_name
            if (!membersByRole[key]) {
                membersByRole[key] = []
            }
            membersByRole[key].push(m)
        })

        ;(project.required_roles || []).forEach((roleName, index) => {
            const list = membersByRole[roleName] || []
            const member = list.shift() || null

            slots.push({
                id: index,
                role: roleName,
                user: member ? member.user_name : null,
                userId: member ? member.user_id : null,
                isOwner: member ? member.is_owner : false,
                joinDate: member && member.joined_at
                    ? new Date(member.joined_at).toLocaleDateString('ru-RU')
                    : null
            })
        })

        return slots
    })()

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
                    Команда ({teamSlots.filter(m => m.user).length})
                </button>
                <button 
                    className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    Настройки
                </button>
            </nav>

            <div className="tab_content">
                {activeTab === 'applications' && (
                    <ProjectApplications 
                        applications={viewApplications}
                        roles={projectRoles}
                        onAccept={handleAccept}
                        onReject={handleReject}
                    />
                )}

                {activeTab === 'team' && (
                    <ProjectTeam 
                        team={teamSlots}
                        onRemoveMember={handleRemoveMember}
                    />
                )}

                {activeTab === 'settings' && (
                    <ProjectSettings 
                        project={project}
                        onProjectUpdated={setProject}
                    />
                )}
            </div>
        </div>
    )
}