import type { NodeInfo } from './NodeInspector'

type CityMapProps = {
  onSelectNode: (node: NodeInfo) => void
}

function CityMap({ onSelectNode }: CityMapProps) {
  const hospital: NodeInfo = {
    name: 'Hospital Alpha',
    type: 'CRITICAL CARE FACILITY',
    status: 'CRITICAL',
    resourceLabel: 'OXYGEN RESERVE',
    resourceValue: '14%',
    connectivity: 'ONLINE',
    currentAction: 'Request oxygen from Supply Depot 01',
    reason:
      'Oxygen reserves have fallen below the emergency threshold. The depot is reachable and currently holds compatible medical supplies.',
  }

  const shelter: NodeInfo = {
    name: 'North Shelter',
    type: 'EMERGENCY SHELTER',
    status: 'STABLE',
    resourceLabel: 'CAPACITY',
    resourceValue: '68%',
    connectivity: 'ONLINE',
    currentAction: 'Maintain current supply allocation',
    reason:
      'Food, water and medical resources remain above the current emergency thresholds.',
  }

  const depot: NodeInfo = {
    name: 'Supply Depot',
    type: 'LOGISTICS NODE',
    status: 'OPERATIONAL',
    resourceLabel: 'STOCK LEVEL',
    resourceValue: '76%',
    connectivity: 'ONLINE',
    currentAction: 'Prepare oxygen shipment for Hospital Alpha',
    reason:
      'Hospital Alpha has issued the highest-priority reachable medical supply request.',
  }

  const power: NodeInfo = {
    name: 'Power Node',
    type: 'INFRASTRUCTURE NODE',
    status: 'DEGRADED',
    resourceLabel: 'OUTPUT',
    resourceValue: '63%',
    connectivity: 'UNSTABLE',
    currentAction: 'Prioritise hospital and communications circuits',
    reason:
      'Available generation is reduced, so essential medical and communication infrastructure is being prioritised.',
  }

  return (
    <section className="city-panel">
      <div className="map-header">
        <div>
          <span className="eyebrow">LIVE OPERATIONS MAP</span>
          <h2>DURHAM RESPONSE GRID</h2>
        </div>

        <div className="map-live">
          <span className="status-pulse"></span>
          LIVE
        </div>
      </div>

      <div className="city-grid">
        <div className="scan-line"></div>

        <button
          className="map-node hospital-node"
          onClick={() => onSelectNode(hospital)}
        >
          <span className="node-symbol">H</span>
          <span className="node-name">HOSPITAL ALPHA</span>
          <span className="node-state critical-text">CRITICAL</span>
        </button>

        <button
          className="map-node shelter-node"
          onClick={() => onSelectNode(shelter)}
        >
          <span className="node-symbol">S</span>
          <span className="node-name">NORTH SHELTER</span>
          <span className="node-state">ONLINE</span>
        </button>

        <button
          className="map-node depot-node"
          onClick={() => onSelectNode(depot)}
        >
          <span className="node-symbol">D</span>
          <span className="node-name">SUPPLY DEPOT</span>
          <span className="node-state">ONLINE</span>
        </button>

        <button
          className="map-node power-node"
          onClick={() => onSelectNode(power)}
        >
          <span className="node-symbol">P</span>
          <span className="node-name">POWER NODE</span>
          <span className="node-state warning">DEGRADED</span>
        </button>

        <div className="map-crosshair map-crosshair-one"></div>
        <div className="map-crosshair map-crosshair-two"></div>

        <div className="map-coordinates">
          LAT 54.7761 // LNG -1.5733
        </div>
      </div>
    </section>
  )
}

export default CityMap