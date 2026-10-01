import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Hero from '../components/Hero'
import PropertyCard from '../components/PropertyCard'
import { getProperties, fallbackProperties } from '../services/propertyService'
import heroImage from '../assets/hero.png'

export default function Home() {
  /*
   * Start with the local fallback properties.
   *
   * This means the property cards appear immediately
   * instead of waiting for MongoDB/API.
   */
  const [properties, setProperties] = useState(
    fallbackProperties || []
  )

  useEffect(() => {
    let isMounted = true

    const loadProperties = async () => {
      try {
        const data = await getProperties()

        /*
         * If backend data is available, replace the
         * fallback properties with the real database data.
         */
        if (
          isMounted &&
          Array.isArray(data) &&
          data.length > 0
        ) {
          setProperties(data)
        }
      } catch (error) {
        /*
         * If backend is unavailable, keep showing
         * the fallback properties.
         */
        console.warn(
          'Backend properties unavailable. Keeping local properties.',
          error
        )
      }
    }

    loadProperties()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="home-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero />

      {/* =====================================================
          AI DISCOVERY STRIP
      ===================================================== */}

      <section className="ai-discovery-section">
        <div className="ai-discovery-inner">

          <div className="ai-discovery-heading">
            <div className="ai-status">
              <span className="ai-status-dot" />
              AI property discovery
            </div>

            <h2>
              Search the way
              <br />
              <em>you think.</em>
            </h2>

            <p>
              Describe the kind of place you want in your own words.
              Havenly AI helps turn your idea into a property search.
            </p>
          </div>

          <div className="ai-search-card">

            <div className="ai-search-top">
              <div className="ai-search-brand">

                <div className="ai-spark-icon">
                  <Sparkles size={17} />
                </div>

                <div>
                  <strong>Havenly AI</strong>
                  <span>Intelligent property assistant</span>
                </div>

              </div>

              <span className="ai-live">
                <span />
                Online
              </span>
            </div>

            <div className="ai-search-input">
              <Search size={18} />

              <span>
                Try “3BHK near Bengaluru under ₹80L”
              </span>

              <button
                type="button"
                aria-label="Start AI search"
              >
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="ai-suggestions">
              <span>Try:</span>

              <Link to="/properties">
                Beachside villa
              </Link>

              <Link to="/properties">
                Family home
              </Link>

              <Link to="/properties">
                Investment property
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          TRUST / STATS
      ===================================================== */}

      <section className="stats-section">
        <div className="stats-inner">

          <div className="stat-item">
            <strong>9,000+</strong>
            <span>Properties listed</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <strong>28+</strong>
            <span>Locations covered</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <strong>2,000+</strong>
            <span>Happy residents</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <strong>24/7</strong>
            <span>AI assistance</span>
          </div>

        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="home-section intro-section">

        <div className="section-kicker">
          <span>01</span>
          <p>Why Havenly</p>
        </div>

        <div className="intro-grid">

          <div className="intro-title">
            <h2>
              Real homes.
              <br />
              <em>Smarter discovery.</em>
            </h2>
          </div>

          <div className="intro-copy">

            <p className="intro-lede">
              Finding a property shouldn't mean opening dozens of tabs,
              comparing endless listings and hoping something feels right.
            </p>

            <p>
              Havenly brings property discovery, useful information and
              intelligent assistance together in one focused experience.
            </p>

            <Link
              to="/properties"
              className="text-link"
            >
              Explore properties
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURED PROPERTIES
      ===================================================== */}

      <section className="home-section featured-section">

        <div className="section-heading">

          <div className="section-heading-left">

            <div className="section-kicker">
              <span>02</span>
              <p>Curated discovery</p>
            </div>

            <h2>
              Places worth
              <br />
              <em>looking closer at.</em>
            </h2>

            <p className="section-description">
              Explore a selection of residences available through
              Havenly's property experience.
            </p>

          </div>

          <Link
            className="round-link"
            to="/properties"
            aria-label="View all properties"
          >
            <ArrowUpRight size={21} />
          </Link>

        </div>

        {/* ===================================================
            PROPERTY CARDS
        =================================================== */}

        <div className="property-grid">

          {properties.slice(0, 4).map(
            (property, index) => (
              <PropertyCard
                key={property.id || index}
                property={property}
                featured={index === 0}
              />
            )
          )}

        </div>

        {/* ===================================================
            FEATURED FOOTER
        =================================================== */}

        {properties.length > 0 && (
          <div className="featured-footer">

            <span>
              Showing{' '}
              {Math.min(properties.length, 4)}
              {' '}selected residences
            </span>

            <Link
              to="/properties"
              className="outline-link"
            >
              View all properties
              <ArrowRight size={15} />
            </Link>

          </div>
        )}

      </section>

      {/* =====================================================
          INTELLIGENT PROPERTY EXPERIENCE
      ===================================================== */}

      <section className="intelligence-section">

        <div className="intelligence-inner">

          <div className="intelligence-image">

            <img
              src={heroImage}
              alt="Modern Havenly residence"
            />

            <div className="image-floating-card">

              <div className="floating-card-icon">
                <Sparkles size={16} />
              </div>

              <div>
                <strong>AI matched</strong>
                <span>
                  Based on your preferences
                </span>
              </div>

            </div>

          </div>

          <div className="intelligence-content">

            <div className="section-kicker">
              <span>03</span>
              <p>Intelligent by design</p>
            </div>

            <h2>
              Less scrolling.
              <br />
              <em>More certainty.</em>
            </h2>

            <p className="intelligence-lede">
              Havenly combines a clean property experience with
              intelligent tools that help you make sense of your options.
            </p>

            <div className="intelligence-list">

              <div className="intelligence-item">

                <div className="intelligence-icon">
                  <MapPin size={17} />
                </div>

                <div>
                  <h3>
                    Search around your life
                  </h3>

                  <p>
                    Discover properties based on locations and requirements
                    that actually matter to you.
                  </p>
                </div>

              </div>

              <div className="intelligence-item">

                <div className="intelligence-icon">
                  <TrendingUp size={17} />
                </div>

                <div>
                  <h3>
                    Understand your options
                  </h3>

                  <p>
                    Compare useful property information before deciding
                    which homes deserve a closer look.
                  </p>
                </div>

              </div>

              <div className="intelligence-item">

                <div className="intelligence-icon">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <h3>
                    Move with confidence
                  </h3>

                  <p>
                    Save properties, book visits and keep your discovery
                    process organised in one place.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          AI FEATURE PANEL
      ===================================================== */}

      <section className="ai-feature-section">

        <div className="ai-feature-inner">

          <div className="ai-feature-copy">

            <div className="section-kicker section-kicker-light">
              <span>04</span>
              <p>Meet your property assistant</p>
            </div>

            <h2>
              Tell us what
              <br />
              <em>you're looking for.</em>
            </h2>

            <p>
              You don't need to know exactly what to search for.
              Describe your requirements naturally and let Havenly
              help you explore the possibilities.
            </p>

            <Link
              to="/properties"
              className="ai-feature-button"
            >
              Start exploring
              <ArrowRight size={16} />
            </Link>

          </div>

          <div className="ai-preview">

            <div className="ai-preview-header">

              <div className="ai-preview-user">

                <div className="preview-avatar">
                  A
                </div>

                <div>
                  <strong>Havenly AI</strong>
                  <span>Property assistant</span>
                </div>

              </div>

              <div className="preview-status">
                <span />
                Ready
              </div>

            </div>

            <div className="chat-preview">

              <div className="user-message">
                I need a quiet 2BHK near the city with good connectivity.
              </div>

              <div className="ai-message">

                <div className="ai-message-icon">
                  <Sparkles size={14} />
                </div>

                <div>

                  <strong>
                    Here's how I can help.
                  </strong>

                  <p>
                    I can help narrow properties by location, property type,
                    budget and other preferences.
                  </p>

                  <div className="ai-match-row">

                    <span>
                      <Check size={12} />
                      Location
                    </span>

                    <span>
                      <Check size={12} />
                      Budget
                    </span>

                    <span>
                      <Check size={12} />
                      Property type
                    </span>

                  </div>

                </div>

              </div>

            </div>

            <div className="ai-preview-input">
              <span>
                Describe your ideal property...
              </span>

              <ArrowRight size={16} />
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-cta-section">

        <div className="final-cta-inner">

          <div className="final-cta-copy">

            <div className="section-kicker">
              <span>05</span>
              <p>Start your search</p>
            </div>

            <h2>
              Your next place
              <br />
              could be <em>closer.</em>
            </h2>

            <p>
              Explore properties, save your favourites and use Havenly AI
              whenever you need a little help.
            </p>

          </div>

          <Link
            to="/properties"
            className="final-cta-button"
          >
            Explore properties
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>

    </div>
  )
}