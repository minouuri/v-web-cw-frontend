import './style.css'

export default function ProjectTeam({ team, onRemoveMember }) {
    const handleRemoveMember = (member) => {
        onRemoveMember(member);
    };

    return (
        <div className="team_tab">
            <div className="team_management">
                <h3>Участники проекта</h3>
                
                <div className="team_content">
                    <div className="team_table">
                        {team.map(member => (
                            <div key={member.id} className="team_member_row">
                                <div className="member_role">{member.role}</div>
                                <div className="member_user">
                                    {member.user ? (
                                        <>
                                            <span className="user_name">{member.user}</span>
                                            {member.joinDate && (
                                                <span className="join_date">с {member.joinDate}</span>
                                            )}
                                        </>
                                    ) : (
                                        <span className="empty_role">Роль свободна</span>
                                    )}
                                </div>
                                <div className="member_actions">
                                    {member.user && !member.isOwner ? (
                                        <button 
                                            className="btn_remove"
                                            onClick={() => handleRemoveMember(member)}
                                        >
                                            Удалить
                                        </button>
                                    ) : member.user && member.isOwner ? (
                                        <span className="owner_badge">Автор</span>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}