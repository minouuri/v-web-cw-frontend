import './style.css';
import { useFilter } from '../../Context/FilterContext';

export default function SearchBar({ mobile }) {
    const { setSearchQuery, sortBy, filters, handleFilterChange } = useFilter();

    const onSearch = () => {
        handleFilterChange(filters);
    }

    return (
        <div className={`search_bar ${mobile ? 'mobile' : ''}`}>
            <input
                type="text"
                placeholder="Проекты"
                className="search-input"
                onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="search-btn" onClick={onSearch}>
                Поиск
            </button>
        </div>
    );
}
