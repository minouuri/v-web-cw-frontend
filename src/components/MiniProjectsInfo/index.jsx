import './style.css'
import TagsName from '../TagsName'
import RolesName from '../RolesName'
import AuthorBadge from '../AuthorBadge'
import { Link } from 'react-router-dom'

export default function MiniProjectsInfo({ project, showAuthor = true, minimalView = false, isCurrentUserProject = false }) {
    const { id, name_of_project, author_of_project, tags_of_project, roles_in_the_project, description, date_of_publication, status } = project

    if (minimalView) {
        return (
            <div className='mini-project-card minimal'>
                <Link to={`/project/${id}`} className="mini-project-card-link">
                    <h3>{name_of_project}</h3>
                </Link>
                <span className="project-date">{new Date(date_of_publication).toLocaleDateString()}</span>
            </div>
        )
    }

    return (
        <div className='mini-project-card'>
            <div className="mini-project-left-column">
                <Link to={`/project/${id}`} className="mini-project-card-link">
                    <h3>{name_of_project}</h3>
                </Link>

                <div className="tags_roles_wrapper">
                    <TagsName tags={tags_of_project} />
                    <RolesName roles={roles_in_the_project} />
                </div>

                {showAuthor && (
                    <div className="author-meta mobile-only">
                        <AuthorBadge author={author_of_project} />
                    </div>
                )}
            </div>

            <div className="mini-project-right-column">
                <div className="mini-project-meta">
                    {showAuthor && (
                        <div className="author-meta desktop-only">
                            <AuthorBadge author={author_of_project} />
                        </div>
                    )}
                    <div className="date-status-meta">
                        <span className="project-date">{new Date(date_of_publication).toLocaleDateString()}</span>
                        <span className={`project-status ${status}`}></span>
                    </div>
                </div>

                {isCurrentUserProject && (
                    <div className="mini-project-actions">
                        <Link to={`/project/${id}/edit`} className="mini-action-link edit-link">
                            Редактировать
                        </Link>
                        <Link to={`/project/${id}`} className="mini-action-link view-link">
                            Посмотреть
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

