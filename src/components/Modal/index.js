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
  const { children, onLoad } = props;
  const [showModal, setShowModal] = useState(true);

  /*
  useEffect(() => {
    setShowModal(false);
  }, []);
  */

  return (
    <>
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
  children: PropTypes.element.isRequired,
  onLoad: PropTypes.func,
};
