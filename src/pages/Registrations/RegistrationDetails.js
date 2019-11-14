import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format, parseISO, differenceInMonths, addMonths } from 'date-fns';
import { Form } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import DetailsMenu from '~/components/DetailsMenu';
import PlanSelect from '~/components/PlanSelect';
import DatePicker from '~/components/DatePicker';
import CurrencyInputOld from '~/components/CurrencyInputOld';

import { Container, GridContainer } from './styles';

import StudentSelect from '~/components/StudentSelect';

import api from '~/services/api';
import history from '~/services/history';

export default function EditEnrollment() {
  const { id } = useParams();
  const { registration } = useSelector(state => state.registration);
  const [newStudent, setNewStudent] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [newPlan, setNewPlan] = useState();
  const [initialData, setInitialData] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useMemo(() => {
    if (registration) {
      const duration = differenceInMonths(
        new Date(registration.end_date),
        new Date(registration.start_date)
      );

      setInitialData({
        student: {
          label: registration.student.name,
          value: registration.student.id,
        },
        plan: {
          label: registration.plan.title,
          value: registration.plan.id,
        },
      });
      setStartDate(new Date(registration.start_date));
      setNewPlan({
        ...registration.plan,
        price: registration.price,
        duration,
      });
      setNewStudent({
        label: registration.student.name,
        value: registration.student.id,
      });
    }
  }, [registration]);

  async function handleSubmit({ student, plan }) {
    console.log(
      `Student: ${student.value}, Plan: ${plan.value}, Start: ${startDate}`
    );
    try {
      await api.put(`enrollments/${registration.id}`, {
        student_id: student.value,
        plan_id: plan.value,
        start_date: startDate,
      });

      toast.success('Alteração efetuada com sucesso');
      history.push('/registrations');
    } catch (err) {
      const { error } = err.response.data;
      if (error) {
        toast.error(
          'A data inicial da matrícula não pode ser menor que a data atual'
        );
        return;
      }
      toast.error('Não foi possível alterar a matrícula');
    }
  }

  useEffect(() => {
    if (newPlan) {
      const parsedStartDate = parseISO(format(startDate, 'yyyy-MM-dd'));
      const incrementedStartDate = addMonths(parsedStartDate, newPlan.duration);
      setEndDate(new Date(incrementedStartDate));
      setTotalPrice(newPlan.duration * newPlan.price);
    }
  }, [startDate, newPlan]);

  return (
    <Container>
      <DetailsMenu name="Matrícula" form="formEditEnrollment" edit={!!id} />

      <Form
        id="formEditEnrollment"
        initialData={initialData}
        onSubmit={handleSubmit}
      >
        <StudentSelect
          name="student"
          label="ALUNO"
          defaultValue={newStudent}
          setChange={setNewStudent}
        />

        <GridContainer>
          <div id="plansSelect">
            <PlanSelect name="plan" label="PLANO" setChange={setNewPlan} />
          </div>

          <div>
            <label htmlFor="start_date">DATA DE INICIO</label>
            <DatePicker
              name="start_date"
              setChange={setStartDate}
              getChange={startDate}
            />
          </div>

          <div>
            <label htmlFor="end_date">DATA DE TÉRMINO</label>
            <DatePicker name="end_date" getChange={endDate} disabled />
          </div>

          <div>
            <CurrencyInputOld
              name="total"
              label="VALOR FINAL"
              getChange={totalPrice}
              disabled
            />
          </div>
        </GridContainer>
      </Form>
    </Container>
  );
}
