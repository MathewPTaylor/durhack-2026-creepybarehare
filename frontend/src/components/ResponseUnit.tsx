import './ResponseUnit.css'

type ResponseUnitProps = {
  networkFailure: boolean
  isolatedSector: string | null
}

function ResponseUnit({
  networkFailure,
  isolatedSector,
}: ResponseUnitProps) {
  let status = 'EN ROUTE'
  let detail = 'OXYGEN DELIVERY'

  const localAutonomy =
    networkFailure ||
    isolatedSector === 'hospital' ||
    isolatedSector === 'depot'

  if (networkFailure) {
    status = 'LOCAL AUTONOMY'
    detail = 'MISSION CONTINUING'
  } else if (isolatedSector === 'depot') {
    status = 'LOCAL MISSION'
    detail = 'DEPOT LINK LOST'
  } else if (isolatedSector === 'hospital') {
    status = 'LAST-KNOWN MISSION'
    detail = 'HOSPITAL LINK LOST'
  }

  return (
    <div
      className={
        localAutonomy
          ? 'response-unit autonomous-unit'
          : 'response-unit'
      }
    >
      <div className="response-unit-icon">
        R1
      </div>

      <div className="response-unit-label">
        <strong>MEDICAL SUPPLY UNIT</strong>

        <span>{status}</span>

        <small>{detail}</small>
      </div>
    </div>
  )
}

export default ResponseUnit