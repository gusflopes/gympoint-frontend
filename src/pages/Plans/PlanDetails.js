import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, PlanForm } from './styles';

import DetailsMenu from '~/components/DetailsMenu';

export default function PlanDetails() {
  const { id } = useParams();
  const [plan, setPlan] = useState();
  const redux = useSelector(state => state.plan.plan);

  useEffect(() => {
    async function loadPlan() {
      if (id) {
        await setPlan(redux);
        console.log('Id = true');
        return
      }
      console.log('Id = false');
    }
    loadPlan();
  }, []);

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
      .truncate()
      .typeError(yupMessage.number),
    price: Yup.number().typeError(yupMessage.number),
  });

  async function handleSubmit(data) {
    if (id) {
      console.log('Editando');
      const response = await api.put(`plans/${plan.id}`, data);
      console.log(JSON.stringify(response.data));
      return history.goBack();
    }

    console.log('Criando novo');
    const response = await api.post('plans/', data);
    console.log(JSON.stringify(response.data));
    return history.goBack();
  }

  return (
    <Container>
      <DetailsMenu name="Plano" form="planForm" edit={id?true:false} />

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
            <Input name="price" />
          </div>
          <div>
            <strong>PREÇO TOTAL</strong>
            <Input disabled name="totalPrice" />
          </div>
        </PlanForm>
      </Content>
    </Container>
  );
}
