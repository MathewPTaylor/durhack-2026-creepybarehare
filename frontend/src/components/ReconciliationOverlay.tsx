import './ReconciliationOverlay.css'

type ReconciliationOverlayProps = {
  progress: number
}

function ReconciliationOverlay({
  progress,
}: ReconciliationOverlayProps) {
  return (
    <div className="reconciliation-overlay">
      <section className="reconciliation-panel">

        <div className="reconciliation-header">
          <span className="eyebrow">
            AEGIS DISTRIBUTED RECOVERY PROTOCOL
          </span>

          <h2>RECONCILING NETWORK STATE</h2>

          <p>
            Communication restored. Autonomous nodes are
            synchronising locally recorded events.
          </p>
        </div>

        <div className="reconciliation-nodes">
          <div className="reconciliation-node">
            <span className="sync-dot"></span>
            HOSPITAL ALPHA
          </div>

          <div className="reconciliation-node">
            <span className="sync-dot"></span>
            NORTH SHELTER
          </div>

          <div className="reconciliation-node">
            <span className="sync-dot"></span>
            SUPPLY DEPOT
          </div>

          <div className="reconciliation-node">
            <span className="sync-dot"></span>
            POWER NODE
          </div>
        </div>

        <div className="reconciliation-progress">
          <div className="progress-information">
            <span>SYNCHRONISING DISTRIBUTED STATE</span>
            <strong>{progress}%</strong>
          </div>

          <div className="reconciliation-track">
            <div
              className="reconciliation-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="reconciliation-events">
          <div>
            <strong>18</strong>
            <span>EVENTS DISCOVERED</span>
          </div>

          <div>
            <strong>02</strong>
            <span>DUPLICATE TASKS</span>
          </div>

          <div>
            <strong>01</strong>
            <span>STALE REQUEST</span>
          </div>
        </div>

        <div className="reconciliation-status">
          {progress < 35 && (
            <span>
              RECEIVING OFFLINE EVENT LOGS...
            </span>
          )}

          {progress >= 35 && progress < 65 && (
            <span>
              RESOLVING DUPLICATE TASKS...
            </span>
          )}

          {progress >= 65 && progress < 90 && (
            <span>
              SYNCHRONISING AUTONOMOUS NODES...
            </span>
          )}

          {progress >= 90 && (
            <span>
              FINALISING SHARED STATE...
            </span>
          )}
        </div>

      </section>
    </div>
  )
}

export default ReconciliationOverlay