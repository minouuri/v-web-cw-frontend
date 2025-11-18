import './style.css'

import ProfileUser from "../../components/ProfileUser"
import ProfileTagsRoles from "../../components/ProfileTagsRoles"
import ProfileAuthorOfProjects from "../../components/ProfileAuthorOfProjects"
import ProfileProjectParticipant from "../../components/ProfileProjectParticipant"
import { usersData } from '../../users';

export default function Profile(){
    const currentUser = usersData[1]; 

    return(
        <div className='profile_grid'>
            <div className="main-content">
                <ProfileTagsRoles user={currentUser} />
                {/* <ProfileAuthorOfProjects></ProfileAuthorOfProjects> */}
                {/* <ProfileProjectParticipant></ProfileProjectParticipant> */}
            </div>
            <div className="sidebar">
                <ProfileUser></ProfileUser>
            </div>
        </div>
    )
}