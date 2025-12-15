import './style.css'
import UserProfileAvatar from "../../components/UserProfileAvatar"
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

export default function ProfileUser({ user }) {
    if (!user) return null

    const { user: currentUser } = useContext(AuthContext)
    const isOwnProfile = currentUser?.user_id === user.id

    const {
        username,
        email,
        registration_date,
        stats
    } = user

    return (
        <div className='profile_user'>
            <div className="profile_top">
                <div className="profile_left">
                    <UserProfileAvatar username={username} size="lg" />

                    <div className='user-info'>
                        <h2 className="username">{username}</h2>
                        <p className="user_email">{email}</p>

                        <p className="join_date">
                            С нами с: {new Date(registration_date).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="stats_section">
                    <h3 className="stats_title">Статистика</h3>

                    <div className="stats_grid">
                        <div className="stat_item">
                            <span className="stat_number">{stats.projects_created}</span>
                            <span className="stat_label">Создано проектов</span>
                        </div>

                        <div className="stat_item">
                            <span className="stat_number">{stats.applications}</span>
                            <span className="stat_label">Откликов</span>
                        </div>

                        <div className="stat_item">
                            <span className="stat_number">{stats.projects_participated}</span>
                            <span className="stat_label">Участие в проектах</span>
                        </div>

                        <div className="stat_item">
                            <span className="stat_number">{stats.projects_completed}</span>
                            <span className="stat_label">Завершено проектов</span>
                        </div>
                    </div>
                </div>
            </div>

            {isOwnProfile && (
                <div className="profile_actions">
                    {/* <button className="edit_btn">Редактировать профиль</button> */}
                    <button
                        className="logout_btn"
                        onClick={() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                            window.location.href = '/'
                        }}
                    >
                        Выйти
                    </button>
                </div>
            )}
        </div>
    )
}
