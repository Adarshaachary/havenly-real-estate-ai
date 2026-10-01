import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import heroImage from '../assets/hero.png'

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-copy">

        <div className="hero-eyebrow">
          <span className="hero-eyebrow-icon">
            <Sparkles size={14} />
          </span>

          <span>AI-powered property discovery</span>

          <span className="hero-live-dot" />
          <span className="hero-live-text">Live</span>
        </div>

        <h1>
          Find a place
          <br />
          <em>that feels like you.</em>
        </h1>

        <p className="hero-lede">
          Discover homes that match the way you actually want to live.
          Search naturally, explore thoughtfully selected properties,
          and let Havenly help you find the right fit.
        </p>

        <div className="hero-search-wrapper">

          <div className="hero-search-label">
            <Sparkles size={14} />
            <span>What are you looking for?</span>
          </div>

          <SearchBar />

        </div>

        <div className="hero-actions">

          <Link
            className="hero-primary-link"
            to="/properties"
          >
            Explore properties
            <ArrowRight size={16} />
          </Link>

          <Link
            className="hero-secondary-link"
            to="/properties"
          >
            View all homes
          </Link>

        </div>

        <div className="hero-trust">

          <div className="hero-trust-icon">
            <ShieldCheck size={15} />
          </div>

          <div>
            <strong>Designed around your search</strong>
            <span>Useful property information without the noise.</span>
          </div>

        </div>

      </div>

      <div className="hero-visual">

        <div className="hero-image-frame">

          <img
            src={heroImage}
            alt="Modern luxury home surrounded by nature"
          />

          <div className="hero-image-overlay" />

          <div className="hero-image-label">
            <span>Featured residence</span>
            <strong>Thoughtful spaces. Better living.</strong>
          </div>

        </div>

        <div className="hero-ai-card">

          <div className="hero-ai-icon">
            <Sparkles size={16} />
          </div>

          <div className="hero-ai-content">
            <span>Havenly AI</span>
            <strong>Search by what matters to you.</strong>
          </div>

          <div className="hero-ai-status">
            <span />
          </div>

        </div>

        <div className="hero-location-card">
          <span className="hero-location-number">01</span>

          <div>
            <span>Start with</span>
            <strong>a feeling.</strong>
          </div>
        </div>

      </div>

    </section>
  )
}