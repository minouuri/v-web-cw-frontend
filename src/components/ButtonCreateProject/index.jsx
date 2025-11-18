import './style.css'

import './style.css'

export default function ButtonCreateProject() {
    return (
        <div>
            <button className="button_create_project">
                <svg className='plus_icon' width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M0.5 6H6M6 6H11.5M6 6V11.5M6 6V0.5" 
                        stroke="black" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                    />
                </svg>
                Создать проект
            </button>
        </div>
    )
}