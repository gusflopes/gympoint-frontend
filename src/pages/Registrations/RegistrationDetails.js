import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from '~/styles/global';
import { Unform } from './styles';
import DetailsMenu from '~/components/DetailsMenu';
import CurrencyInput from '~/components/CurrencyInput';

export default function RegistrationDetails() {
  const { id } = useParams();
  const initialData = useSelector(state => state.registration.registration);

  const [registration, setRegistration] = useState({
    id: null,
    studentId: null,
    planId: null,
    startDate: null,
    endDate: null,
    totalPrice: null,
  });

  useMemo(() => {
    async function loadPlan() {
      if (id) {
        if (!initialData) {
          history.push('/registrations');
          return;
        }
        console.log(`activePlan: ${JSON.stringify(initialData)}`);

        setRegistration(r => ({
          ...r,
          id: initialData.id,
          studentId: initialData.student_id,
          planId: initialData.id,
          startDate: initialData.start_date,
          endDate: initialData.end_date,
          totalPrice: initialData.price,
        }));
      }
    }
    loadPlan();
  }, [id, initialData]);

  const schema = Yup.object().shape({
    student: Yup.string().required('Campo obrigatório'),
  });

  async function handleSubmit() {
    console.log('Handle Submit');

    setRegistration(r => ({ ...r, totalPrice: 200 }));
  }

  useEffect(() => {
    const { planId, startDate } = registration;
    console.log('Pescando alterações no state');
  }, [registration]);

  return (
    <Container>
      <DetailsMenu name="Matrícula" form="Registration" edit={!!id} />

      <Content>
        <Unform
          schema={schema}
          id="Registration"
          onSubmit={handleSubmit}
          initialData={registration}
        >
          <div className="fullSize">
            <strong>ALUNO</strong>
            <Input name="studentId" />
          </div>

          <div>
            <strong>PLANO</strong>
            <Input name="planId" />
          </div>

          <div>
            <strong>DATA DE INÍCIO</strong>
            <Input name="startDate" />
          </div>

          <div>
            <strong>DATA DE TÉRMINO</strong>
            <Input name="endDate" />
          </div>

          <div>
            <strong>VALOR FINAL</strong>
            <CurrencyInput
              name="totalPrice"
              label="VALOR FINAL"
              getChange={registration.totalPrice}
              disabled
            />
          </div>
        </Unform>
      </Content>
    </Container>
  );
}
