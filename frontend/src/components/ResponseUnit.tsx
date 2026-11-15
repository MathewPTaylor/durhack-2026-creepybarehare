import './ResponseUnit.css'

type ResponseUnitProps = {
  networkFailure: boolean
}

function ResponseUnit({
  networkFailure,
}: ResponseUnitProps) {
  return (
    <div
      className={
        networkFailure
          ? 'response-unit autonomous-unit'
          : 'response-unit'
      }
    >
      <div className="response-unit-icon">
        R1
      </div>

      <div className="response-unit-label">
        <strong>MEDICAL SUPPLY UNIT</strong>

        <span>
          {networkFailure
            ? 'LOCAL AUTONOMY'
            : 'EN ROUTE'}
        </span>
      </div>
    </div>
  )
}

export default ResponseUnit