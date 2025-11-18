
import './style.css'

import ButtonCreateProject from "../../components/ButtonCreateProject"
import ProjectCard from "../../components/ProjectCard"
import { projectsData } from '../../data';

export default function Home(){
    return(
        <div>
            <ButtonCreateProject></ButtonCreateProject>
            <div className="cards_grid">
                {projectsData.map(project => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        </div>
    )
}