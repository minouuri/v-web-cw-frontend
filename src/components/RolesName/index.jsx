import './RolesName.css'

export default function RolesName({ roles }) {
    return (
        <div className="roles_container">
            {roles?.map((role, index) => (
                <span key={index} className="role-name">{role}</span>
            ))}
        </div>
    )
}
