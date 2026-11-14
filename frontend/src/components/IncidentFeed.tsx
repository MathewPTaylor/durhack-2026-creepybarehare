function IncidentFeed() {
  return (
    <aside className="panel incident-panel">
      <div className="panel-heading">
        <span>03</span>
        <h2>LIVE INCIDENTS</h2>
      </div>

      <div className="incident critical">
        <div className="incident-top">
          <span className="incident-level">CRITICAL</span>
          <span className="incident-time">13:38</span>
        </div>

        <h3>Hospital Alpha</h3>
        <p>Oxygen reserves below emergency threshold.</p>

        <div className="incident-action">
          RESPONDER ASSIGNED
        </div>
      </div>

      <div className="incident warning-incident">
        <div className="incident-top">
          <span className="incident-level">WARNING</span>
          <span className="incident-time">13:40</span>
        </div>

        <h3>East District</h3>
        <p>Communication reliability has fallen below target.</p>

        <div className="incident-action">
          AUTONOMOUS MODE ACTIVE
        </div>
      </div>

      <div className="incident stable">
        <div className="incident-top">
          <span className="incident-level">RESOLVED</span>
          <span className="incident-time">13:36</span>
        </div>

        <h3>North Shelter</h3>
        <p>Medical supply request successfully fulfilled.</p>
      </div>

      <button className="view-all-button">
        VIEW ALL INCIDENTS
        <span>→</span>
      </button>
    </aside>
  )
}

export default IncidentFeed