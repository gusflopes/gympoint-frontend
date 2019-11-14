import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from '~/styles/global';
import { Unform, GridContainer, Content } from './styles';
import PlanSelect from '~/components/PlanSelect';
import DetailsMenu from '~/components/DetailsMenu';
import CurrencyInput from '~/components/CurrencyInput';

export default function RegistrationDetails() {
  const { id } = useParams();
  const initialData = useSelector(state => state.registration.registration);

  const [options, setOptions] = useState([]);
  const [registration, setRegistration] = useState({
    id: null,
    studentId: null,
    planId: null,
    startDate: null,
    endDate: null,
    totalPrice: null,
  });

  useEffect(() => {
    async function loadInitialData() {
      if (id) {
        if (!initialData) {
          history.push('/registrations');
          return;
        }
        console.log(`Initial Data: ${JSON.stringify(initialData)}`);
        // Registration do Redux
        setRegistration(r => ({
          ...r,
          id: initialData.id,
          studentId: initialData.student_id,
          planId: initialData.id,
          startDate: initialData.start_date,
          endDate: initialData.end_date,
          totalPrice: initialData.price,
          option: {
            value: initialData.id,
          },
        }));
      }
      // Load Plans
      const { data } = await api.get('plans');

      setOptions(
        data.map(p => ({
          ...p,
          value: p.id,
          label: p.title,
        }))
      );
    }
    loadInitialData();
  }, [id, initialData]); //eslint-disable-line

  /*
  const schema = Yup.object().shape({
    student: Yup.string().required('Campo obrigatório'),
  });
  */

  function handleSubmit(data) {
    console.log(data);
    // setRegistration(r => ({ ...r, totalPrice: 200 }));
  }

  return (
    <Container>
      <DetailsMenu name="Matrícula" form="Registration" edit={!!id} />

      <Content>
        <Unform
          id="Registration"
          onSubmit={handleSubmit}
          initialData={registration}
        >
          <div className="StudentField">
            <strong>ALUNO</strong>
            <Input name="studentId" />
          </div>

          <GridContainer>
            <div id="plansSelect">
              <PlanSelect
                className="planSelect"
                name="planId"
                label="PLANO"
                options={options}
              />
            </div>

            <div>
              <label>DATA DE INÍCIO</label>
              <Input name="startDate" />
            </div>

            <div>
              <label>DATA DE TÉRMINO</label>
              <Input name="endDate" />
            </div>

            <div>
              <label>VALOR FINAL</label>
              <CurrencyInput
                name="totalPrice"
                label="VALOR FINAL"
                getChange={registration.totalPrice}
                disabled
              />
            </div>
          </GridContainer>
        </Unform>
      </Content>
    </Container>
  );
}
