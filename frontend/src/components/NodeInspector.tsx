type NodeInfo = {
  name: string
  type: string
  status: string
  resourceLabel: string
  resourceValue: string
  connectivity: string
  currentAction: string
  reason: string
}

type NodeInspectorProps = {
  node: NodeInfo | null
  onClose: () => void
}

function NodeInspector({ node, onClose }: NodeInspectorProps) {
  if (!node) {
    return null
  }

  return (
    <div className="inspector-overlay">
      <aside className="node-inspector">
        <div className="inspector-header">
          <div>
            <span className="eyebrow">AEGIS NODE INTELLIGENCE</span>
            <h2>{node.name}</h2>
          </div>

          <button
            className="inspector-close"
            onClick={onClose}
            aria-label="Close node inspector"
          >
            X
          </button>
        </div>

        <div className="inspector-type">
          {node.type}
        </div>

        <div className="inspector-grid">
          <div className="inspector-stat">
            <span>STATUS</span>
            <strong>{node.status}</strong>
          </div>

          <div className="inspector-stat">
            <span>CONNECTIVITY</span>
            <strong>{node.connectivity}</strong>
          </div>

          <div className="inspector-stat">
            <span>{node.resourceLabel}</span>
            <strong>{node.resourceValue}</strong>
          </div>
        </div>

        <div className="decision-section">
          <span className="eyebrow">CURRENT AUTONOMOUS DECISION</span>

          <h3>{node.currentAction}</h3>

          <div className="decision-line"></div>

          <span className="eyebrow">WHY?</span>

          <p>{node.reason}</p>
        </div>

        <div className="inspector-footer">
          AEGIS LOCAL DECISION ENGINE
          <span>ACTIVE</span>
        </div>
      </aside>
    </div>
  )
}

export type { NodeInfo }
export default NodeInspector