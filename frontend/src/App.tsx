import { useState } from 'react'

import './App.css'

import Header from './components/Header'
import StatusPanel from './components/StatusPanel'
import CityMap from './components/CityMap'
import IncidentFeed from './components/IncidentFeed'
import ControlPanel from './components/ControlPanel'
import NodeInspector from './components/NodeInspector'

import type { NodeInfo } from './components/NodeInspector'

function App() {
  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null)

  const [networkFailure, setNetworkFailure] = useState(false)

  function toggleNetworkFailure() {
    setNetworkFailure((currentValue) => !currentValue)
    setSelectedNode(null)
  }

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
            <span className="failure-alert-icon">!</span>

            <div>
              <strong>NETWORK PARTITION DETECTED</strong>

              <span>
                EAST DISTRICT // LOCAL AUTONOMY ENGAGED
              </span>
            </div>
          </div>

          <span className="failure-time">LIVE EVENT</span>
        </div>
      )}

      <div className="command-layout">
        <StatusPanel networkFailure={networkFailure} />

        <CityMap
          onSelectNode={setSelectedNode}
          networkFailure={networkFailure}
        />

        <IncidentFeed networkFailure={networkFailure} />
      </div>

      <ControlPanel
        networkFailure={networkFailure}
        onToggleNetwork={toggleNetworkFailure}
      />

      <NodeInspector
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </main>
  )
}

export default App