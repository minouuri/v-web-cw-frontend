import './style.css'
import ProjectCard from "../../components/ProjectCard"
import ButtonCreateProject from "../../components/ButtonCreateProject"
import { useFilter } from '../../Context/FilterContext'

export default function Home() {
    const { sortedProjects } = useFilter();

    if (!sortedProjects.length) {
        return <div className="status-message loading">Загрузка проектов...</div>;
    }

    return (
        <div className="home_container">
            <ButtonCreateProject />

            <div className="cards_grid">
                {sortedProjects.length > 0 ? (
                    sortedProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                ) : (
                    <div className="no_projects">
                        <h3>Проекты не найдены</h3>
                        <p>Попробуйте изменить фильтры или сортировку</p>
                    </div>
                )}
            </div>
        </div>
    );
}

