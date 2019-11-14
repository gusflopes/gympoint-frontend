import React, { useState, useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import api from '~/services/api';

export default function StudentsSelect({ name, label, setChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [timer, setTimer] = useState(null);

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

  async function loadOptions2(inputValue) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    setTimer(
      setTimeout(async () => {
        console.log('Timer finalizado');

        const { data } = await api.get(`students?name=${inputValue}`);

        return data.map(student => ({
          label: student.name,
          value: student.id,
        }));
      }, 500)
    );
  }

  function loadOptions(inputValue) {
    return api
      .get(`students?name=${inputValue}`)
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
        defaultOptions={defaultValue}
        value={defaultValue}
        ref={ref}
        placeholder="Buscar aluno"
        loadOptions={loadOptions}
        onChange={student => handleOnChange(student)}
      />

      {error && <span>{error}</span>}
    </>
  );
}

StudentsSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setChange: PropTypes.func,
};

StudentsSelect.defaultProps = {
  setChange: PropTypes.null,
};
