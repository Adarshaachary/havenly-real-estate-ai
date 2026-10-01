import { LockKeyhole, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const submit = (event) => {
    event.preventDefault()

    // Temporary frontend authentication
    signIn()

    // Go to Havenly home page after signing in
    navigate('/home')
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">

        {/* Havenly Brand */}
        <Link to="/" className="auth-brand">
          <span className="auth-mark">H</span>
          <span>havenly</span>
        </Link>

        {/* Heading */}
        <p className="auth-eyebrow">
          Welcome back
        </p>

        <h1 className="auth-heading">
          Sign in to Havenly
        </h1>

        <p className="auth-intro">
          Keep track of the homes and places that feel like yours.
        </p>

        {/* Login Form */}
        <form onSubmit={submit}>

          {/* Email */}
          <div className="auth-field">
            <label
              htmlFor="login-email"
              className="auth-label"
            >
              Email address
            </label>

            <div className="auth-input-wrap">
              <Mail
                size={17}
                color="var(--olive)"
              />

              <input
                id="login-email"
                name="email"
                required
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="auth-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label
              htmlFor="login-password"
              className="auth-label"
            >
              Password
            </label>

            <div className="auth-input-wrap">
              <LockKeyhole
                size={17}
                color="var(--olive)"
              />

              <input
                id="login-password"
                name="password"
                required
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="auth-input"
              />
            </div>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="auth-button"
          >
            Sign in
          </button>

        </form>

        {/* Register Link */}
        <p className="auth-switch">
          New to Havenly?{' '}
          <Link
            to="/register"
            className="auth-link"
          >
            Create an account
          </Link>
        </p>

      </section>
    </main>
  )
}