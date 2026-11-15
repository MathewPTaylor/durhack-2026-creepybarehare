import './SystemPulse.css'

type SystemPulseProps = {
  networkFailure: boolean
  reconciliationActive: boolean
}

function SystemPulse({
  networkFailure,
  reconciliationActive,
}: SystemPulseProps) {
  let systemMode = 'SYNCHRONISED'
  let systemClass = 'system-pulse synchronised'

  if (networkFailure) {
    systemMode = 'FRAGMENTED'
    systemClass = 'system-pulse fragmented'
  }

  if (reconciliationActive) {
    systemMode = 'RESYNCHRONISING'
    systemClass = 'system-pulse resynchronising'
  }

  return (
    <section className={systemClass}>
      <div className="pulse-header">
        <div>
          <span className="eyebrow">
            AEGIS NETWORK COMPOSITION
          </span>

          <h3>DISTRIBUTED SYSTEM PULSE</h3>
        </div>

        <span className="pulse-mode">
          {systemMode}
        </span>
      </div>

      <div className="pulse-visualiser">
        <div className="pulse-bar bar-one"></div>
        <div className="pulse-bar bar-two"></div>
        <div className="pulse-bar bar-three"></div>
        <div className="pulse-bar bar-four"></div>
        <div className="pulse-bar bar-five"></div>
        <div className="pulse-bar bar-six"></div>
        <div className="pulse-bar bar-seven"></div>
        <div className="pulse-bar bar-eight"></div>
        <div className="pulse-bar bar-nine"></div>
        <div className="pulse-bar bar-ten"></div>
        <div className="pulse-bar bar-eleven"></div>
        <div className="pulse-bar bar-twelve"></div>
      </div>

      <div className="pulse-agents">
        <div>
          <span className="pulse-agent-dot"></span>
          HOSPITAL
        </div>

        <div>
          <span className="pulse-agent-dot"></span>
          SHELTER
        </div>

        <div>
          <span className="pulse-agent-dot"></span>
          LOGISTICS
        </div>

        <div>
          <span className="pulse-agent-dot"></span>
          POWER
        </div>
      </div>

      <div className="pulse-description">
        {networkFailure
          ? 'Independent local rhythms remain active while communication sectors are fragmented.'
          : reconciliationActive
            ? 'Independent event histories are converging towards a shared operational state.'
            : 'Independent agents are synchronised around a shared emergency-response objective.'}
      </div>
    </section>
  )
}

export default SystemPulse