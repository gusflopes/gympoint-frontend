import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { solicitationDetails } from '~/store/modules/solicitation/actions';

import MenuBar from '~/components/MenuBar';

import { Container, Content, Table } from '~/styles/global';

import api from '~/services/api';

import FormComponent from './FormComponent';

export default function HelpOrders() {
  const [helporders, setHelporders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const activeForm = { id: 1, question: 'Pergunta do aluno', answer: null };

  const dispatch = useDispatch();

  // Load Help Orders
  useEffect(() => {
    async function loadData() {
      const response = await api.get('help-orders');

      setHelporders(response.data);
    }

    loadData();
  }, []);

  // Keep track of Modal Open/Close
  useEffect(() => {
    console.log(`Modal is ${showModal}`);
  }, [showModal]);

  // Toggle the Modal
  function handleModal(event) {
    const { id } = event.target;
    setShowModal(!showModal);
    const solicitation = helporders.find(
      helporder => helporder.id === Number(id)
    );
    dispatch(solicitationDetails(solicitation));
  }

  return (
    <>
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
                      id={helporder.id}
                      onClick={e => handleModal(e)}
                      type="button"
                      style={{ color: '#4d85ee' }}
                    >
                      editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>
      </Container>
      {showModal ? (
        <Container>
          <h1>Modal</h1>
          <button onClick={handleModal} type="button">
            Fechar
          </button>
          <FormComponent id={activeForm.id} question={activeForm.question} />
        </Container>
      ) : null}
    </>
  );
}
