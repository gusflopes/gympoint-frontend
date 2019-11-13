import React, { useState, useEffect } from 'react';

import { Form, Input } from '@rocketseat/unform';
import ReactModal from 'react-modal';
import MenuBar from '~/components/MenuBar';

import { Container, Content, Table } from '~/styles/global';
import { Wrapper } from './styles';

import api from '~/services/api';

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
  const [activeForm, setActiveForm] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('help-orders');

      setHelporders(response.data);
    }

    loadData();
  }, []);

  async function handleSubmit(data) {
    // Handle with the API
    console.log(`Data: ${JSON.stringify(data)}`);
    console.log(`Active Form: ${activeForm}`);

    const response = await api.post(`help-orders/${activeForm}/answer`, data);
    const { id } = response.data;
    console.log(`Id: ${id} e JSON: ${JSON.stringify(response.data)}`);
    // Handle with React
    setHelporders(helporders.filter(helporder => helporder.id !== id));
    // Close Modal
    setShowModal(false);
  }

  /** *
   * BUG - ESTÁ ABRINDO MODAL COM A HELPORDER ERRADA !!
   */

  function botaoClicado(e) {
    const { id } = e.target;
    setActiveForm(id);
    console.log(`Active Form: ${id}`);
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
                    type="button"
                    style={{ color: '#4d85ee' }}
                    id={helporder.id}
                    onClick={e => {
                      botaoClicado(e);
                      setShowModal(true);
                    }}
                  >
                    editar
                  </button>

                  <ReactModal
                    onAfterOpen={() => {}}
                    isOpen={showModal}
                    style={customStyles}
                    onRequestClose={() => {}}
                    ariaHideApp={false}
                  >
                    <Wrapper>
                      <Form onSubmit={handleSubmit}>
                        <strong>PERGUNTA DO ALUNO</strong>
                        <p>{helporder.question}</p>
                        <strong> SUA RESPOSTA</strong>
                        <Input
                          id={helporder.id}
                          multiline
                          name="answer"
                          placeholder="Digite sua resposta."
                        />

                        <button type="submit">Responder Aluno</button>
                      </Form>
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
