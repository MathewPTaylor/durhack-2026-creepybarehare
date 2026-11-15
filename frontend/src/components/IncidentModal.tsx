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
  const [incidentType, setIncidentType] = useState('MEDICAL')
  const [location, setLocation] = useState('Hospital Alpha')
  const [severity, setSeverity] = useState('CRITICAL')
  const [description, setDescription] = useState('')

  function deployIncident() {
    if (description.trim() === '') {
      return
    }

    const newIncident: Incident = {
      id: Date.now(),
      type: incidentType,
      location: location,
      severity: severity,
      description: description,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      action:
        severity === 'CRITICAL'
          ? 'AUTONOMOUS RESPONSE DEPLOYED'
          : 'INCIDENT UNDER ANALYSIS',
    }

    onCreateIncident(newIncident)
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
              {['MEDICAL', 'POWER', 'SUPPLY', 'FIRE'].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    className={
                      incidentType === type
                        ? 'incident-option selected'
                        : 'incident-option'
                    }
                    onClick={() => setIncidentType(type)}
                  >
                    {type}
                  </button>
                ),
              )}
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
                setLocation(event.target.value)
              }
            >
              <option>Hospital Alpha</option>
              <option>North Shelter</option>
              <option>Supply Depot</option>
              <option>Power Node</option>
              <option>East District</option>
              <option>South District</option>
            </select>
          </label>

          <div className="form-section">
            <span className="form-label">
              SEVERITY
            </span>

            <div className="severity-grid">
              {['LOW', 'HIGH', 'CRITICAL'].map(
                (level) => (
                  <button
                    key={level}
                    type="button"
                    className={
                      severity === level
                        ? 'incident-option selected'
                        : 'incident-option'
                    }
                    onClick={() => setSeverity(level)}
                  >
                    {level}
                  </button>
                ),
              )}
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
                setDescription(event.target.value)
              }
              placeholder="Describe the emergency..."
            />
          </label>

          <button
            type="button"
            className="deploy-incident-button"
            onClick={deployIncident}
          >
            DEPLOY INCIDENT
          </button>
        </div>
      </section>
    </div>
  )
}

export default IncidentModal