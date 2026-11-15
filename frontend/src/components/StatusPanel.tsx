type StatusPanelProps = {
  networkFailure: boolean
}

function StatusPanel({ networkFailure }: StatusPanelProps) {
  const resilience = networkFailure ? 71 : 94
  const networkIntegrity = networkFailure ? 46 : 87
  const activeAgents = networkFailure ? '6 / 8' : '8 / 8'
  const criticalIncidents = networkFailure ? '03' : '02'
  const autonomousSectors = networkFailure ? '02' : '01'

  return (
    <aside className="panel status-panel">
      <div className="panel-heading">
        <span>01</span>
        <h2>CITY STATUS</h2>
      </div>

      <div className="health-score">
        <div>
          <span className="eyebrow">RESILIENCE INDEX</span>
          <strong>{resilience}</strong>
        </div>

        <span className="health-unit">%</span>
      </div>

      <div className="progress-track">
        <div
          className={
            networkFailure
              ? 'progress-fill failure-progress'
              : 'progress-fill'
          }
          style={{ width: `${resilience}%` }}
        ></div>
      </div>

      <div className="status-list">
        <div className="status-row">
          <span>Network integrity</span>

          <strong className={networkFailure ? 'danger' : 'good'}>
            {networkIntegrity}%
          </strong>
        </div>

        <div className="status-row">
          <span>Active agents</span>
          <strong>{activeAgents}</strong>
        </div>

        <div className="status-row">
          <span>Critical incidents</span>
          <strong className="danger">{criticalIncidents}</strong>
        </div>

        <div className="status-row">
          <span>Autonomous sectors</span>
          <strong className="warning">{autonomousSectors}</strong>
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
          <span
            className={
              networkFailure
                ? 'node-dot offline-dot'
                : 'node-dot warning-dot'
            }
          ></span>

          <span>East District</span>

          <strong className={networkFailure ? 'danger' : 'warning'}>
            {networkFailure ? 'ISOLATED' : 'DEGRADED'}
          </strong>
        </div>

        <div className="sector">
          <span
            className={
              networkFailure
                ? 'node-dot warning-dot'
                : 'node-dot online'
            }
          ></span>

          <span>South District</span>

          <strong className={networkFailure ? 'warning' : ''}>
            {networkFailure ? 'AUTONOMOUS' : 'ONLINE'}
          </strong>
        </div>
      </div>
    </aside>
  )
}

export default StatusPanel
