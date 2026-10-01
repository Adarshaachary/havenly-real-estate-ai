import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import PropertyCard from '../components/PropertyCard'
import SearchBar from '../components/SearchBar'

import {
  getProperties,
  fallbackProperties,
} from '../services/propertyService'

export default function Properties() {
  /*
   * Start with the local Havenly properties immediately.
   *
   * This prevents the page from showing a loading screen
   * while the backend is being contacted.
   */
  const [properties, setProperties] = useState(
    fallbackProperties || []
  )

  const [params] = useSearchParams()

  const [city, setCity] = useState('All places')

  // ============================================================
  // LOAD PROPERTIES
  // ============================================================

  useEffect(() => {
    let isMounted = true

    async function loadProperties() {
      try {
        const data = await getProperties()

        console.log(
          'Havenly properties loaded:',
          data
        )

        /*
         * If the backend returns real properties,
         * replace the fallback properties.
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
         * If backend fails, do nothing.
         *
         * The fallback properties are already visible,
         * so the user can continue using the page.
         */
        console.warn(
          'Backend unavailable. Keeping Havenly fallback properties.',
          error
        )
      }
    }

    /*
     * Fetch in the background.
     */
    loadProperties()

    return () => {
      isMounted = false
    }
  }, [])

  // ============================================================
  // SEARCH QUERY
  // ============================================================

  const query =
    params.get('q')?.trim().toLowerCase() || ''

  // ============================================================
  // FILTER PROPERTIES
  // ============================================================

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const text = `
        ${property.title || ''}
        ${property.city || ''}
        ${property.address || ''}
        ${property.description || ''}
        ${property.propertyType || ''}
      `.toLowerCase()

      const matchesSearch =
        !query || text.includes(query)

      const matchesCity =
        city === 'All places' ||
        property.city === city

      return matchesSearch && matchesCity
    })
  }, [properties, query, city])

  // ============================================================
  // CITY FILTERS
  // ============================================================

  const cities = useMemo(() => {
    const availableCities = properties
      .map((property) => property.city)
      .filter(Boolean)

    return [
      'All places',
      ...new Set(availableCities),
    ]
  }, [properties])

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="listing-page page-wrap">

      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <div className="page-heading">

        <div>

          <p className="eyebrow">
            The collection
          </p>

          <h1>
            Find your
            <br />
            <em>next chapter.</em>
          </h1>

        </div>

        <p className="page-intro">
          A considered collection of homes in places
          with their own point of view.
        </p>

      </div>

      {/* ======================================================
          SEARCH
          ====================================================== */}

      <SearchBar compact />

      {/* ======================================================
          FILTER ROW
          ====================================================== */}

      <div className="filter-row">

        {cities.map((item) => (
          <button
            type="button"
            className={
              city === item
                ? 'active'
                : ''
            }
            onClick={() => setCity(item)}
            key={item}
          >
            {item}
          </button>
        ))}

        <span>
          {filtered.length} homes
        </span>

      </div>

      {/* ======================================================
          PROPERTY GRID
          ====================================================== */}

      {filtered.length > 0 && (
        <div className="property-grid listing-grid">

          {filtered.map((property, index) => (
            <PropertyCard
              key={
                property.id ||
                property.title ||
                index
              }
              property={property}
            />
          ))}

        </div>
      )}

      {/* ======================================================
          EMPTY SEARCH RESULT
          ====================================================== */}

      {properties.length > 0 &&
        filtered.length === 0 && (
          <div className="empty-state">

            <h2>
              No homes found
            </h2>

            <p>
              Try a different neighborhood
              or search term.
            </p>

          </div>
        )}

      {/* ======================================================
          COMPLETE DATA FAILURE
          ====================================================== */}

      {properties.length === 0 && (
        <div className="empty-state">

          <h2>
            No homes available
          </h2>

          <p>
            We couldn't load the property
            collection right now.
          </p>

        </div>
      )}

    </section>
  )
}