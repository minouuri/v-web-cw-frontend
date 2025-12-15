import './style.css'
import { useNavigate } from 'react-router-dom'
import UserProfileAvatar from '../UserProfileAvatar'

export default function UserName({ user }) {
    const navigate = useNavigate()
    const username = user?.username || 'П'

    const handleClick = () => {
        navigate('/profile')
    }

    return (
        <div className="user-name" onClick={handleClick}>
            <UserProfileAvatar username={username} size="sm" />

            <span className="user-text">
                {username}
            </span>
        </div>
    )
}
