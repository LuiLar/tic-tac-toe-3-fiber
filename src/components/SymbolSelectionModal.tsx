import { useContext } from 'react';
import './SymbolSelectionModal.css';
import { GameControllerContext } from '../providers/GameControllerProvider';
import { BoardPiece } from '../enums';

const SymbolSelectionModal = () => {
  const { showSymbolSelectionModal, onSymbolSelectionModalClose } = useContext(GameControllerContext)

  if (!showSymbolSelectionModal) return null

  return (
    <div id="symbol-selection-modal">
      <div className="symbol-selection-container">
        <p>Select Your Symbol</p>
        <div className="symbol-selection-actions">
          <button onClick={() => onSymbolSelectionModalClose(BoardPiece.X)}>X</button>
          <button onClick={() => onSymbolSelectionModalClose(BoardPiece.O)}>O</button>
        </div>
      </div>
    </div>
  )
}

export default SymbolSelectionModal;
