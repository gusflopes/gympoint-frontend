import React, { useEffect, useState, useRef } from 'react';
import NumberFormat from 'react-number-format';

import { useField } from '@rocketseat/unform';

export default function CurrencyInput({ name, inputMask }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [mask, setMask] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      clearValue: pickerRef => {
        pickerRef.setInputValue(null);
      }
    });
  }, [ref.current, fieldName]);

  function handleMask(e) {
    const { value } = e.target;
    
    return setMask(value);
  }

  return (
    <>
      <NumberFormat
        thousandSeparator={'.'}
        decimalSeparator={','}
        fixedDecimalScale={2}
        prefix={'R$'}
        name={fieldName}
        mask={inputMask}
        value={mask}
        onChange={e => handleMask(e)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}