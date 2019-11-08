import React from 'react';

import { Container, Logo, Profile, NavItem } from './styles';

import logo from '~/assets/logo-header.png';

export default function Header() {
  function handleSignOut() {
    console.log('Logout');
  }

  return (
    <Container>
      <Logo src={logo} />

      <nav>
        <NavItem to="students">ALUNOS</NavItem>
        <NavItem to="plans">PLANOS</NavItem>
        <NavItem to="enrollments">MATRÍCULAS</NavItem>
        <NavItem to="students">PEDIDOS DE AUXÍLIO</NavItem>
      </nav>

      <Profile>
        <strong>Gustavo Lopes</strong>
        <span onClick={handleSignOut}>Sair do Sistema</span>
      </Profile>
    </Container>
  );
}
