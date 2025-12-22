import './responses.css'
import { useState, useEffect } from 'react'
import MiniProjectsInfo from '../../components/MiniProjectsInfo'

export default function Responses() {
    const [currentUser, setCurrentUser] = useState(null)
    const [applications, setApplications] = useState([])
    const [activeTab, setActiveTab] = useState('sent') // 'sent' | 'accepted'
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) throw new Error('Требуется авторизация')

                const profileRes = await fetch('http://155.212.247.183:5000/api/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (!profileRes.ok) throw new Error('Не удалось получить профиль')
                const userData = await profileRes.json()
                setCurrentUser(userData)

                const res = await fetch('http://155.212.247.183:5000/api/responses', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (!res.ok) throw new Error('Не удалось загрузить отклики')
                const data = await res.json()

                setApplications(data)
            } catch (err) {
                console.error('Ошибка загрузки откликов:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchResponses()
    }, [])

    if (loading) return <div className="status-message loading">Загрузка...</div>
    if (error) return <div className="status-message error">{error}</div>
    if (!currentUser) return <div className="status-message error">Не найден пользователь</div>

    const filteredApps = applications.filter(app => 
        activeTab === 'sent'
            ? app.status === 'pending' || app.status === 'rejected'
            : app.status === 'accepted'
    )

    return (
        <div className="responses-page">
            <div className="page-header">
                <h2>Мои отклики</h2>
            </div>

            <div className="responses_tabs">
                <button 
                    className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sent')}
                >
                    Отправленные
                </button>
                <button 
                    className={`tab ${activeTab === 'accepted' ? 'active' : ''}`}
                    onClick={() => setActiveTab('accepted')}
                >
                    Принятые
                </button>
            </div>

            <div className="responses-list">
                {filteredApps.length === 0 ? (
                    <div className="empty-message">
                        {activeTab === 'sent' ? 'Вы пока не откликались на проекты' : 'Нет принятых откликов'}
                    </div>
                ) : (
                    <div className="projects-grid">
                        {filteredApps.map(app => (
                            <MiniProjectsInfo
                                key={app.id}
                                project={{
                                    id: app.project_id,
                                    name_of_project: app.project_name,
                                    description: app.project_description,
                                    tags_of_project: app.project_tags,
                                    roles_in_the_project: app.project_roles,
                                    author_of_project: app.project_author,
                                    date_of_publication: app.applied_at,
                                    status: app.status
                                }}
                                showAuthor={true}
                                minimalView={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
