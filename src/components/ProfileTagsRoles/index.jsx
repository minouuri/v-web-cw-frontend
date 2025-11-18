import './style.css'

import TagsName from "../../components/TagsName"
import RolesName from "../../components/RolesName"

export default function ProfileTagsRoles({ user }){
    if(!user) return null;

    const { favorite_tags, roles } = user; 
    return(
        <div className='tags_and_roles'>
            <div className='tags_name'>
                <h3>Теги</h3>
                <TagsName tags={favorite_tags} />
            </div>
            <div className='roles_name'>
                <h3>Роли</h3>
                <RolesName roles={roles} />
            </div>
        </div>
    )
}
