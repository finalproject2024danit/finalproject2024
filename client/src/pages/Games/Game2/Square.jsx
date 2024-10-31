import React from 'react';
import PropTypes from 'prop-types';

function Square({ value, setSquareValue }) {
  return (
    <button
      onClick={setSquareValue}
      style={{
        color: '#61dafb', // Завжди однаковий колір тексту
        backgroundColor: 'transparent',
        border: '2px solid #61dafb', // Додано ширину і тип бордера
        fontSize: '24px',
        cursor: 'pointer',
        padding: '10px',
        width: '15vh',
        height: '15vh',
      }}
    >
      {value || '-'}
    </button>
  );
}

// Додавання валідації пропсів
Square.propTypes = {
  value: PropTypes.string, // Може бути рядком або null
  setSquareValue: PropTypes.func.isRequired, // Має бути функцією
};

export default Square;


