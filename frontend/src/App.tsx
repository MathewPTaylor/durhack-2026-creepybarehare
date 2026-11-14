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

  return (
    <main className="app">
      <Header />

      <div className="command-layout">
        <StatusPanel />

        <CityMap onSelectNode={setSelectedNode} />

        <IncidentFeed />
      </div>

      <ControlPanel />

      <NodeInspector
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </main>
  )
}

export default App