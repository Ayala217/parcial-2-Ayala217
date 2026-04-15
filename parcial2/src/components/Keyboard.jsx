// src/components/Keyboard.jsx

function Keyboard({ onNumber, onOperator, onEquals, onClear, onDecimal, onToggleSign, onBackspace }) {
  const buttons = [
    { label: 'C',   action: onClear,                  className: 'btn-clear' },
    { label: '+/-', action: onToggleSign,              className: 'btn-special' },
    { label: '⌫',  action: onBackspace,               className: 'btn-special' },
    { label: '÷',   action: () => onOperator('/'),     className: 'btn-operator' },

    { label: '7',   action: () => onNumber('7'),       className: 'btn-number' },
    { label: '8',   action: () => onNumber('8'),       className: 'btn-number' },
    { label: '9',   action: () => onNumber('9'),       className: 'btn-number' },
    { label: '×',   action: () => onOperator('*'),     className: 'btn-operator' },

    { label: '4',   action: () => onNumber('4'),       className: 'btn-number' },
    { label: '5',   action: () => onNumber('5'),       className: 'btn-number' },
    { label: '6',   action: () => onNumber('6'),       className: 'btn-number' },
    { label: '−',   action: () => onOperator('-'),     className: 'btn-operator' },

    { label: '1',   action: () => onNumber('1'),       className: 'btn-number' },
    { label: '2',   action: () => onNumber('2'),       className: 'btn-number' },
    { label: '3',   action: () => onNumber('3'),       className: 'btn-number' },
    { label: '+',   action: () => onOperator('+'),     className: 'btn-operator' },

    { label: '0',   action: () => onNumber('0'),       className: 'btn-number btn-zero' },
    { label: '.',   action: onDecimal,                 className: 'btn-number' },
    { label: '=',   action: onEquals,                  className: 'btn-equals' },
  ];

  return (
    <div className="keyboard">
      {buttons.map((btn, index) => (
        <button
          key={index}
          className={`btn ${btn.className}`}
          onClick={btn.action}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;