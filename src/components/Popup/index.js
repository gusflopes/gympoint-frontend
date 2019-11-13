import React from 'react';
import PropTypes from 'prop-types';

import { Container, Box } from './styles';

export default function Popup(props) {
  const { title } = props;
  return (
    <Container>
      <Box>
        <h1>{title}</h1>
        <div>
          <button type="button" onClick={() => props.handleYes()}>
            Sim
          </button>
          <button type="button" onClick={() => props.handleNo()}>
            Não
          </button>
        </div>
      </Box>
    </Container>
  );
}

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  handleYes: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired,
};
