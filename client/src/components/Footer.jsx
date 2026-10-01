import { Link } from 'react-router-dom'

export default function Footer() { return <footer className="footer"><div><Link to="/" className="brand"><span className="brand-mark">H</span><span>havenly</span></Link><p>Places with a little more feeling.</p></div><div className="footer-links"><Link to="/properties">Explore homes</Link><Link to="/favorites">Saved homes</Link><Link to="/add-property">List your place</Link></div><small>© 2026 Havenly</small></footer> }
