import type { Incident } from './IncidentModal'

type IncidentFeedProps = {
  networkFailure: boolean
  customIncidents: Incident[]
}

function IncidentFeed({
  networkFailure,
  customIncidents,
}: IncidentFeedProps) {
  function getIncidentClass(severity: string) {
    if (severity === 'CRITICAL') {
      return 'incident critical'
    }

    if (severity === 'HIGH') {
      return 'incident warning-incident'
    }

    return 'incident stable'
  }

  return (
    <aside className="panel incident-panel">
      <div className="panel-heading">
        <span>03</span>
        <h2>LIVE INCIDENTS</h2>
      </div>

      {networkFailure && (
        <div className="incident network-emergency">
          <div className="incident-top">
            <span className="incident-level">
              NETWORK EMERGENCY
            </span>

            <span className="incident-time">
              NOW
            </span>
          </div>

          <h3>East District Isolated</h3>

          <p>
            Communication with central coordination has been interrupted.
          </p>

          <div className="incident-action">
            LOCAL AUTONOMY ENGAGED
          </div>
        </div>
      )}

      {customIncidents.map((incident) => (
        <div
          className={getIncidentClass(incident.severity)}
          key={incident.id}
        >
          <div className="incident-top">
            <span className="incident-level">
              {incident.severity} // {incident.type}
            </span>

            <span className="incident-time">
              {incident.time}
            </span>
          </div>

          <h3>{incident.location}</h3>

          <p>
            {incident.description}
          </p>

          <div className="incident-action">
            {incident.action}
          </div>
        </div>
      ))}

      <div className="incident critical">
        <div className="incident-top">
          <span className="incident-level">
            CRITICAL
          </span>

          <span className="incident-time">
            13:38
          </span>
        </div>

        <h3>Hospital Alpha</h3>

        <p>
          Oxygen reserves below emergency threshold.
        </p>

        <div className="incident-action">
          RESPONDER ASSIGNED
        </div>
      </div>

      <div className="incident warning-incident">
        <div className="incident-top">
          <span className="incident-level">
            WARNING
          </span>

          <span className="incident-time">
            13:40
          </span>
        </div>

        <h3>East District</h3>

        <p>
          Communication reliability has fallen below target.
        </p>

        <div className="incident-action">
          AUTONOMOUS MODE ACTIVE
        </div>
      </div>

      <div className="incident stable">
        <div className="incident-top">
          <span className="incident-level">
            RESOLVED
          </span>

          <span className="incident-time">
            13:36
          </span>
        </div>

        <h3>North Shelter</h3>

        <p>
          Medical supply request successfully fulfilled.
        </p>
      </div>

      <button className="view-all-button">
        VIEW ALL INCIDENTS
        <span>→</span>
      </button>
    </aside>
  )
}

export default IncidentFeed