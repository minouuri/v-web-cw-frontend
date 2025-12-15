import './style.css'
import { useState } from 'react'
import RespondForm from "../../components/RespondForm"

export default function MiniProjectButtons({ projectId, projectName, availableRoles }) {
    const [showApplyModal, setShowApplyModal] = useState(false)

    const handleApply = () => setShowApplyModal(true)
    const handleClose = () => setShowApplyModal(false)
    const handleSubmit = (data) => {
        console.log('Apply', data)
        handleClose()
    }

    const handleBookmark = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                alert('Чтобы добавлять в закладки, войдите в аккаунт')
                return
            }

            const res = await fetch('http://localhost:5000/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ project_id: projectId })
            })

            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.error || 'Не удалось добавить в закладки')
            }
        } catch (e) {
            console.error('Ошибка добавления в закладки:', e)
            alert(e.message)
        }
    }

    return (
        <div className='buttons_project'>
            <button className='button_share'>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.70696 11.3644L11.3638 5.70757M3.58601 7.82866L2.1718 9.24287C0.609702 10.805 0.609249 13.3378 2.17135 14.8999C3.73344 16.462 6.26686 16.4616 7.82896 14.8995L9.24166 13.4854M7.82805 3.58565L9.24226 2.17143C10.8044 0.609336 13.3367 0.609615 14.8988 2.17171C16.4609 3.73381 16.4608 6.26649 14.8987 7.82859L13.4853 9.24276" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className='button_bookmarks' onClick={handleBookmark}>
                <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.2002V13.6854C1 15.0464 1 15.7268 1.20412 16.1433C1.58245 16.9151 2.41157 17.3588 3.26367 17.2454C3.7234 17.1842 4.28964 16.8067 5.4221 16.0518L5.42481 16.0499C5.87368 15.7507 6.09815 15.6011 6.33295 15.5181C6.76421 15.3656 7.23476 15.3656 7.66602 15.5181C7.90129 15.6012 8.12664 15.7515 8.57732 16.0519C9.70978 16.8069 10.2767 17.1841 10.7364 17.2452C11.5885 17.3586 12.4176 16.9151 12.7959 16.1433C13 15.7269 13 15.0462 13 13.6854V4.19691C13 3.07899 13 2.5192 12.7822 2.0918C12.5905 1.71547 12.2837 1.40973 11.9074 1.21799C11.4796 1 10.9203 1 9.8002 1H4.2002C3.08009 1 2.51962 1 2.0918 1.21799C1.71547 1.40973 1.40973 1.71547 1.21799 2.0918C1 2.51962 1 3.08009 1 4.2002Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className='button_respond' onClick={handleApply}>
                Откликнуться
            </button>

            {showApplyModal && (
                <RespondForm
                    projectId={projectId}
                    projectName={projectName}
                    availableRoles={availableRoles || []}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    )
}
