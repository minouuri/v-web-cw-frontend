import { useState } from 'react'
import Step1Form from '../Step1Form'
import Step2Preview from '../Step2Preview'
import './style.css'

export default function CreateProjectForm({ onClose, onSubmit }) {
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        tags: [],
        required_roles: [],
        contact_info: '',
        start_date: '',
        duration: '',
        difficulty: '',
        team_size: ''
    })

    const nextStep = () => setCurrentStep(prev => prev + 1)
    const prevStep = () => setCurrentStep(prev => prev - 1)
    const updateFormData = (newData) => setFormData(prev => ({ ...prev, ...newData }))

    const handleSubmit = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const token = localStorage.getItem('token')
            if (!token) throw new Error('Требуется авторизация.')

            const projectData = {
                name: formData.name,
                description: formData.description,
                tags: formData.tags,
                required_roles: formData.required_roles,
                contact_info: formData.contact_info,
                start_date: formData.start_date || null,
                duration: formData.duration ? parseInt(formData.duration) : null,
                difficulty: formData.difficulty || 'Средняя',
                team_size: formData.required_roles.length
            }

            const res = await fetch("http://localhost:5000/api/add_project", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(projectData)
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Ошибка создания проекта')

            if (onSubmit) onSubmit(data)
            onClose()
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="create-project-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="header-left">
                        <h2>Создание проекта</h2>
                        <div className="progress-steps">
                            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                                <div className="step-circle">1</div>
                                <span className="step-title">Информация</span>
                            </div>
                            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                                <div className="step-circle">2</div>
                                <span className="step-title">Публикация</span>
                            </div>
                        </div>
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="form-content">
                    {currentStep === 1 && <Step1Form formData={formData} updateFormData={updateFormData} onNext={nextStep} onClose={onClose} />}
                    {currentStep === 2 && <Step2Preview formData={formData} onSubmit={handleSubmit} onBack={prevStep} />}
                </div>

                {error && <div className="form-error">{error}</div>}
            </div>
        </div>
    )
}
