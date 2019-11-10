import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, StudentForm } from './styles';

import DetailsMenu from '~/components/DetailsMenu';

export default function StudentDetails() {
  const {id} = useParams();
  const [student, setStudent] = useState();

      useEffect(() => {

        async function loadStudent() {
          const { data } = await api.get(`students/${id}`);
          setStudent(data);
        }
        if (id) {
            loadStudent();
        }
      }, [id]);

  const yupMessage = {
    email: 'Insira um email válido',
    required: 'Este campo é obrigatório',
    positive: 'Número precisa ser positivo',
    number: 'Digite um número',
    integer: 'Digite um número inteiro',
  };

  const schema = Yup.object().shape({
    name: Yup.string().required(yupMessage.required),
    email: Yup.string()
      .email(yupMessage.email)
      .required(yupMessage.required),
    age: Yup.number()
      .integer(yupMessage.integer)
      .truncate()
      .typeError(yupMessage.number),
    weight: Yup.number()
      .integer(yupMessage.integer)
      .truncate()
      .typeError(yupMessage.number),
    height: Yup.number()
      .truncate()
      .typeError(yupMessage.number),
  });

  async function handleSubmit(data) {
    if (id) {
      await api.put(`students/${id}`, data);
      return history.goBack();
    }

    await api.post('students/', data);
    history.goBack();
  }

  return (
    <Container>
      <DetailsMenu name="Aluno" form="studentForm" edit={id?true:false} />

      <Content>
        <StudentForm
          schema={schema}
          id="studentForm"
          onSubmit={handleSubmit}
          initialData={student}
        >
          <div className="fullSize">
            <strong>NOME COMPLETO</strong>
            <Input name="name" />
          </div>
          <div className="fullSize">
            <strong>ENDEREÇO DE E-MAIL</strong>
            <Input name="email" />
          </div>
          <div>
            <strong>IDADE</strong>
            <Input name="age" />
          </div>
          <div>
            <strong>PESO (kg)</strong>
            <Input name="weight" />
          </div>
          <div>
            <strong>ALTURA (m)</strong>
            <Input name="height" />
          </div>
        </StudentForm>
      </Content>
    </Container>
  );
}
