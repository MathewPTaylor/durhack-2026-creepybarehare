import { useState } from 'react'
import './IncidentModal.css'

export type Incident = {
  id: number
  type: string
  location: string
  severity: string
  description: string
  time: string
  action: string
}

type IncidentModalProps = {
  onClose: () => void
  onCreateIncident: (incident: Incident) => void
}

function IncidentModal({
  onClose,
  onCreateIncident,
}: IncidentModalProps) {
  const [incidentType, setIncidentType] =
    useState('MEDICAL')

  const [location, setLocation] =
    useState('Hospital Alpha')

  const [severity, setSeverity] =
    useState('CRITICAL')

  const [description, setDescription] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  async function deployIncident() {
    if (description.trim() === '') {
      setError('Please describe the emergency.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/incident',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            description: description,
            location: location,
          }),
        },
      )

      if (!response.ok) {
        const backendMessage =
          await response.text()

        throw new Error(
          `Backend error ${response.status}: ${backendMessage}`,
        )
      }

      const audioBlob =
        await response.blob()

      const audioUrl =
        URL.createObjectURL(audioBlob)

      const audio =
        new Audio(audioUrl)

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl)
      }

      await audio.play()

      const newIncident: Incident = {
        id: Date.now(),
        type: incidentType,
        location: location,
        severity: severity,
        description: description,

        time:
          new Date().toLocaleTimeString(
            [],
            {
              hour: '2-digit',
              minute: '2-digit',
            },
          ),

        action:
          severity === 'CRITICAL'
            ? 'AUTONOMOUS RESPONSE DEPLOYED'
            : 'INCIDENT UNDER ANALYSIS',
      }

      onCreateIncident(newIncident)
    } catch (requestError) {
      console.error(
        'AEGIS incident deployment failed:',
        requestError,
      )

      if (requestError instanceof Error) {
        setError(requestError.message)
      } else {
        setError(
          'Unable to contact the AEGIS backend.',
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="incident-modal-overlay">
      <section className="incident-modal">
        <div className="incident-modal-header">
          <div>
            <span className="eyebrow">
              AEGIS EMERGENCY INJECTION
            </span>

            <h2>Create New Incident</h2>
          </div>

          <button
            className="incident-modal-close"
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            X
          </button>
        </div>

        <div className="incident-form">
          <div className="form-section">
            <span className="form-label">
              INCIDENT TYPE
            </span>

            <div className="incident-type-grid">
              {[
                'MEDICAL',
                'POWER',
                'SUPPLY',
                'FIRE',
              ].map((type) => (
                <button
                  key={type}
                  type="button"

                  className={
                    incidentType === type
                      ? 'incident-option selected'
                      : 'incident-option'
                  }

                  onClick={() =>
                    setIncidentType(type)
                  }

                  disabled={loading}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <label className="form-section">
            <span className="form-label">
              LOCATION
            </span>

            <select
              className="incident-select"
              value={location}

              onChange={(event) =>
                setLocation(
                  event.target.value,
                )
              }

              disabled={loading}
            >
              <option>
                Hospital Alpha
              </option>

              <option>
                North Shelter
              </option>

              <option>
                Supply Depot
              </option>

              <option>
                Power Node
              </option>

              <option>
                East District
              </option>

              <option>
                South District
              </option>
            </select>
          </label>

          <div className="form-section">
            <span className="form-label">
              SEVERITY
            </span>

            <div className="severity-grid">
              {[
                'LOW',
                'HIGH',
                'CRITICAL',
              ].map((level) => (
                <button
                  key={level}
                  type="button"

                  className={
                    severity === level
                      ? 'incident-option selected'
                      : 'incident-option'
                  }

                  onClick={() =>
                    setSeverity(level)
                  }

                  disabled={loading}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <label className="form-section">
            <span className="form-label">
              DESCRIPTION
            </span>

            <textarea
              className="incident-description"

              value={description}

              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }

              placeholder="Describe the emergency..."

              disabled={loading}
            />
          </label>

          {error && (
            <div className="incident-api-error">
              <strong>
                INCIDENT DEPLOYMENT FAILED
              </strong>

              <span>
                {error}
              </span>
            </div>
          )}

          <button
            type="button"
            className="deploy-incident-button"

            onClick={deployIncident}

            disabled={loading}
          >
            {loading
              ? 'ANALYSING & BROADCASTING...'
              : 'DEPLOY INCIDENT'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default IncidentModal