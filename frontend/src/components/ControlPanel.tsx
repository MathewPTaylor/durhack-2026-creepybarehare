function ControlPanel() {
  return (
    <section className="control-panel">
      <div className="metrics">
        <div className="metric">
          <span className="metric-label">RESILIENCE</span>
          <strong>94%</strong>
          <span className="metric-detail">+3.2% since recovery</span>
        </div>

        <div className="metric">
          <span className="metric-label">AVG RESPONSE</span>
          <strong>2.4m</strong>
          <span className="metric-detail">Within target</span>
        </div>

        <div className="metric">
          <span className="metric-label">NEEDS RESOLVED</span>
          <strong>18</strong>
          <span className="metric-detail">4 currently active</span>
        </div>

        <div className="metric">
          <span className="metric-label">NETWORK HEALTH</span>
          <strong>87%</strong>
          <span className="metric-detail">1 degraded sector</span>
        </div>
      </div>

      <div className="command-controls">
        <button className="control-button incident-button">
          <span>+</span>
          INJECT INCIDENT
        </button>

        <button className="control-button isolate-button">
          <span>◉</span>
          ISOLATE SECTOR
        </button>

        <button className="control-button failure-button">
          <span>⚡</span>
          SIMULATE NETWORK FAILURE
        </button>
      </div>
    </section>
  )
}

export default ControlPanel