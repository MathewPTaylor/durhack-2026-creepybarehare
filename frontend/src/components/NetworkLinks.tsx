import './NetworkLinks.css'

type NetworkLinksProps = {
  networkFailure: boolean
  isolatedSector?: string | null
}

function NetworkLinks({
  networkFailure,
  isolatedSector = null,
}: NetworkLinksProps) {
  const hospitalIsolated =
    isolatedSector === 'hospital'

  const shelterIsolated =
    isolatedSector === 'shelter'

  const depotIsolated =
    isolatedSector === 'depot'

  const powerIsolated =
    isolatedSector === 'power'

  const hospitalShelterFailed =
    networkFailure ||
    hospitalIsolated ||
    shelterIsolated

  const hospitalDepotFailed =
    networkFailure ||
    hospitalIsolated ||
    depotIsolated

  const shelterPowerFailed =
    networkFailure ||
    shelterIsolated ||
    powerIsolated

  const depotPowerFailed =
    networkFailure ||
    depotIsolated ||
    powerIsolated

  return (
    <svg
      className="network-links"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="networkGlow">
          <feGaussianBlur
            stdDeviation="0.45"
            result="blur"
          />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <line
        x1="27"
        y1="29"
        x2="73"
        y2="19"
        className={
          hospitalShelterFailed
            ? 'svg-network-link svg-link-failed'
            : 'svg-network-link'
        }
      />

      <line
        x1="23"
        y1="37"
        x2="36"
        y2="72"
        className={
          hospitalDepotFailed
            ? 'svg-network-link svg-link-failed'
            : 'svg-network-link'
        }
      />

      <line
        x1="76"
        y1="27"
        x2="69"
        y2="67"
        className={
          shelterPowerFailed
            ? 'svg-network-link svg-link-failed'
            : 'svg-network-link'
        }
      />

      <line
        x1="43"
        y1="78"
        x2="62"
        y2="73"
        className={
          depotPowerFailed
            ? 'svg-network-link svg-link-failed'
            : 'svg-network-link'
        }
      />

      <circle
        cx="27"
        cy="29"
        r="0.75"
        className={
          hospitalIsolated
            ? 'svg-network-junction svg-junction-failed'
            : 'svg-network-junction'
        }
      />

      <circle
        cx="73"
        cy="19"
        r="0.75"
        className={
          shelterIsolated
            ? 'svg-network-junction svg-junction-failed'
            : 'svg-network-junction'
        }
      />

      <circle
        cx="36"
        cy="72"
        r="0.75"
        className={
          depotIsolated
            ? 'svg-network-junction svg-junction-failed'
            : 'svg-network-junction'
        }
      />

      <circle
        cx="69"
        cy="67"
        r="0.75"
        className={
          powerIsolated
            ? 'svg-network-junction svg-junction-failed'
            : 'svg-network-junction'
        }
      />
    </svg>
  )
}

export default NetworkLinks