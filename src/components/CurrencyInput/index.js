import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function CurrencyInput({ name, disabled }) {
  const ref = useRef();
  const { fieldName, defaultValue, registerField } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.value',
        clearValue: pickerRef => {
          pickerRef.setInputValue(null);
        }
  
      });
    }
  }, [ref, fieldName]); // eslint-disable-line

  return (
    <>
      <NumberFormat
        thousandSeparator="."
        isNumericString
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
        prefix="R$ "
        ref={ref}
        mask='_'
        name={fieldName}
        value={value}
        onValueChange={values => {
          setValue(values.floatValue);
          console.log(values.floatValue);
        }}
        disabled={!!disabled}
      />
    </>
  );
}

CurrencyInput.defaultProps = {
  disabled: false,
};

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
