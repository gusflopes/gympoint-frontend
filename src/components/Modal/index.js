import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

// import { Button } from './styles';

const customStyles = {
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '450px',
    transform: 'translate(-50%, -10%)',
  },
};

export default function Modal(props) {
  const { title, button, children, onLoad } = props;
  const [showModal, setShowModal] = useState(false);

  function callbackModal() {
    setShowModal(false);
  }

  useEffect(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <button
        type="button"
        style={{ color: '#4d85ee' }}
        onClick={() => setShowModal(true)}
      >
        {title}
      </button>

      <ReactModal
        onAfterOpen={onLoad}
        isOpen={showModal}
        style={customStyles}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}
      >
        {children}
      </ReactModal>
    </>
  );
}

Modal.defaultProps = {
  onLoad: null,
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onLoad: PropTypes.func,
};
