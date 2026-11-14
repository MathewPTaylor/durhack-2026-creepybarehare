type ControlPanelProps = {
  networkFailure: boolean
  onToggleNetwork: () => void
}

function ControlPanel({
  networkFailure,
  onToggleNetwork,
}: ControlPanelProps) {
  return (
    <section className="control-panel">
      <div className="metrics">
        <div className="metric">
          <span className="metric-label">RESILIENCE</span>

          <strong className={networkFailure ? 'metric-danger' : ''}>
            {networkFailure ? '71%' : '94%'}
          </strong>

          <span className="metric-detail">
            {networkFailure
              ? 'System operating under disruption'
              : '+3.2% since recovery'}
          </span>
        </div>

        <div className="metric">
          <span className="metric-label">AVG RESPONSE</span>
          <strong>{networkFailure ? '3.8m' : '2.4m'}</strong>

          <span className="metric-detail">
            {networkFailure
              ? 'Local routing active'
              : 'Within target'}
          </span>
        </div>

        <div className="metric">
          <span className="metric-label">NEEDS RESOLVED</span>
          <strong>{networkFailure ? '20' : '18'}</strong>

          <span className="metric-detail">
            {networkFailure
              ? '2 resolved while offline'
              : '4 currently active'}
          </span>
        </div>

        <div className="metric">
          <span className="metric-label">NETWORK HEALTH</span>

          <strong className={networkFailure ? 'metric-danger' : ''}>
            {networkFailure ? '46%' : '87%'}
          </strong>

          <span className="metric-detail">
            {networkFailure
              ? '2 autonomous sectors'
              : '1 degraded sector'}
          </span>
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

        <button
          className={
            networkFailure
              ? 'control-button restore-button'
              : 'control-button failure-button'
          }
          onClick={onToggleNetwork}
        >
          <span>{networkFailure ? '↻' : '⚡'}</span>

          {networkFailure
            ? 'RESTORE NETWORK'
            : 'SIMULATE NETWORK FAILURE'}
        </button>
      </div>
    </section>
  )
}

export default ControlPanel