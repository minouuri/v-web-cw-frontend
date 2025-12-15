import './style.css'
import { useMemo } from 'react'

export default function UserProfileAvatar({ username, size = 'md' }) {
    const initial = username ? username[0].toUpperCase() : 'U'

    const avatarColor = useMemo(() => {
        const colors = [
            '#FF6B6B',
            '#6BCB77',
            '#4D96FF',
            '#FFC75F',
            '#845EC2',
            '#00C9A7'
        ]

        let hash = 0
        for (let i = 0; i < username?.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash)
        }

        return colors[Math.abs(hash) % colors.length]
    }, [username])

    return (
        <div
            className={`user_avatar user_avatar--${size}`}
            style={{ backgroundColor: avatarColor }}
        >
            <span className="avatar_initials">
                {initial}
            </span>
        </div>
    )
}
