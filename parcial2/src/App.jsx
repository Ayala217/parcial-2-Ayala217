// src/App.jsx
import { useState } from 'react';
import Display from './components/Display';
import Keyboard from './components/Keyboard';
import './App.css';


const INITIAL_STATE = {
  phase:    'first',
  first:    '',
  operator: null,
  second:   '',
  result:   null,
  errorMsg: null,
};

const MAX_DIGITS = 12;

// ─── Lógica de cálculo (función pura, sin efectos secundarios) ──────────────
function computeResult(a, b, op) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (isNaN(numA) || isNaN(numB)) return { value: null, error: 'Entrada inválida' };
  if (op === '/' && numB === 0)   return { value: null, error: 'Error: ÷ 0' };

  let value;
  switch (op) {
    case '+': value = numA + numB; break;
    case '-': value = numA - numB; break;
    case '*': value = numA * numB; break;
    case '/': value = numA / numB; break;
    default:  return { value: null, error: 'Operador inválido' };
  }
  // Evitar ruido de punto flotante (ej: 0.1 + 0.2 = 0.30000000004)
  return { value: parseFloat(value.toPrecision(10)), error: null };
}

// ─── Reducer de estado ───────────────────────────────────────────────────────
// Toda la lógica de transición vive aquí. Recibe el estado anterior y una
// acción, y devuelve siempre un estado nuevo completo y consistente.
// Esto garantiza que cada interacción produce UNA sola actualización atómica.
function calcReducer(state, action) {
  const { phase, first, operator, second } = state;

  switch (action.type) {

    case 'NUMBER': {
      const digit = action.payload;
      if (phase === 'result' || phase === 'error') {
        return { ...INITIAL_STATE, first: digit === '0' ? '0' : digit };
      }
      if (phase === 'first') {
        if (first.replace('-', '').length >= MAX_DIGITS) return state;
        const newFirst = first === '' || first === '0' ? digit
                       : first === '-0'               ? `-${digit}`
                       : first + digit;
        return { ...state, first: newFirst };
      }
      // phase: 'operator' o 'second'
      if (second.replace('-', '').length >= MAX_DIGITS) return state;
      const newSecond = second === '' || second === '0' ? digit
                      : second === '-0'                 ? `-${digit}`
                      : second + digit;
      return { ...state, phase: 'second', second: newSecond };
    }

    case 'OPERATOR': {
      const op = action.payload;
      if (phase === 'error') return state;
      if (phase === 'result') {
        return { ...INITIAL_STATE, phase: 'operator', first: String(state.result), operator: op };
      }
      if (phase === 'second' && second !== '') {
        const { value, error } = computeResult(first, second, operator);
        if (error) return { ...INITIAL_STATE, phase: 'error', errorMsg: error };
        return { ...INITIAL_STATE, phase: 'operator', first: String(value), operator: op };
      }
      if (first !== '') {
        return { ...state, phase: 'operator', operator: op, second: '' };
      }
      return state;
    }

    case 'EQUALS': {
      if (phase !== 'second' || second === '' || first === '' || !operator) return state;
      const { value, error } = computeResult(first, second, operator);
      if (error) return { ...INITIAL_STATE, phase: 'error', errorMsg: error };
      return { ...state, phase: 'result', result: value, errorMsg: null };
    }

    case 'CLEAR':
      return { ...INITIAL_STATE };

    case 'DECIMAL': {
      if (phase === 'result' || phase === 'error') {
        return { ...INITIAL_STATE, first: '0.' };
      }
      if (phase === 'first') {
        if (first.includes('.')) return state;
        return { ...state, first: first === '' ? '0.' : first + '.' };
      }
      if (second.includes('.')) return state;
      return { ...state, phase: 'second', second: second === '' ? '0.' : second + '.' };
    }

    case 'TOGGLE_SIGN': {
      const toggle = s => s.startsWith('-') ? s.slice(1) : s === '' ? '-' : '-' + s;
      if (phase === 'result') {
        return { ...INITIAL_STATE, first: String(-state.result) };
      }
      if (phase === 'first') return { ...state, first: toggle(first) };
      return { ...state, second: toggle(second) };
    }

    case 'BACKSPACE': {
      if (phase === 'result' || phase === 'error') return { ...INITIAL_STATE };
      if (phase === 'second' && second !== '') {
        return { ...state, second: second.slice(0, -1) };
      }
      if (phase === 'operator' || (phase === 'second' && second === '')) {
        return { ...state, phase: 'first', operator: null, second: '' };
      }
      return { ...state, first: first.slice(0, -1) };
    }

    default:
      return state;
  }
}


function App() {
 
  const [calcState, setCalcState] = useState(INITIAL_STATE);

  // Dispatcher: aplica el reducer y actualiza el estado en un solo paso
  const dispatch = (type, payload) =>
    setCalcState(prev => calcReducer(prev, { type, payload }));

  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <Display
          phase={calcState.phase}
          first={calcState.first}
          operator={calcState.operator}
          second={calcState.second}
          result={calcState.result}
          errorMsg={calcState.errorMsg}
        />
        <Keyboard
          onNumber={digit  => dispatch('NUMBER',      digit)}
          onOperator={op   => dispatch('OPERATOR',    op)}
          onEquals={()     => dispatch('EQUALS')}
          onClear={()      => dispatch('CLEAR')}
          onDecimal={()    => dispatch('DECIMAL')}
          onToggleSign={() => dispatch('TOGGLE_SIGN')}
          onBackspace={()  => dispatch('BACKSPACE')}
        />
      </div>
    </div>
  );
}

export default App;