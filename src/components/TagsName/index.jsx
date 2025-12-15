import './TagsName.css'

export default function TagsName({ tags }) {
    return (
        <div className="tags_container">
            {tags?.map((tag, index) => (
                <span key={index} className="tag-name">{tag}</span>
            ))}
        </div>
    )
}
