import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, PlanForm } from './styles';
import CurrencyInput from '~/components/CurrencyInput';

import DetailsMenu from '~/components/DetailsMenu';

export default function PlanDetails() {
  const { id } = useParams();
  const [plan, setPlan] = useState();
  const activePlan = useSelector(state => state.plan.plan);

  useMemo(() => {
    async function loadPlan() {
      if (id) {
        await setPlan(activePlan);
      }
    }
    loadPlan();
  }, [activePlan, id]);

  const yupMessage = {
    required: 'Este campo é obrigatório',
    positive: 'Número precisa ser positivo',
    number: 'Digite um número',
    integer: 'Digite um número inteiro',
  };

  const schema = Yup.object().shape({
    title: Yup.string().required(yupMessage.required),
    duration: Yup.number()
      .integer(yupMessage.integer)
      .required(yupMessage.required)
      .typeError(yupMessage.number),
    price: Yup.string()
      .typeError(yupMessage.number)
      .required(yupMessage.required),
  });

  async function handleSubmit(data) {
    try {
      if (id) {
        await api.put(`plans/${plan.id}`, data);
        return history.goBack();
      }

      await api.post('plans/', data);
      return history.goBack();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  }

  return (
    <Container>
      <DetailsMenu name="Plano" form="planForm" edit={!!id} />

      <Content>
        <PlanForm
          schema={schema}
          id="planForm"
          onSubmit={handleSubmit}
          initialData={plan}
        >
          <div className="fullSize">
            <strong>TÍTULO DO PLANO</strong>
            <Input name="title" />
          </div>
          <div>
            <strong>DURAÇÃO (em meses)</strong>
            <Input name="duration" />
          </div>
          <div>
            <strong>PREÇO MENSAL</strong>
            <CurrencyInput name="price" />
          </div>
          <div>
            <strong>PREÇO TOTAL</strong>
            <CurrencyInput disabled name="totalPrice" />
          </div>
        </PlanForm>
      </Content>
    </Container>
  );
}
