import React, { useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import api from '~/services/api';

export default function StudentSelect({ name, label, setChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    return selectRef.select.state.value;
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

StudentSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setChange: PropTypes.func,
};

StudentSelect.defaultProps = {
  setChange: PropTypes.null,
};
