import './SectorIsolationModal.css'

type SectorIsolationModalProps = {
  onClose: () => void
  onIsolate: (sector: string) => void
}

function SectorIsolationModal({
  onClose,
  onIsolate,
}: SectorIsolationModalProps) {
  return (
    <div className="sector-modal-overlay">
      <section className="sector-modal">
        <div className="sector-modal-header">
          <div>
            <span className="eyebrow">
              AEGIS NETWORK CONTROL
            </span>

            <h2>ISOLATE NETWORK NODE</h2>

            <p>
              Select an actor to remove from the communication mesh.
              The isolated actor will continue operating using local autonomy.
            </p>
          </div>

          <button
            className="sector-modal-close"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div className="sector-options">
          <button
            className="sector-option"
            type="button"
            onClick={() => onIsolate('hospital')}
          >
            <span className="sector-option-icon">
              H
            </span>

            <div>
              <strong>HOSPITAL ALPHA</strong>
              <span>Critical care facility</span>
            </div>

            <span className="sector-option-action">
              ISOLATE
            </span>
          </button>

          <button
            className="sector-option"
            type="button"
            onClick={() => onIsolate('shelter')}
          >
            <span className="sector-option-icon">
              S
            </span>

            <div>
              <strong>NORTH SHELTER</strong>
              <span>Emergency shelter node</span>
            </div>

            <span className="sector-option-action">
              ISOLATE
            </span>
          </button>

          <button
            className="sector-option"
            type="button"
            onClick={() => onIsolate('depot')}
          >
            <span className="sector-option-icon">
              D
            </span>

            <div>
              <strong>SUPPLY DEPOT</strong>
              <span>Logistics and resource node</span>
            </div>

            <span className="sector-option-action">
              ISOLATE
            </span>
          </button>

          <button
            className="sector-option"
            type="button"
            onClick={() => onIsolate('power')}
          >
            <span className="sector-option-icon">
              P
            </span>

            <div>
              <strong>POWER NODE</strong>
              <span>Critical infrastructure node</span>
            </div>

            <span className="sector-option-action">
              ISOLATE
            </span>
          </button>
        </div>

        <div className="sector-modal-warning">
          <span>!</span>

          <p>
            Isolation affects communication only. The selected
            actor will continue making independent local decisions.
          </p>
        </div>

        <button
          className="sector-cancel-button"
          type="button"
          onClick={onClose}
        >
          CANCEL
        </button>
      </section>
    </div>
  )
}

export default SectorIsolationModal