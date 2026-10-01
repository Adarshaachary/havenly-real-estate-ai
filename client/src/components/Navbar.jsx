import { Link, NavLink } from 'react-router-dom'
import { Heart, Plus, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, signIn } = useAuth()
  return <header className="navbar"><Link to="/" className="brand"><span className="brand-mark">H</span><span>havenly</span></Link><nav className="nav-links"><NavLink to="/properties">Explore</NavLink><NavLink to="/bookings">Visits</NavLink><NavLink to="/add-property">List a home</NavLink></nav><div className="nav-actions"><Link className="icon-button" to="/favorites" aria-label="Favorites" title="Favorites"><Heart size={19} /></Link>{user ? <button className="avatar" onClick={() => window.alert(`Signed in as ${user.name}`)}><UserRound size={18} /></button> : <button className="signin" onClick={signIn}>Sign in <UserRound size={16} /></button>}</div></header>
}
