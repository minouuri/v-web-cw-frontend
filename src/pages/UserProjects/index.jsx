import './style.css'
import { useState, useEffect } from 'react'
import ButtonCreateProject from '../../components/ButtonCreateProject'
import MiniProjectsInfo from '../../components/MiniProjectsInfo'

export default function UserProjects() {
    const [currentUser, setCurrentUser] = useState(null)
    const [userProjects, setUserProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) throw new Error('Требуется авторизация')

                const profileRes = await fetch('http://localhost:5000/api/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (!profileRes.ok) throw new Error('Не удалось получить профиль')
                const userData = await profileRes.json()
                setCurrentUser(userData)

                const projectsRes = await fetch('http://localhost:5000/api/projects', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (!projectsRes.ok) throw new Error('Не удалось загрузить проекты')
                const projectsData = await projectsRes.json()

                const filteredProjects = projectsData.filter(project => project.user_id === userData.id)
                setUserProjects(filteredProjects)
            } catch (err) {
                console.error('Ошибка загрузки проектов:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUserProjects()
    }, [])

    if (loading) {
        return <div className="status-message loading">Загрузка проектов...</div>
    }

    if (error || !currentUser) {
        return <div className="status-message error">{error}</div>
    }

    return (
        <div className="user-projects-page">
            <div className="page-header-myproject">
                <div className="header-content">
                    <p className="page-subtitle">Управляйте своими проектами и отслеживайте их прогресс</p>
                </div>
                <ButtonCreateProject />
            </div>
            
            <div className="projects-section">
                <div className="section-header">
                    <h2>Все проекты</h2>
                    <div className="project-count">{userProjects.length} проект(а)</div>
                </div>

                {userProjects.length === 0 && (
                    <div className="demo-notice">
                        <div className="notice-content">
                            <h3>У вас пока нет проектов</h3>
                            <p>Создайте проект, чтобы он отображался здесь.</p>
                        </div>
                    </div>
                )}
                
                <div className="projects-grid">
                    {userProjects.map(project => (
                        <MiniProjectsInfo 
                            key={project.id} 
                            project={{
                                id: project.id,
                                name_of_project: project.name,
                                description: project.description,
                                tags_of_project: project.tags,
                                roles_in_the_project: project.required_roles,
                                author_of_project: currentUser.username,
                                date_of_publication: project.created_at,
                                status: project.status
                            }}
                            showAuthor={false}
                            isCurrentUserProject={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
