import './style.css'
import ProfileUser from "../../components/ProfileUser"
import ProfileTagsRoles from "../../components/ProfileTagsRoles"
import ProfileAuthorOfProjects from "../../components/ProfileAuthorOfProjects"
import AuthRedirectButton from "../../components/AuthRedirectButton"
import { useUser } from '../../Context/UserContext'

export default function Profile() {
    const { profile, loading, error } = useUser()

    if (loading) {
        return <div className="status-message loading">Загрузка профиля...</div>
    }

    if (error) {
        return (
            <div className="profile-error-container">
                <div className="status-message error">{error}</div>
                <AuthRedirectButton type="login" />
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="auth-required">
                <div className="status-message error">
                    <h3>Требуется авторизация</h3>
                    <AuthRedirectButton type="register" variant="primary" fullWidth={true} />
                </div>
            </div>
        )
    }

    return (
        <div className='profile_grid'>
            <div className="main-content">
                <ProfileUser user={profile} />
                <ProfileTagsRoles user={profile} />
                <ProfileAuthorOfProjects user={profile} />
            </div>

            <div className="sidebar">
                <div className="sidebar-content">
                    <div className="sidebar-item">
                    </div>
                </div>
            </div>
        </div>
    )
}