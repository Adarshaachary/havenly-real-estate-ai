import {
  ArrowRight,
  Bot,
  Check,
  Home,
  MapPin,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { sendMessage } from '../services/chatService'
import { getProperties } from '../services/propertyService'

/* =========================================================
   INITIAL MESSAGE
   ========================================================= */

const initialMessage = {
  from: 'bot',
  text: "Hi, I'm Havenly AI. I can help you find a property or answer questions about our homes.",
}

/* =========================================================
   START OPTIONS
   ========================================================= */

const startOptions = [
  {
    label: 'Find a home',
    value: 'home',
    icon: Home,
  },
  {
    label: 'Explore locations',
    value: 'location',
    icon: MapPin,
  },
  {
    label: 'Investment property',
    value: 'investment',
    icon: Sparkles,
  },
]

/* =========================================================
   LOCATION LABELS
   ========================================================= */

const locationLabels = {
  Bengaluru: 'Bengaluru',
  Mysuru: 'Mysuru',
  Mangaluru: 'Mangaluru',
  Udupi: 'Udupi',
  Chikkamagaluru: 'Chikkamagaluru',
  Coorg: 'Coorg',
  Hubballi: 'Hubballi',
}

/* =========================================================
   PROPERTY TYPE LABELS
   ========================================================= */

const propertyTypeLabels = {
  Apartment: 'Apartment',
  Villa: 'Villa',
  House: 'House',
  Estate: 'Estate',
  Plot: 'Plot',
}

/* =========================================================
   BUDGET OPTIONS
   ========================================================= */

const budgetOptions = [
  {
    label: 'Under ₹50L',
    value: 'under 50 lakh',
  },
  {
    label: '₹50L – ₹80L',
    value: '50 to 80 lakh',
  },
  {
    label: '₹80L – ₹1Cr',
    value: '80 lakh to 1 crore',
  },
  {
    label: '₹1Cr+',
    value: 'above 1 crore',
  },
]

/* =========================================================
   NORMALIZE TEXT
   ========================================================= */

const normalizeText = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()

/* =========================================================
   PROPERTY TYPE MATCHING
   ========================================================= */

const matchesPropertyType = (
  property,
  requestedType
) => {
  if (!requestedType) return true

  const type = normalizeText(
    property.propertyType
  )

  const title = normalizeText(
    property.title
  )

  const description = normalizeText(
    property.description
  )

  const requested =
    normalizeText(requestedType)

  return (
    type.includes(requested) ||
    title.includes(requested) ||
    description.includes(requested)
  )
}

/* =========================================================
   LOCATION MATCHING
   ========================================================= */

const matchesLocation = (
  property,
  requestedLocation
) => {
  if (!requestedLocation) return true

  const location =
    normalizeText(requestedLocation)

  const city = normalizeText(
    property.city
  )

  const address = normalizeText(
    property.address
  )

  const title = normalizeText(
    property.title
  )

  const description = normalizeText(
    property.description
  )

  return (
    city.includes(location) ||
    address.includes(location) ||
    title.includes(location) ||
    description.includes(location)
  )
}

/* =========================================================
   BUDGET MATCHING
   ========================================================= */

const matchesBudget = (
  property,
  requestedBudget
) => {
  if (!requestedBudget) return true

  const price = Number(
    property.price || 0
  )

  const budget =
    normalizeText(requestedBudget)

  if (budget === 'under 50 lakh') {
    return price < 5000000
  }

  if (budget === '50 to 80 lakh') {
    return (
      price >= 5000000 &&
      price <= 8000000
    )
  }

  if (budget === '80 lakh to 1 crore') {
    return (
      price > 8000000 &&
      price <= 10000000
    )
  }

  if (budget === 'above 1 crore') {
    return price > 10000000
  }

  return true
}

/* =========================================================
   BEDROOM MATCHING
   ========================================================= */

const matchesBedrooms = (
  property,
  requestedBedrooms
) => {
  if (!requestedBedrooms) return true

  const bedrooms = Number(
    property?.facilities?.bedrooms || 0
  )

  const requested =
    normalizeText(requestedBedrooms)

  if (requested === '1 bhk') {
    return bedrooms === 1
  }

  if (requested === '2 bhk') {
    return bedrooms === 2
  }

  if (requested === '3 bhk') {
    return bedrooms === 3
  }

  if (requested === '4+ bhk') {
    return bedrooms >= 4
  }

  return true
}

/* =========================================================
   FILTER PROPERTIES USING CURRENT PREFERENCES
   ========================================================= */

const filterProperties = (
  properties,
  preferences = {}
) => {
  return properties.filter((property) => {
    return (
      matchesLocation(
        property,
        preferences.location
      ) &&
      matchesBudget(
        property,
        preferences.budget
      ) &&
      matchesPropertyType(
        property,
        preferences.type
      ) &&
      matchesBedrooms(
        property,
        preferences.bedrooms
      )
    )
  })
}

/* =========================================================
   CREATE LOCATION OPTIONS
   ========================================================= */

const getLocationOptions = (
  properties
) => {
  const availableLocations =
    new Set()

  properties.forEach((property) => {
    const city = String(
      property.city || ''
    ).trim()

    const matchingLocation =
      Object.keys(locationLabels).find(
        (location) =>
          normalizeText(location) ===
          normalizeText(city)
      )

    if (matchingLocation) {
      availableLocations.add(
        matchingLocation
      )
    }
  })

  return Array.from(
    availableLocations
  ).map((location) => ({
    label:
      locationLabels[location],
    value: location,
  }))
}

/* =========================================================
   CREATE BUDGET OPTIONS
   ========================================================= */

const getBudgetOptions = (
  properties,
  preferences = {}
) => {
  return budgetOptions.filter(
    (budget) => {
      const filtered =
        filterProperties(
          properties,
          {
            ...preferences,
            budget: budget.value,
          }
        )

      return filtered.length > 0
    }
  )
}

/* =========================================================
   CREATE PROPERTY TYPE OPTIONS
   ========================================================= */

const getPropertyTypeOptions = (
  properties,
  preferences = {}
) => {
  const types = [
    'Apartment',
    'Villa',
    'House',
    'Estate',
    'Plot',
  ]

  return types
    .filter((type) => {
      const filtered =
        filterProperties(
          properties,
          {
            ...preferences,
            type,
          }
        )

      return filtered.length > 0
    })
    .map((type) => ({
      label:
        propertyTypeLabels[type],
      value: type,
    }))
}

/* =========================================================
   CREATE BEDROOM OPTIONS
   ========================================================= */

const getBedroomOptions = (
  properties,
  preferences = {}
) => {
  const bedroomValues = [
    {
      label: '1 BHK',
      value: '1 BHK',
    },
    {
      label: '2 BHK',
      value: '2 BHK',
    },
    {
      label: '3 BHK',
      value: '3 BHK',
    },
    {
      label: '4+ BHK',
      value: '4+ BHK',
    },
  ]

  return bedroomValues.filter(
    (bedroom) => {
      const filtered =
        filterProperties(
          properties,
          {
            ...preferences,
            bedrooms:
              bedroom.value,
          }
        )

      return filtered.length > 0
    }
  )
}

/* =========================================================
   CHATBOT COMPONENT
   ========================================================= */

export default function Chatbot() {
  const [open, setOpen] =
    useState(false)

  const [input, setInput] =
    useState('')

  const [messages, setMessages] =
    useState([
      initialMessage,
    ])

  const [step, setStep] =
    useState('start')

  const [preferences, setPreferences] =
    useState({})

  const [loading, setLoading] =
    useState(false)

  const [properties, setProperties] =
    useState([])

  /* =======================================================
     AUTO SCROLL REFERENCE
     ======================================================= */

  const messagesEndRef =
    useRef(null)

  /* =======================================================
     LOAD PROPERTY DATA
     ======================================================= */

  useEffect(() => {
    const loadProperties =
      async () => {
        try {
          const data =
            await getProperties()

          if (Array.isArray(data)) {
            setProperties(data)
          } else {
            setProperties([])
          }
        } catch (error) {
          console.warn(
            'Unable to load properties for chatbot options.',
            error
          )

          setProperties([])
        }
      }

    loadProperties()
  }, [])

  /* =======================================================
     AUTO SCROLL WHEN MESSAGES CHANGE
     ======================================================= */

  useEffect(() => {
    if (!open) return

    const timeout =
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView(
          {
            behavior: 'smooth',
            block: 'end',
          }
        )
      }, 80)

    return () =>
      clearTimeout(timeout)
  }, [
    messages,
    loading,
    open,
  ])

  /* =======================================================
     ADD MESSAGE
     ======================================================= */

  const addMessage = (
    message
  ) => {
    setMessages((items) => [
      ...items,
      {
        ...message,
        id: `${Date.now()}-${Math.random()}`,
      },
    ])
  }

  /* =======================================================
     ADD QUESTION
     ======================================================= */

  const addQuestion = (
    text,
    options,
    nextStep
  ) => {
    if (
      !options ||
      options.length === 0
    ) {
      addMessage({
        from: 'bot',
        text:
          'I could not find any available properties for that combination. Please try another option.',
      })

      return
    }

    setStep(nextStep)

    addMessage({
      from: 'bot',
      text,
      type: 'question',
      options,
    })
  }

  /* =======================================================
     START CONVERSATION
     ======================================================= */

  const startConversation = () => {
    setMessages([
      {
        ...initialMessage,
        id: 'initial',
      },
      {
        from: 'bot',
        text:
          'What would you like help with today?',
        type: 'question',
        options: startOptions,
        id: 'start-question',
      },
    ])

    setPreferences({})
    setStep('start')
  }

  /* =======================================================
     GET AVAILABLE LOCATIONS
     ======================================================= */

  const getAvailableLocations =
    () => {
      return getLocationOptions(
        properties
      )
    }

  /* =======================================================
     GET AVAILABLE BUDGETS
     ======================================================= */

  const getAvailableBudgets = (
    currentPreferences
  ) => {
    return getBudgetOptions(
      properties,
      currentPreferences
    )
  }

  /* =======================================================
     GET AVAILABLE PROPERTY TYPES
     ======================================================= */

  const getAvailableTypes = (
    currentPreferences
  ) => {
    return getPropertyTypeOptions(
      properties,
      currentPreferences
    )
  }

  /* =======================================================
     GET AVAILABLE BEDROOMS
     ======================================================= */

  const getAvailableBedrooms = (
    currentPreferences
  ) => {
    return getBedroomOptions(
      properties,
      currentPreferences
    )
  }

  /* =======================================================
     FINISH PROPERTY SEARCH
     ======================================================= */

  const finishPropertySearch =
    async (
      finalPreferences
    ) => {
      const query = [
        finalPreferences.location
          ? `Find properties in ${finalPreferences.location}.`
          : '',

        finalPreferences.budget
          ? `Budget: ${finalPreferences.budget}.`
          : '',

        finalPreferences.type
          ? `Property type: ${finalPreferences.type}.`
          : '',

        finalPreferences.bedrooms
          ? `Bedrooms: ${finalPreferences.bedrooms}.`
          : '',
      ]
        .filter(Boolean)
        .join(' ')

      setLoading(true)

      try {
        const result =
          await sendMessage(query)

        addMessage({
          from: 'bot',
          text:
            result?.reply ||
            'I found some options based on your preferences. Try asking me for a more specific requirement.',
          properties:
            Array.isArray(
              result?.properties
            )
              ? result.properties
              : [],
          type: 'result',
        })
      } catch (error) {
        console.error(
          'Property search error:',
          error
        )

        addMessage({
          from: 'bot',
          text:
            'I could not reach the property search right now. Please try again in a moment.',
        })
      } finally {
        setLoading(false)
        setStep('complete')
      }
    }

  /* =======================================================
     HANDLE OPTION
     ======================================================= */

  const handleOption = async (
    option,
    messageIndex
  ) => {
    if (loading) return

    /* =====================================================
       REMOVE OPTIONS FROM CLICKED QUESTION
       ===================================================== */

    setMessages((items) =>
      items.map(
        (message, index) => {
          if (
            index !== messageIndex
          ) {
            return message
          }

          return {
            ...message,
            options: undefined,
          }
        }
      )
    )

    /* =====================================================
       SHOW USER SELECTION
       ===================================================== */

    addMessage({
      from: 'user',
      text: option.label,
    })

    /* =====================================================
       START
       ===================================================== */

    if (step === 'start') {
      if (
        option.value ===
          'location' ||
        option.value === 'home' ||
        option.value ===
          'investment'
      ) {
        const locationOptions =
          getAvailableLocations()

        setTimeout(() => {
          addQuestion(
            option.value ===
              'investment'
              ? 'Sure. Which location would you like to explore as an investment?'
              : option.value ===
                'home'
                ? 'Great. Which location are you interested in?'
                : 'Where are you looking?',
            locationOptions,
            'location'
          )
        }, 150)

        if (
          option.value ===
          'investment'
        ) {
          setPreferences({
            purpose:
              'investment',
          })
        } else {
          setPreferences({})
        }

        return
      }
    }

    /* =====================================================
       LOCATION
       ===================================================== */

    if (step === 'location') {
      const updatedPreferences = {
        ...preferences,
        location:
          option.value,
      }

      setPreferences(
        updatedPreferences
      )

      const availableBudgets =
        getAvailableBudgets(
          updatedPreferences
        )

      setTimeout(() => {
        addQuestion(
          "What's your approximate budget?",
          availableBudgets,
          'budget'
        )
      }, 150)

      return
    }

    /* =====================================================
       BUDGET
       ===================================================== */

    if (step === 'budget') {
      const updatedPreferences = {
        ...preferences,
        budget:
          option.value,
      }

      setPreferences(
        updatedPreferences
      )

      const availableTypes =
        getAvailableTypes(
          updatedPreferences
        )

      setTimeout(() => {
        addQuestion(
          'What type of property are you looking for?',
          availableTypes,
          'type'
        )
      }, 150)

      return
    }

    /* =====================================================
       PROPERTY TYPE
       ===================================================== */

    if (step === 'type') {
      const updatedPreferences = {
        ...preferences,
        type: option.value,
      }

      setPreferences(
        updatedPreferences
      )

      const availableBedrooms =
        getAvailableBedrooms(
          updatedPreferences
        )

      setTimeout(() => {
        addQuestion(
          'How many bedrooms would you prefer?',
          availableBedrooms,
          'bedrooms'
        )
      }, 150)

      return
    }

    /* =====================================================
       BEDROOMS
       ===================================================== */

    if (
      step === 'bedrooms'
    ) {
      const updatedPreferences = {
        ...preferences,
        bedrooms:
          option.value,
      }

      setPreferences(
        updatedPreferences
      )

      const matchingProperties =
        filterProperties(
          properties,
          updatedPreferences
        )

      if (
        matchingProperties.length ===
        0
      ) {
        addMessage({
          from: 'bot',
          text:
            'I could not find a property matching all those preferences. Try changing one of the filters.',
          type: 'result',
        })

        setStep('complete')

        return
      }

      addMessage({
        from: 'bot',
        text:
          'Perfect. I have your preferences. Let me search the available properties.',
        type: 'searching',
      })

      await finishPropertySearch(
        updatedPreferences
      )
    }
  }

  /* =======================================================
     TEXT INPUT
     ======================================================= */

  const submit = async (
    event
  ) => {
    event.preventDefault()

    const text =
      input.trim()

    if (!text || loading)
      return

    setInput('')

    addMessage({
      from: 'user',
      text,
    })

    setLoading(true)

    try {
      const result =
        await sendMessage(text)

      addMessage({
        from: 'bot',
        text:
          result?.reply ||
          'I could not find a clear answer just yet.',
        properties:
          Array.isArray(
            result?.properties
          )
            ? result.properties
            : [],
        type: 'result',
      })
    } catch (error) {
      console.error(
        'Chatbot error:',
        error
      )

      addMessage({
        from: 'bot',
        text:
          'I’m having trouble reaching the property desk right now. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  /* =======================================================
     PROPERTY RESULT CARD
     ======================================================= */

  const renderPropertyCard = (
    property
  ) => {
    const bedrooms =
      property?.facilities
        ?.bedrooms ?? '-'

    const bathrooms =
      property?.facilities
        ?.bathrooms ?? '-'

    const parking =
      property?.facilities
        ?.parking ?? '-'

    const price = Number(
      property?.price || 0
    )

    return (
      <div
        key={property.id}
        className="chat-property-card"
        style={{
          marginTop: '12px',
          overflow: 'hidden',
          borderRadius: '12px',
          border:
            '1px solid rgba(0, 0, 0, 0.08)',
          background: '#ffffff',
        }}
      >
        {/* PROPERTY IMAGE */}

        {property?.image && (
          <img
            src={property.image}
            alt={
              property.title ||
              'Property image'
            }
            className="chat-property-image"
            style={{
              width: '100%',
              height: '170px',
              objectFit: 'cover',
              display: 'block',
            }}
            onError={(event) => {
              event.currentTarget.style.display =
                'none'
            }}
          />
        )}

        {/* PROPERTY INFORMATION */}

        <div
          className="chat-property-info"
          style={{
            padding: '12px',
          }}
        >
          <strong
            style={{
              display: 'block',
              fontSize: '15px',
              lineHeight: '1.4',
              marginBottom: '6px',
            }}
          >
            {property?.title ||
              'Unnamed Property'}
          </strong>

          <div
            style={{
              fontSize: '12px',
              marginBottom: '6px',
            }}
          >
            <MapPin
              size={12}
              style={{
                verticalAlign:
                  'middle',
                marginRight: '4px',
              }}
            />

            {property?.address ||
              '-'}

            {property?.city
              ? `, ${property.city}`
              : ''}
          </div>

          <div
            style={{
              fontSize: '15px',
              fontWeight: '700',
              marginBottom: '8px',
            }}
          >
            ₹
            {price.toLocaleString(
              'en-IN'
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '12px',
            }}
          >
            <span>
              🛏️ {bedrooms}
            </span>

            <span>
              🚿 {bathrooms}
            </span>

            <span>
              🚗 {parking}
            </span>
          </div>

          {property?.area && (
            <div
              style={{
                fontSize: '12px',
                marginTop: '6px',
              }}
            >
              📐 {property.area}{' '}
              sq.ft
            </div>
          )}

          {property?.propertyType && (
            <div
              style={{
                fontSize: '12px',
                marginTop: '5px',
              }}
            >
              🏠{' '}
              {property.propertyType}
            </div>
          )}

          {property?.furnishing && (
            <div
              style={{
                fontSize: '12px',
                marginTop: '5px',
              }}
            >
              🛋️{' '}
              {property.furnishing}
            </div>
          )}
        </div>
      </div>
    )
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div
      className={`chatbot ${
        open ? 'is-open' : ''
      }`}
    >
      {/* ===================================================
          CHAT PANEL
          =================================================== */}

      {open && (
        <section className="chat-panel">
          {/* HEADER */}

          <div className="chat-header">
            <div className="chat-header-main">
              <div className="chat-bot-icon">
                <Sparkles size={17} />
              </div>

              <div>
                <strong>
                  Havenly AI
                </strong>

                <span>
                  <span className="status-dot" />
                  Property assistant
                </span>
              </div>
            </div>

            <button
              className="chat-close"
              onClick={() =>
                setOpen(false)
              }
              aria-label="Close assistant"
            >
              <X size={17} />
            </button>
          </div>

          {/* =================================================
              MESSAGES
              ================================================= */}

          <div className="chat-messages">
            {messages.map(
              (message, index) => (
                <div
                  key={
                    message.id ||
                    `${index}-${message.text}`
                  }
                  className={`chat-message-row ${message.from}`}
                >
                  {message.from ===
                    'bot' && (
                    <div className="message-avatar">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`chat-message ${message.from}`}
                  >
                    {/* MESSAGE TEXT */}

                    <p>
                      {typeof message.text ===
                      'string'
                        ? message.text
                        : ''}
                    </p>

                    {/* =======================================
                        PROPERTY RESULTS
                        ======================================= */}

                    {Array.isArray(
                      message.properties
                    ) &&
                      message.properties.length >
                        0 && (
                        <div>
                          {message.properties.map(
                            renderPropertyCard
                          )}
                        </div>
                      )}

                    {/* =======================================
                        DYNAMIC OPTIONS
                        ======================================= */}

                    {message.options &&
                      message.options.length >
                        0 && (
                        <div className="chat-options">
                          {message.options.map(
                            (option) => {
                              const Icon =
                                option.icon

                              return (
                                <button
                                  key={
                                    option.value
                                  }
                                  className="chat-option"
                                  onClick={() =>
                                    handleOption(
                                      option,
                                      index
                                    )
                                  }
                                  disabled={
                                    loading
                                  }
                                >
                                  {Icon && (
                                    <span className="chat-option-icon">
                                      <Icon
                                        size={14}
                                      />
                                    </span>
                                  )}

                                  <span>
                                    {
                                      option.label
                                    }
                                  </span>

                                  <ArrowRight
                                    size={13}
                                  />
                                </button>
                              )
                            }
                          )}
                        </div>
                      )}
                  </div>
                </div>
              )
            )}

            {/* =================================================
                LOADING
                ================================================= */}

            {loading && (
              <div className="chat-message-row bot">
                <div className="message-avatar">
                  <Bot size={14} />
                </div>

                <div className="chat-message bot typing-message">
                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>

                  <small>
                    Searching properties...
                  </small>
                </div>
              </div>
            )}

            {/* =================================================
                AUTO SCROLL TARGET
                ================================================= */}

            <div
              ref={messagesEndRef}
            />
          </div>

          {/* =================================================
              QUICK ACTIONS
              ================================================= */}

          <div className="chat-quick-actions">
            <button
              onClick={
                startConversation
              }
              disabled={loading}
            >
              <RotateCcw
                size={13}
              />
              Start over
            </button>

            {step !== 'start' &&
              step !== 'complete' && (
                <span>
                  Guided search
                </span>
              )}

            {step ===
              'complete' && (
              <span>
                <Check size={12} />
                Search complete
              </span>
            )}
          </div>

          {/* =================================================
              INPUT
              ================================================= */}

          <form
            className="chat-form"
            onSubmit={submit}
          >
            <input
              value={input}
              onChange={(event) =>
                setInput(
                  event.target.value
                )
              }
              placeholder="Ask about a home..."
              disabled={loading}
            />

            <button
              type="submit"
              aria-label="Send message"
              disabled={
                !input.trim() ||
                loading
              }
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      )}

      {/* =====================================================
          UNIQUE AI LAUNCHER
          ===================================================== */}

      <button
        className="chat-launcher"
        onClick={() =>
          setOpen(!open)
        }
        aria-label={
          open
            ? 'Close assistant'
            : 'Open assistant'
        }
      >
        {open ? (
          <X size={21} />
        ) : (
          <span
            className="unique-ai-launcher"
            aria-hidden="true"
          >
            <span className="ai-orbit ai-orbit-one" />
            <span className="ai-orbit ai-orbit-two" />

            <span className="ai-core">
              <Bot size={17} />
            </span>

            <span className="ai-spark ai-spark-one">
              <Sparkles size={8} />
            </span>

            <span className="ai-spark ai-spark-two">
              <Sparkles size={6} />
            </span>
          </span>
        )}
      </button>
    </div>
  )
}