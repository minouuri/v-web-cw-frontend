import { Link } from 'react-router-dom'
import './style.css'
import TagsName from '../TagsName'
import RolesName from '../RolesName'
import AuthorBadge from '../AuthorBadge'
import MiniProjectButtons from '../MiniProjectButtons'

export default function ProjectCard({ project }) {
    const {
        id,
        name,
        description,
        tags,
        required_roles,
        author_username
    } = project

    return (
        <div className="project-card">
            <div className="project-header">
                <Link to={`/project/${id}`} className="project-card-link">
                    <h3>{name}</h3>
                </Link>

                <AuthorBadge author={author_username} authorId={project.author_id} showBadge />
            </div>

            <div className="tags_roles_wrapper">
                <TagsName tags={tags || []} />
                <RolesName roles={required_roles || []} />
            </div>

            <div className="description-container">
                <p className="description-text">{description}</p>
            </div>

            <div className="project-actions">
                <div className="project-actions">
                    <MiniProjectButtons
                        projectId={id}
                        projectName={name}
                        availableRoles={required_roles || []}
                    />
                </div>
            </div>
        </div>
    )
}

