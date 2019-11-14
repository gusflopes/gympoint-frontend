import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from '~/styles/global';
import { Unform, GridContainer, Content } from './styles';
import PlanSelect from '~/components/PlanSelect';
import StudentSelect from '~/components/StudentSelect';
import DatePicker from '~/components/DatePicker';
import DetailsMenu from '~/components/DetailsMenu';
import CurrencyInput from '~/components/CurrencyInput';

export default function RegistrationDetails() {
  const { id } = useParams();
  const reduxData = useSelector(state => state.registration.registration);

  const [options, setOptions] = useState([]);
  const [student, setStudent] = useState({});
  const [initialData, setInitialData] = useState();
  const [registration, setRegistration] = useState({
    id: null,
    student_id: null,
    plan_id: null,
    start_date: null,
    end_date: null,
    total_price: null,
  });

  useEffect(() => {
    async function loadInitialData() {
      if (id) {
        if (!reduxData) {
          history.push('/registrations');
          return;
        }
        console.log(`Initial Data: ${JSON.stringify(reduxData)}`);
        // Registration do Redux
        setRegistration(r => ({
          ...r,
          id: reduxData.id,
          student: reduxData.student,
          plan: reduxData.plan,
          start_date: reduxData.start_date,
          end_date: reduxData.end_date,
          total_price: reduxData.price,
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

      setInitialData({
        student: {
          label: reduxData.student.name,
          value: reduxData.student.id,
        },
        plan: {
          label: reduxData.plan.title,
          value: reduxData.plan.id,
        },
      });
    }
    loadInitialData();
  }, [id, reduxData]); //eslint-disable-line

  /*
  const schema = Yup.object().shape({
    student: Yup.string().required('Campo obrigatório'),
  });
  */

  function handleSubmit(data) {
    console.log(data);

    const plan_id = data.plan.value;
    const student_id = data.student.value;
    const { start_date } = data;

    api.post('enrollments', { plan_id, student_id, start_date });

    // setRegistration(r => ({ ...r, totalPrice: 200 }));
  }

  return (
    <Container>
      <DetailsMenu name="Matrícula" form="Registration" edit={!!id} />

      <Content>
        <Unform
          id="Registration"
          onSubmit={handleSubmit}
          initialData={initialData}
        >
          <div className="StudentField">
            <StudentSelect
              name="student"
              label="ALUNO"
              defaultValue={student}
              setChange={setStudent}
            />
          </div>

          <GridContainer>
            <div id="plansSelect">
              <PlanSelect
                className="planSelect"
                name="plan"
                label="PLANO"
                options={options}
              />
            </div>

            <div>
              <label htmlFor="start_date">DATA DE INICIO</label>
              <DatePicker
                name="start_date"
                onChange={date =>
                  setRegistration(r => ({ ...r, startDate: date }))
                }
              />
            </div>

            <div>
              <label htmlFor="end_date">DATA DE TÉRMINO</label>
              <DatePicker
                name="end_date"
                getChange={registration.end_date}
                disabled
              />
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
