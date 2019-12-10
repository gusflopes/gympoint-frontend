import React, { useState, useRef, useEffect, useMemo } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import api from '~/services/api';

export default function StudentSelect({ name, label, setChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [options, setOptions] = useState();
  const [timer, setTimer] = useState(null);

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

  useMemo(() => {
    async function loadStudents() {
      const response = await api.get('students');
      const students = response.data.map(student => ({
        label: student.name,
        value: student.id,
      }));

      setOptions(students);
    }

    loadStudents();
  }, []);

  /*
  async function loadOptions(inputValue) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    setTimer(
      setTimeout(async () => {
        console.log('Timer finalizado');

        const { data } = await api.get(`students?name=${inputValue}`);

        const students = data.map(student => ({
          label: student.name,
          value: student.id,
        }));
        setOptions(students);
      }, 500)
    );
  }
  */

  /*
  function loadOptionsOLD(inputValue) {
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
  */

  function handleOnChange(student) {
    // if (setChange) {
    setChange(student);
    // }
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        defaultValue={defaultValue}
        // loadOptions={loadOptions}
        label={label}
        options={options}
        // defaultOptions
        placeholder="Buscar aluno"
        onChange={student => handleOnChange(student)}
        ref={ref}
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
