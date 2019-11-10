import React from 'react';
import PropTypes from 'prop-types';

import { MdAdd } from 'react-icons/md';
import history from '~/services/history';

import { Menu, MenuBar } from './styles';

export default function SearchMenu(props) {
  const { route, title } = props;

  // <SearchMenu title="Alunos" route="students" />

  return (
    <Menu>
      <strong>Gerenciando {title}</strong>
      <MenuBar>
        <button type="button" onClick={() => history.push(`/${route}/details`)}>
          <MdAdd size={24} />
          CADASTRAR
        </button>
      </MenuBar>
    </Menu>
  );
}

SearchMenu.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
