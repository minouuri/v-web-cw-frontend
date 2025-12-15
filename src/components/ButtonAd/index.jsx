import './style.css'

export default function Button_ad({ children }) {
    function handleClick() {
        
    }

    return <button className="button_ad" onClick={handleClick}>
        { children }
    </button>
} 