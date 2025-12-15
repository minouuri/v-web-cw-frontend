import { projectsData } from '../data';
import ProjectCard from '../components/ProjectCard';

export default function ProjectList() {
    return (
        <div className="project-list">
            {projectsData.map(pr => (
                <ProjectCard key={pr.id} project={pr} />
            ))}
        </div>
    );
}
