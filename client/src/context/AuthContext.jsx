import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('havenly-user') || 'null'))

  const signIn = () => {
    const nextUser = { name: 'Alex Morgan', email: 'alex@example.com', image: '' }
    localStorage.setItem('havenly-user', JSON.stringify(nextUser))
    setUser(nextUser)
  }

  const signOut = () => {
    localStorage.removeItem('havenly-user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
