import React from 'react';
import { useDispatch } from 'react-redux';

import { Container, Content, Profile, NavItem } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-header.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="GymPoint" />
        <nav>
          <NavItem to="/students">ALUNOS</NavItem>
          <NavItem to="/plans">PLANOS</NavItem>
          <NavItem to="/enrollments">MATRÍCULAS</NavItem>
          <NavItem to="/help-orders">PEDIDOS DE AUXÍLIO</NavItem>
        </nav>
      </Content>

      <Profile>
        <strong>Gustavo Ferreira Lopes</strong>
        <span onClick={handleSignOut}>Sair do Sistema</span>
      </Profile>
    </Container>
  );
}
