import { LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function Register() {
  const submit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">

        <Link to="/" className="auth-brand">
          <span className="auth-mark">H</span>
          <span>havenly</span>
        </Link>

        <p className="auth-eyebrow">
          Make yourself at home
        </p>

        <h1 className="auth-heading">
          Create your account
        </h1>

        <p className="auth-intro">
          Save your favorites and keep your next chapter in one place.
        </p>

        <form onSubmit={submit}>

          <div className="auth-field">
            <label
              htmlFor="register-name"
              className="auth-label"
            >
              Full name
            </label>

            <div className="auth-input-wrap">
              <UserRound
                size={17}
                color="var(--olive)"
              />

              <input
                id="register-name"
                name="name"
                required
                type="text"
                autoComplete="name"
                placeholder="Alex Morgan"
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-field">
            <label
              htmlFor="register-email"
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
                id="register-email"
                name="email"
                required
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-field">
            <label
              htmlFor="register-password"
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
                id="register-password"
                name="password"
                required
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-field">
            <label
              htmlFor="register-confirm-password"
              className="auth-label"
            >
              Confirm password
            </label>

            <div className="auth-input-wrap">
              <LockKeyhole
                size={17}
                color="var(--olive)"
              />

              <input
                id="register-confirm-password"
                name="confirmPassword"
                required
                type="password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                className="auth-input"
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Create account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link
            to="/login"
            className="auth-link"
          >
            Sign in
          </Link>
        </p>

      </section>
    </main>
  )
}