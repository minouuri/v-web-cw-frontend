import './style.css'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProjectApplications({ applications, roles = [], onAccept, onReject }) {
    const navigate = useNavigate()
    const [selectedRole, setSelectedRole] = useState('all')

    const handleAccept = (appId, role) => {
        onAccept(appId, role);
    };

    const handleReject = (appId) => {
        onReject(appId);
    };

    const uniqueRoles = useMemo(
        () => Array.from(new Set(roles)).filter(Boolean),
        [roles]
    )

    const filteredApplications = useMemo(
        () => selectedRole === 'all'
            ? applications
            : applications.filter(app => app.role === selectedRole),
        [applications, selectedRole]
    )

    const handleViewProfile = (app) => {
        if (app.userId) {
            navigate(`/profile/${app.userId}`)
        } else {
            navigate('/profile')
        }
    }

    return (
        <div className="applications_tab">
            <div className="applications_filters">
                <div className="filter_group">
                    <span>Фильтр по роли:</span>
                    <select
                        className="filter_select"
                        value={selectedRole}
                        onChange={e => setSelectedRole(e.target.value)}
                    >
                        <option value="all">Все роли</option>
                        {uniqueRoles.map(role => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="applications_list">
                {filteredApplications.map(app => (
                    <div key={app.id} className="application_card">
                        <div className="app_header">
                            <div className="app_user_info">
                                <div className="user_info_row">
                                    <div className="user_name">{app.user}</div>
                                    <div className="app_role">{app.role}</div>
                                </div>
                                <div className="app_date">{app.date}</div>
                            </div>
                            <div className="app_actions">
                                <button className="btn_accept" onClick={() => handleAccept(app.id, app.role)}>
                                    Принять
                                </button>
                                <button className="btn_reject" onClick={() => handleReject(app.id)}>
                                    Отклонить
                                </button>
                            </div>
                        </div>
                                    
                        <div className="app_message">{app.message}</div>
                        
                        <div className="app_footer">
                            <button lassName="btn_view_profile" onClick={() => handleViewProfile(app)}>
                                Посмотреть профиль
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}