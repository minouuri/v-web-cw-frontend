import './style.css'
import { useNavigate } from 'react-router-dom'

// Компонент требует author и authorId
export default function AuthorBadge({ author, authorId, showBadge = false }) {
    const navigate = useNavigate();
    if (!author) return <span className='author-name'>Неизвестный автор</span>;
    const handleClick = () => {
        if (authorId) {
            navigate(`/profile/${authorId}`)
        } else if (author) {
            navigate(`/profile?username=${author}`)
        }
    }
    return (
        <div className='author-badge-container' onClick={handleClick} style={{ cursor: "pointer" }}>
            <span className='author-name'>{author}</span>
        </div>
    );
}
