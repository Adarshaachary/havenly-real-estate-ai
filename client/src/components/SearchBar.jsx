import { Search, SlidersHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function SearchBar({ compact = false }) { const [query, setQuery] = useState(''); const navigate = useNavigate(); const submit = (event) => { event.preventDefault(); navigate(`/properties${query ? `?q=${encodeURIComponent(query)}` : ''}`) }; return <form className={`search-bar ${compact ? 'compact' : ''}`} onSubmit={submit}><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by city, neighborhood or mood" /><button type="button" className="filter-button" aria-label="Filters"><SlidersHorizontal size={18} /> {!compact && 'Filters'}</button><button className="search-submit" type="submit">Search</button></form> }
