type HeaderProps = {
  networkFailure: boolean
}

function Header({ networkFailure }: HeaderProps) {
  return (
    <header className="command-header">
      <div className="brand">
        <div className="brand-mark">
          <span>A</span>
        </div>

        <div>
          <div className="brand-title">AEGIS</div>
          <div className="brand-subtitle">
            AUTONOMOUS EMERGENCY INTELLIGENCE NETWORK
          </div>
        </div>
      </div>

      <div className="header-centre">
        <span className="command-label">COMMAND CENTRE</span>
        <span className="sector-id">DURHAM // SECTOR 01</span>
      </div>

      <div className="system-status">
        <span
          className={
            networkFailure
              ? 'status-pulse danger-pulse'
              : 'status-pulse'
          }
        ></span>

        <div>
          <span className="status-label">SYSTEM STATUS</span>

          <strong className={networkFailure ? 'system-degraded' : ''}>
            {networkFailure ? 'DEGRADED' : 'OPERATIONAL'}
          </strong>
        </div>
      </div>
    </header>
  )
}

export default Header