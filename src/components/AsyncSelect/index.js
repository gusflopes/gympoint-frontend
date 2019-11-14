import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

export default function ReactSelect({ name, label, options }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    return selectRef.state.value;
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

  function loadOptions(inputValue) {
    return api
      .get(`students?q=${inputValue}`)
      .then(r => r.data)
      .then(r =>
        r.map(student => ({
          label: student.name,
          value: student.id,
        }))
      );
  }

  function handleOnChange(student) {
    if (setChange) {
      setChange(student);
    }
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <AsyncSelect
        name={fieldName}
        aria-label={fieldName}
        defaultValue
        value={defaultValue}
        ref={ref}
        placeholder="Buscar aluno"
        loadOptions={loadOptions}
        defaultOptions
        onChange={student => handleOnChange(student)}
      />

      {error && <span>{error}</span>}
    </>
  );
}
AsyncSelect.defaultProps = {
  label: null,
};

AsyncSelect.propTypes = {
  name: PropTypes.objectOf(PropTypes.object).isRequired,
  options: PropTypes.objectOf(PropTypes.object).isRequired,
  label: PropTypes.string,
};
