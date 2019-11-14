import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { useField } from '@rocketseat/unform';

export default function ReactSelect({ name, label, options }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectedValue = selectRef.state.value;
    return selectedValue;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        label={label}
        aria-label={fieldName}
        defaultValue={defaultValue}
        options={options}
        placeholder="Selecione"
        ref={ref}
      />

      {error && <span>{error}</span>}
    </>
  );
}

ReactSelect.defaultProps = {
  label: null,
};

ReactSelect.propTypes = {
  name: PropTypes.objectOf(PropTypes.object).isRequired,
  options: PropTypes.objectOf(PropTypes.object).isRequired,
  label: PropTypes.string,
};
