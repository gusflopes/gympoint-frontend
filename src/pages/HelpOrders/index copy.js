import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';
import { Container, Content, Table } from '~/styles/global';
import { Wrapper } from './styles';

import api from '~/services/api';

import MenuBar from '~/components/MenuBar';

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

export default function HelpOrders() {
  const [helporders, setHelporders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('help-orders');

      setHelporders(response.data);
    }

    loadData();
  }, []);

  function modalLoad() {
    console.log('Initial load');
  }

  return (
    <Container>
      <MenuBar title="Pedidos de auxílio">
        <h1>Pedidos de auxílio</h1>
      </MenuBar>

      <Content>
        <Table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {helporders.map(helporder => (
              <tr key={helporder.id}>
                <td>{helporder.student.name}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    responder
                  </button>

                  <ReactModal
                    onAfterOpen={modalLoad}
                    isOpen={showModal}
                    style={customStyles}
                    aria-modal={false}
                    onRequestClose={() => setShowModal(false)}
                  >
                    <Wrapper>
                      <form>
                        <strong>PERGUNTA DO ALUNO</strong>
                        <p>
                          Olá pessoal, gostaria de saber se quando acordar devo
                          ingerir batata doce e frango logo de primeira,
                          preparar as marmitas e lotar a geladeira? Dou um pico
                          de insulina e jogo o hipercalórico?
                        </p>
                        <strong> SUA RESPOSTA</strong>

                        <textarea id="answer">exemplo@email.com</textarea>

                        <button type="submit" onClick={() => alert('Teste')}>
                          Responder Aluno
                        </button>
                      </form>
                    </Wrapper>
                  </ReactModal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
ReactModal.setAppElement('#root');
