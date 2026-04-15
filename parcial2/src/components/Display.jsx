

function Display({ phase, first, operator, second, result, errorMsg }) {
  
  const getExpression = () => {
    if (phase === 'result') return `${first} ${operator} ${second}`;
    if (phase === 'operator' || phase === 'second') return `${first} ${operator}`;
    return '';
  };

  const getMainValue = () => {
    if (phase === 'error')    return errorMsg;
    if (phase === 'result')   return String(result);
    if (phase === 'second')   return second !== '' ? second : '0';
    if (phase === 'operator') return '0';
    return first !== '' ? first : '0';
  };

  return (
    <div className="display">
      <div className="display-expression">{getExpression()}</div>
      <div className={`display-main ${phase === 'error' ? 'error' : ''}`}>
        {getMainValue()}
      </div>
    </div>
  );
}

export default Display;