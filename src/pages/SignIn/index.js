import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Wrapper, Content } from './styles';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  function handleSubmit(email, password) {
    console.log(`Email: ${email} e Password: ${password}`);
  }

  return (
    <Wrapper>
      <Content>
        <img src={logo} alt="GymPoint" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="email" placeholder="Seu e-mail" />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />

          <button type="submit">Acessar</button>
        </Form>
      </Content>
    </Wrapper>
  );
}
