import React, { useState, useEffect, useMemo } from 'react';
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
  const activePlan = useSelector(state => state.plan.plan);

  const [plan, setPlan] = useState();
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState();

  useMemo(() => {
    async function loadPlan() {
      if (id) {
        if (!activePlan) {
          history.push('/plans');
          return;
        }
        console.log(`activePlan: ${JSON.stringify(activePlan)}`);
        setPlan(activePlan);
        setDuration(activePlan.duration);
        setPrice(activePlan.price);
      }
    }
    loadPlan();
  }, [activePlan, id]);

  useEffect(() => {
    console.log(plan);
    console.log(`Price: ${price} e Duration: ${duration}`);

    const newTotalPrice = price * duration;

    setPlan({ ...plan, totalPrice: newTotalPrice });
    setTotalPrice(newTotalPrice);
    console.log(`New totalPrice: ${newTotalPrice}`);
  }, [price, duration]); //eslint-disable-line

  useEffect(() => {
    console.log(`Alteração no state de plan`);
    console.log(`Plan: ${JSON.stringify(plan)}`);
  }, [plan]);

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
            <Input
              name="duration"
              onChange={e => setDuration(e.target.value)}
            />
          </div>
          <div>
            <strong>PREÇO MENSAL</strong>
            <CurrencyInput name="price" setChange={setPrice} />
          </div>
          <div>
            <strong>PREÇO TOTAL</strong>
            <CurrencyInput disabled name="totalPrice" getChange={totalPrice} />
          </div>
        </PlanForm>
      </Content>
    </Container>
  );
}
