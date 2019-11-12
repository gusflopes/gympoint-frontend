import React, { useState } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import { Container } from './styles';

const customStyles = {
  content: {
    position: 'absolute',
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '40%',
    transform: 'translate(-50%, -10%)',
  },
};

export default function AnswerModal(props) {
  const [showModal, setShowModal] = useState(false);
  const { title } = props;

  function initialLoad() {
    console.log('Initial load');
  }

  return (
    <div>
      <button type="button" onClick={() => setShowModal(true)}>
        {title}
      </button>

      <ReactModal
        onAfterOpen={initialLoad}
        isOpen={showModal}
        contentLabel="Exemplo de Modal"
        style={customStyles}
        onRequestClose={() => setShowModal(false)}
      >
        <h1>Modal do Lego</h1>
        <div>
          <p>Description of the modal.</p>
        </div>
        <button type="button" onClick={() => setShowModal(false)}>
          Close Modal
        </button>
      </ReactModal>
    </div>
  );
}

AnswerModal.propTypes = {
  title: PropTypes.string.isRequired,
};
