import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Menu, MenuBar, Content, StudentForm } from './styles';

export default function StudentDetails({ ...props }) {
  const [studentId] = useState(props.match.params.id);
  const [edit, setEdit] = useState(true);
  const [initialData, setInitialData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
  });

  useEffect(() => {
    if (!studentId) {
      setEdit(false);
      return console.log('Sem student ID');
    }
    console.log('Com student ID');

    async function loadStudent() {
      const { data } = await api.get(`students/${studentId}`);
      setInitialData(data);
    }

    loadStudent();
  }, [studentId]);

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
    if (edit === true) {
      console.log('Editando');
      const response = await api.put(`students/${studentId}`, data);
      console.log(JSON.stringify(response.data));
      return history.goBack();
    }

    console.log('Criando novo');
    const response = await api.post('students/', data);
    console.log(JSON.stringify(response.data));
    history.goBack();
  }

  return (
    <Container>
      <Menu>
        <strong>
          {edit === true ? 'Edição de Aluno' : 'Cadastro de Aluno'}
        </strong>
        <MenuBar>
          <button
            className="btnBack"
            type="button"
            onClick={() => history.goBack()}
          >
            <MdChevronLeft size={24} />
            VOLTAR
          </button>
          <button type="submit" form="studentForm">
            <MdCheck size={24} />
            SALVAR
          </button>
        </MenuBar>
      </Menu>
      <Content>
        <StudentForm
          schema={schema}
          id="studentForm"
          onSubmit={handleSubmit}
          initialData={initialData}
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
