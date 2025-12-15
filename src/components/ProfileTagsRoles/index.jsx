import './style.css'
import TagsName from "../../components/TagsName"
import RolesName from "../../components/RolesName"

export default function ProfileTagsRoles({ user }) {
    if (!user) return null;

    // Получаем теги и роли пользователя из объекта user
    const { user_tags = [], user_roles = [] } = user;

    return (
        <div className='tags_and_roles'>
            <div className='section-header-profile'>
                <h2>Навыки и интересы</h2>
            </div>

            <div className='sections_container'>
                <div className='tags_section'>
                    <div className='section-title'>
                        <h3>Часто используемые теги</h3>
                    </div>
                    <div className='content_wrapper'>
                        {user_tags.length > 0 ? (
                            <TagsName tags={user_tags} />
                        ) : (
                            <p className="empty-message">Вы пока не добавили теги</p>
                        )}
                    </div>
                </div>

                <div className='roles_section'>
                    <div className='section-title'>
                        <h3>Мои роли</h3>
                    </div>
                    <div className='content_wrapper'>
                        {user_roles.length > 0 ? (
                            <RolesName roles={user_roles} />
                        ) : (
                            <p className="empty-message">Вы пока не выбрали роли</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
