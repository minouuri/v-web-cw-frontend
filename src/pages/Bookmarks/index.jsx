import './style.css'
import { useState, useEffect } from 'react'
import MiniProjectsInfo from '../../components/MiniProjectsInfo'

export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) throw new Error('Требуется авторизация')

                const res = await fetch('http://localhost:5000/api/bookmarks', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (!res.ok) {
                    const err = await res.json().catch(() => ({}))
                    throw new Error(err.error || 'Не удалось загрузить закладки')
                }

                const data = await res.json()
                const normalized = data.map(project => ({
                    id: project.id,
                    name_of_project: project.name,
                    description: project.description,
                    tags_of_project: project.tags || [],
                    roles_in_the_project: project.required_roles || [],
                    author_of_project: project.author_username,
                    date_of_publication: project.created_at,
                    status: project.status
                }))

                setBookmarks(normalized)
            } catch (e) {
                console.error('Ошибка загрузки закладок:', e)
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchBookmarks()
    }, [])

    if (loading) {
        return <div className="status-message loading">Загрузка...</div>
    }

    if (error) {
        return <div className="status-message error">{error}</div>
    }

    return (
        <div className="bookmarks-page">
            <div className="page-header-bookmarks">
                <h2>Мои закладки</h2>
            </div>

            <div className="bookmarks-list">
                {bookmarks.length === 0 ? (
                    <div className="empty-message">
                        У вас пока нет закладок
                    </div>
                ) : (
                    <div className="projects-grid">
                        {bookmarks.map(project => (
                            <MiniProjectsInfo
                                key={project.id}
                                project={project}
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
