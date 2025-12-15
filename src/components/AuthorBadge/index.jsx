import './style.css'

export default function AuthorBadge({ author, showBadge = false, onClick }) {
    if (!author) return <span className='author-name'>Неизвестный автор</span>;

    return (
        <div className='author-badge-container' onClick={onClick}>
            <span className='author-name'>{author}</span>
        </div>
    );
}
