import './style.css'
import { useState } from 'react'
import CreateProjectForm from '../../components/CreateProjectForm'

export default function ButtonCreateProject() {
    const [showCreateForm, setShowCreateForm] = useState(false)

    return (
        <div className="button-container">
            <button
                className="create-project-btn"
                onClick={() => setShowCreateForm(true)}
            >
                <svg
                    className="plus_icon"
                    width="20"
                    height="20"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M0.5 6H6M6 6H11.5M6 6V11.5M6 6V0.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Создать проект
            </button>

            {showCreateForm && (
                <CreateProjectForm
                    onClose={() => setShowCreateForm(false)}
                />
            )}
        </div>
    )
}
