import type { NodeInfo } from './NodeInspector'

import ResponseUnit from './ResponseUnit'
import NetworkLinks from './NetworkLinks'

type CityMapProps = {
  onSelectNode: (node: NodeInfo) => void
  networkFailure: boolean
  isolatedSector: string | null
}

function CityMap({
  onSelectNode,
  networkFailure,
  isolatedSector,
}: CityMapProps) {
  const hospitalIsolated =
    isolatedSector === 'hospital'

  const shelterIsolated =
    isolatedSector === 'shelter'

  const depotIsolated =
    isolatedSector === 'depot'

  const powerIsolated =
    networkFailure || isolatedSector === 'power'

  const hospital: NodeInfo = {
    name: 'Hospital Alpha',
    type: 'CRITICAL CARE FACILITY',
    status: hospitalIsolated
      ? 'AUTONOMOUS'
      : 'CRITICAL',
    resourceLabel: 'OXYGEN RESERVE',
    resourceValue: '14%',
    connectivity: hospitalIsolated
      ? 'ISOLATED'
      : 'ONLINE',
    currentAction: hospitalIsolated
      ? 'Prioritise critical patients using local capacity'
      : 'Request oxygen from Supply Depot 01',
    reason: hospitalIsolated
      ? 'Communication with the wider mesh has been lost. The hospital is using locally available information to protect critical patients while continuing essential care.'
      : 'Oxygen reserves have fallen below the emergency threshold. The depot is reachable and currently holds compatible medical supplies.',
  }

  const shelter: NodeInfo = {
    name: 'North Shelter',
    type: 'EMERGENCY SHELTER',
    status: shelterIsolated
      ? 'AUTONOMOUS'
      : 'STABLE',
    resourceLabel: 'CAPACITY',
    resourceValue: '68%',
    connectivity: shelterIsolated
      ? 'ISOLATED'
      : 'ONLINE',
    currentAction: shelterIsolated
      ? 'Continue local shelter operations independently'
      : 'Maintain current supply allocation',
    reason: shelterIsolated
      ? 'Communication with the wider mesh has been interrupted. The shelter is continuing essential operations using locally available information and resources.'
      : 'Food, water and medical resources remain above the current emergency thresholds.',
  }

  const depot: NodeInfo = {
    name: 'Supply Depot',
    type: 'LOGISTICS NODE',
    status: depotIsolated
      ? 'AUTONOMOUS'
      : 'OPERATIONAL',
    resourceLabel: 'STOCK LEVEL',
    resourceValue: '76%',
    connectivity: depotIsolated
      ? 'ISOLATED'
      : 'ONLINE',
    currentAction: depotIsolated
      ? 'Continue previously validated priority deliveries'
      : 'Prepare oxygen shipment for Hospital Alpha',
    reason: depotIsolated
      ? 'The depot cannot reach the wider network, so it is continuing high-priority tasks already validated using its local task history.'
      : 'Hospital Alpha has issued the highest-priority reachable medical supply request.',
  }

  const power: NodeInfo = {
    name: 'Power Node',
    type: 'INFRASTRUCTURE NODE',
    status: powerIsolated
      ? 'AUTONOMOUS'
      : 'DEGRADED',
    resourceLabel: 'OUTPUT',
    resourceValue: '63%',
    connectivity: powerIsolated
      ? 'ISOLATED'
      : 'UNSTABLE',
    currentAction: powerIsolated
      ? 'Maintain essential circuits using local control'
      : 'Prioritise hospital and communications circuits',
    reason: powerIsolated
      ? 'Communication with the wider network has failed. The node is independently preserving hospital and emergency communication circuits using local information.'
      : 'Available generation is reduced, so essential medical and communication infrastructure is being prioritised.',
  }

  return (
    <section className="city-panel">
      <div className="map-header">
        <div>
          <span className="eyebrow">
            LIVE OPERATIONS MAP
          </span>

          <h2>DURHAM RESPONSE GRID</h2>
        </div>

        <div className="map-live">
          <span className="status-pulse"></span>
          LIVE
        </div>
      </div>

      <div className="city-grid">
        <div className="scan-line"></div>

        <NetworkLinks
          networkFailure={networkFailure}
          isolatedSector={isolatedSector}
        />

        <button
          className={
            hospitalIsolated
              ? 'map-node hospital-node isolated-node'
              : 'map-node hospital-node'
          }
          onClick={() => onSelectNode(hospital)}
        >
          <span className="node-symbol">H</span>

          <span className="node-name">
            HOSPITAL ALPHA
          </span>

          <span className="node-state critical-text">
            {hospitalIsolated
              ? 'AUTONOMOUS'
              : 'CRITICAL'}
          </span>
        </button>

        <button
          className={
            shelterIsolated
              ? 'map-node shelter-node isolated-node'
              : 'map-node shelter-node'
          }
          onClick={() => onSelectNode(shelter)}
        >
          <span className="node-symbol">S</span>

          <span className="node-name">
            NORTH SHELTER
          </span>

          <span
            className={
              shelterIsolated
                ? 'node-state critical-text'
                : 'node-state'
            }
          >
            {shelterIsolated
              ? 'AUTONOMOUS'
              : 'ONLINE'}
          </span>
        </button>

        <button
          className={
            depotIsolated
              ? 'map-node depot-node isolated-node'
              : 'map-node depot-node'
          }
          onClick={() => onSelectNode(depot)}
        >
          <span className="node-symbol">D</span>

          <span className="node-name">
            SUPPLY DEPOT
          </span>

          <span
            className={
              depotIsolated
                ? 'node-state critical-text'
                : 'node-state'
            }
          >
            {depotIsolated
              ? 'AUTONOMOUS'
              : 'ONLINE'}
          </span>
        </button>

        <button
          className={
            powerIsolated
              ? 'map-node power-node isolated-node'
              : 'map-node power-node'
          }
          onClick={() => onSelectNode(power)}
        >
          <span className="node-symbol">P</span>

          <span className="node-name">
            POWER NODE
          </span>

          <span
            className={
              powerIsolated
                ? 'node-state critical-text'
                : 'node-state warning'
            }
          >
            {powerIsolated
              ? 'AUTONOMOUS'
              : 'DEGRADED'}
          </span>
        </button>

        <ResponseUnit
          networkFailure={networkFailure}
          isolatedSector={isolatedSector}
        />

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