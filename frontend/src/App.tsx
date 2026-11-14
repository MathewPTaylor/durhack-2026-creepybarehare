import { useEffect, useState } from 'react'

import './App.css'

import Header from './components/Header'
import StatusPanel from './components/StatusPanel'
import CityMap from './components/CityMap'
import IncidentFeed from './components/IncidentFeed'
import ControlPanel from './components/ControlPanel'
import NodeInspector from './components/NodeInspector'
import IncidentModal from './components/IncidentModal'
import ReconciliationOverlay from './components/ReconciliationOverlay'
import TelemetryPanel from './components/TelemetryPanel'
import SystemPulse from './components/SystemPulse'

import type { NodeInfo } from './components/NodeInspector'
import type { Incident } from './components/IncidentModal'

function App() {
  const [selectedNode, setSelectedNode] =
    useState<NodeInfo | null>(null)

  const [networkFailure, setNetworkFailure] =
    useState(false)

  const [incidentModalOpen, setIncidentModalOpen] =
    useState(false)

  const [customIncidents, setCustomIncidents] =
    useState<Incident[]>([])

  const [reconciliationActive, setReconciliationActive] =
    useState(false)

  const [reconciliationProgress, setReconciliationProgress] =
    useState(0)

  function toggleNetworkFailure() {
    setSelectedNode(null)

    if (networkFailure) {
      setReconciliationProgress(0)
      setReconciliationActive(true)
      return
    }

    setNetworkFailure(true)
  }

  function createIncident(incident: Incident) {
    setCustomIncidents((currentIncidents) => [
      incident,
      ...currentIncidents,
    ])

    setIncidentModalOpen(false)
  }

  useEffect(() => {
    if (!reconciliationActive) {
      return
    }

    const progressTimer = window.setInterval(() => {
      setReconciliationProgress((currentProgress) => {
        const nextProgress = currentProgress + 4

        if (nextProgress >= 100) {
          window.clearInterval(progressTimer)

          window.setTimeout(() => {
            setNetworkFailure(false)
            setReconciliationActive(false)
            setReconciliationProgress(0)
          }, 700)

          return 100
        }

        return nextProgress
      })
    }, 100)

    return () => {
      window.clearInterval(progressTimer)
    }
  }, [reconciliationActive])

  return (
    <main
      className={
        networkFailure
          ? 'app network-failure'
          : 'app'
      }
    >
      <Header networkFailure={networkFailure} />

      {networkFailure && (
        <div className="failure-alert">
          <div>
            <span className="failure-alert-icon">
              !
            </span>

            <div>
              <strong>
                NETWORK PARTITION DETECTED
              </strong>

              <span>
                EAST DISTRICT // LOCAL AUTONOMY ENGAGED
              </span>
            </div>
          </div>

          <span className="failure-time">
            LIVE EVENT
          </span>
        </div>
      )}

      <div className="command-layout">
        <StatusPanel
          networkFailure={networkFailure}
        />

        <CityMap
          onSelectNode={setSelectedNode}
          networkFailure={networkFailure}
        />

        <IncidentFeed
          networkFailure={networkFailure}
          customIncidents={customIncidents}
        />
      </div>

      <TelemetryPanel
        networkFailure={networkFailure}
      />

      <SystemPulse
        networkFailure={networkFailure}
        reconciliationActive={reconciliationActive}
      />

      <ControlPanel
        networkFailure={networkFailure}
        onToggleNetwork={toggleNetworkFailure}
        onOpenIncidentModal={() =>
          setIncidentModalOpen(true)
        }
      />

      <NodeInspector
        node={selectedNode}
        onClose={() =>
          setSelectedNode(null)
        }
      />

      {incidentModalOpen && (
        <IncidentModal
          onClose={() =>
            setIncidentModalOpen(false)
          }
          onCreateIncident={createIncident}
        />
      )}

      {reconciliationActive && (
        <ReconciliationOverlay
          progress={reconciliationProgress}
        />
      )}
    </main>
  )
}

export default App