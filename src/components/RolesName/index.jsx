import './style.css'

export default function RolesName({ roles }) {
    return (
        <div className="roles_container">
            {roles?.map((role, index) => (
                <span key={index} className="role">{role}</span>
            ))}
        </div>
    )
}
