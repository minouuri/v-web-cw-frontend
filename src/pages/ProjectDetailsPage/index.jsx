import './ProjectDetailsPage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AuthorBadge from "../../components/AuthorBadge"
import TagsName from "../../components/TagsName"
import MiniProjectButtons from '../../components/MiniProjectButtons'

export default function ProjectDetailsPage() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showApplyModal, setShowApplyModal] = useState(false)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/projects/${id}`)
                if (!res.ok) throw new Error('Проект не найден')
                const data = await res.json()
                setProject(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProject()
    }, [id])

    if (loading) return <div className="status-message loading">Загрузка...</div>
    
    if (error || !project) return <div className="status-message error">Проект не найден</div>

    const handleApply = () => setShowApplyModal(true)
    const handleBookmark = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('Требуется авторизация')
            }

            const res = await fetch('http://localhost:5000/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ project_id: project.id })
            })

            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.error || 'Не удалось добавить в закладки')
            }
        } catch (e) {
            console.error('Не удалось сохранить закладку:', e)
            alert(e.message)
        }
    }

    const team = project.required_roles?.map(role => ({
        role,
        user: null,
        status: 'open'
    })) || []

    const statusMap = {
        active: { text: 'Активный', className: 'active' },
        completed: { text: 'Завершен', className: 'completed' },
        archived: { text: 'Архив', className: 'archived' }
    }
    const projectStatus = statusMap[project.status] || { text: project.status || 'Неизвестно', className: '' }

    return (
        <div className="project-details-page">

            <div className="project-header">
                <div className="header-main">
                    <div>
                        <h1 className="project-title">{project.name}</h1>
                        <div className="author-info">
                            <AuthorBadge author={project.author_username} showBadge />
                            <span className="created-date">
                                Создан: {project.created_at ? new Date(project.created_at).toLocaleDateString('ru-RU') : '—'}
                            </span>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className={`status-badge ${projectStatus.className}`}>{projectStatus.text}</div>
                    </div>
                </div>
            </div>

            <div className="project-content">
                <div className='left-side'>
                    <section className="project-section">
                        <h2>Описание проекта</h2>
                        <p className="project-description">{project.description || '—'}</p>
                    </section>

                    <section className="project-section">
                        <h2>Стек технологий</h2>
                        <TagsName tags={project.tags || []} />
                    </section>

                    <section className="project-details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Количество ролей</span>
                            <span className="detail-value">{project.required_roles?.length || 0}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Дата начала проекта</span>
                            <span className="detail-value">
                                {project.start_date
                                    ? new Date(project.start_date).toLocaleDateString('ru-RU')
                                    : '—'}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Длительность проекта</span>
                            <span className="detail-value">{project.duration ? `${project.duration} нед.` : '—'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Сложность проекта</span>
                            <span className="detail-value">{project.difficulty || 'Средняя'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Количество участников</span>
                            <span className="detail-value">{project.team_size || 0}</span>
                        </div>
                    </section>
                </div>

                <div className='right-side'>
                    <section className="team-section">
                        <h2>Команда проекта</h2>
                        <div className="team-table">
                            {team.map((member, idx) => (
                                <div key={idx} className={`team-row ${member.status === 'open' ? 'open' : ''}`}>
                                    <span className="team-role">{member.role}</span>
                                    <span className={`team-user ${member.user ? 'filled' : 'open'}`}>
                                        {member.user || 'Свободно'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <MiniProjectButtons
                projectId={project.id} 
                projectName={project.name}
                availableRoles={project.required_roles || []}
            />

        </div>
    )
}
