import './style.css'

import TagsName from '../TagsName';
import RolesName from '../RolesName';

export default function ProjectCard({ project }) { 
    const { name_of_project, author_of_project, tags_of_project, roles_in_the_project, description } = project; 
    return ( 
        <div className="project_card"> 
            <h3>{name_of_project}</h3> 
            <p className="author_text">{author_of_project}</p> 
            <div className="tags_roles_wrapper">
                <TagsName tags={tags_of_project} />
                <RolesName roles={roles_in_the_project} />
            </div>
            <div className="description_container"> 
                <p className="description_text">{description}</p>
            </div>
            <div className='buttons_project'>
                <button className='button_bookmarks'>В закладки</button>
                <button className='button_respond'>Откликнутся</button>
            </div>
        </div> 
        ) 
    } 