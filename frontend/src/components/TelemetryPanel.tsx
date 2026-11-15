import './TelemetryPanel.css'

type TelemetryPanelProps = {
  networkFailure: boolean
}

function TelemetryPanel({
  networkFailure,
}: TelemetryPanelProps) {
  const points = networkFailure
    ? '0,75 45,66 90,58 135,50 180,46 225,42 270,38 315,34 360,29'
    : '0,78 45,69 90,61 135,50 180,40 225,30 270,24 315,18 360,13'

  return (
    <section className="telemetry-panel">
      <div className="telemetry-header">
        <div>
          <span className="eyebrow">
            LIVE MISSION TELEMETRY
          </span>

          <h3>
            OPERATIONAL PROGRESS
          </h3>
        </div>

        <div
          className={
            networkFailure
              ? 'telemetry-mode autonomous-mode'
              : 'telemetry-mode'
          }
        >
          {networkFailure
            ? 'AUTONOMOUS OPERATION'
            : 'COORDINATED OPERATION'}
        </div>
      </div>

      <div className="telemetry-content">
        <div className="telemetry-chart">
          <svg
            viewBox="0 0 360 90"
            preserveAspectRatio="none"
          >
            <polyline
              className={
                networkFailure
                  ? 'telemetry-line failure-line'
                  : 'telemetry-line'
              }
              points={points}
            />
          </svg>

          <div className="telemetry-marker failure-marker">
            NETWORK FAILURE
          </div>

          <div className="chart-labels">
            <span>MISSION START</span>
            <span>DISRUPTION</span>
            <span>CURRENT</span>
          </div>
        </div>

        <div className="telemetry-stats">
          <div>
            <span>MISSION PROGRESS</span>

            <strong>
              {networkFailure ? '68%' : '82%'}
            </strong>
          </div>

          <div>
            <span>OFFLINE PROGRESS</span>

            <strong
              className={
                networkFailure
                  ? 'offline-progress-active'
                  : ''
              }
            >
              {networkFailure ? '+12%' : '0%'}
            </strong>
          </div>

          <div>
            <span>ACTIVE RESPONSE UNITS</span>

            <strong>01</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TelemetryPanel