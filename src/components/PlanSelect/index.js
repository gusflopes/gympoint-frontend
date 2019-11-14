import React, { useRef, useEffect, useState, useMemo } from 'react';
import Select from 'react-select';

import { useField } from '@rocketseat/unform';

import api from '~/services/api';

export default function ReactSelect({ name, label, setChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [options, setOptions] = useState();

  function parseSelectValue(selectRef) {
    const selectedValue = selectRef.state.value;
    return selectedValue;
  }

  useMemo(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      const plans = response.data.map(plan => ({
        label: plan.title,
        value: plan.id,
        duration: plan.duration,
        price: plan.price,
      }));
      setOptions(plans);
    }

    loadPlans();
  }, []);

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

  function handleOnChange(plan) {
    setChange(plan);
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        defaultValue={defaultValue}
        label={label}
        options={options}
        placeholder="Selecione o plano"
        onChange={plan => handleOnChange(plan)}
        ref={ref}
      />

      {error && <span>{error}</span>}
    </>
  );
}
