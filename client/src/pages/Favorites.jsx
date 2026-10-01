import { useEffect, useRef, useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import { getProperties } from '../services/propertyService'
import { getFavorites } from '../services/userService'
import '../styles/favorites.css'

export default function Favorites() {
  const [properties, setProperties] = useState([])
  const [removingIds, setRemovingIds] = useState([])
  const previousFavoriteIds = useRef([])

  useEffect(() => {
    let mounted = true

    const loadFavorites = async () => {
      try {
        const items = await getProperties()

        if (!mounted) return

        const favoriteIds = getFavorites()

        const savedProperties = items.filter((item) =>
          favoriteIds.includes(item.id)
        )

        setProperties(savedProperties)
        previousFavoriteIds.current = favoriteIds
      } catch (error) {
        console.error('Failed to load saved homes:', error)

        if (mounted) {
          setProperties([])
        }
      }
    }

    loadFavorites()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const checkFavorites = () => {
      const currentFavoriteIds = getFavorites()

      const removedIds = previousFavoriteIds.current.filter(
        (id) => !currentFavoriteIds.includes(id)
      )

      if (removedIds.length > 0) {
        setRemovingIds((current) => {
          const newIds = removedIds.filter(
            (id) => !current.includes(id)
          )

          if (newIds.length === 0) {
            return current
          }

          return [...current, ...newIds]
        })

        setTimeout(() => {
          setProperties((currentProperties) =>
            currentProperties.filter(
              (property) => !removedIds.includes(property.id)
            )
          )

          setRemovingIds((current) =>
            current.filter((id) => !removedIds.includes(id))
          )
        }, 850)
      }

      previousFavoriteIds.current = currentFavoriteIds
    }

    const interval = setInterval(checkFavorites, 150)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="page-wrap collection-page">
      <p className="eyebrow">Your shortlist</p>

      <h1>
        Places you
        <br />
        <em>keep thinking about.</em>
      </h1>

      {properties.length ? (
        <div className="property-grid">
          {properties.map((property) => {
            const isRemoving = removingIds.includes(property.id)

            return (
              <div
                key={property.id}
                className={`favorite-property-wrapper ${
                  isRemoving ? 'favorite-property-removing' : ''
                }`}
              >
                {isRemoving && (
                  <div className="stone-debris" aria-hidden="true">
                    <span className="stone-piece stone-piece-1" />
                    <span className="stone-piece stone-piece-2" />
                    <span className="stone-piece stone-piece-3" />
                    <span className="stone-piece stone-piece-4" />
                    <span className="stone-piece stone-piece-5" />
                    <span className="stone-piece stone-piece-6" />
                    <span className="stone-piece stone-piece-7" />
                    <span className="stone-piece stone-piece-8" />
                  </div>
                )}

                <PropertyCard property={property} />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Your saved homes will live here.</h2>
          <p>Tap the heart on a home that catches your eye.</p>
        </div>
      )}
    </section>
  )
}