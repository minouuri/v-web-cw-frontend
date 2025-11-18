import './style.css'

export default function TagsName({ tags }) {
    return (
        <div className="tags_container">
            {tags?.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
            ))}
        </div>
    )
}
