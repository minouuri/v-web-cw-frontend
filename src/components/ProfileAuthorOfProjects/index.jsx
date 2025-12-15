import './style.css'
import MiniProjectsInfo from '../../components/MiniProjectsInfo'

export default function ProfileAuthorOfProjects({ user }) {
    if (!user) return null;

    return(
        <div className='author_of_projects'>
            <div className='section-header-profile'>
                <h2>Мои проекты</h2>
            </div>
            
            <div className='projects-grid'>
                {user.projects && user.projects.length > 0 ? (
                    user.projects.map(project => (
                        <MiniProjectsInfo
                            key={project.id}
                            project={{
                                id: project.id,
                                name_of_project: project.name,
                                date_of_publication: project.created_at
                            }}
                            showAuthor={false}
                            minimalView={true}
                        />
                    ))
                ) : (
                    <p>У вас пока нет проектов</p>
                )}
            </div>
        </div>
    )
}
