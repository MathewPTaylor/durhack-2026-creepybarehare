function StatusPanel() {
  return (
    <aside className="panel status-panel">
      <div className="panel-heading">
        <span>01</span>
        <h2>CITY STATUS</h2>
      </div>

      <div className="health-score">
        <div>
          <span className="eyebrow">RESILIENCE INDEX</span>
          <strong>94</strong>
        </div>

        <span className="health-unit">%</span>
      </div>

      <div className="progress-track">
        <div className="progress-fill"></div>
      </div>

      <div className="status-list">
        <div className="status-row">
          <span>Network integrity</span>
          <strong className="good">87%</strong>
        </div>

        <div className="status-row">
          <span>Active agents</span>
          <strong>8 / 8</strong>
        </div>

        <div className="status-row">
          <span>Critical incidents</span>
          <strong className="danger">02</strong>
        </div>

        <div className="status-row">
          <span>Autonomous sectors</span>
          <strong className="warning">01</strong>
        </div>
      </div>

      <div className="divider"></div>

      <span className="eyebrow">SECTOR CONNECTIVITY</span>

      <div className="sector-list">
        <div className="sector">
          <span className="node-dot online"></span>
          <span>North District</span>
          <strong>ONLINE</strong>
        </div>

        <div className="sector">
          <span className="node-dot online"></span>
          <span>Central District</span>
          <strong>ONLINE</strong>
        </div>

        <div className="sector">
          <span className="node-dot warning-dot"></span>
          <span>East District</span>
          <strong className="warning">DEGRADED</strong>
        </div>

        <div className="sector">
          <span className="node-dot online"></span>
          <span>South District</span>
          <strong>ONLINE</strong>
        </div>
      </div>
    </aside>
  )
}

export default StatusPanel