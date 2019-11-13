import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Form, Input } from '@rocketseat/unform';
import MenuBar from '~/components/MenuBar';

import { Container, Content, Table } from '~/styles/global';
import { Wrapper } from './styles';

import api from '~/services/api';

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  width: 400px;
  height: 200px;
  margin: auto;
  border-radius: 4px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    display: block;
    margin-top: 40px;
    margin-left: 50px;
    font-size: 24px;
  }
  div {
    width: 50%;
    height: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      width: 80px;
    }
  }
`;

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
    return;
    const response = await api.post(
      `help-orders/${activeForm.id}/answer`,
      data
    );
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

  useEffect(() => {
    console.log('Mudança no state de activeForm');
    console.log(activeForm);
  }, [activeForm]);

  async function openModal(e) {
    const { id } = e.target;
    console.log(`Event_ID: ${id}`);
    // console.log(helporders[0].id);

    setActiveForm(helporders.filter(helporder => helporder.id === Number(id)));

    console.log(`Active Form: ${id}`);
    setShowModal(true);
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
                      type="button"
                      style={{ color: '#4d85ee' }}
                      id={helporder.id}
                      onClick={e => {
                        openModal(e);
                      }}
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
        <>
          <Background>
            <Box>
              <h1>Título</h1>
              <div>
                <Wrapper>
                  {
                    // Fazer um filter usando o id do Active
                  }
                  <Form onSubmit={handleSubmit}>
                    <strong>PERGUNTA DO ALUNO</strong>
                    <p>{activeForm.question}</p>
                    <strong> SUA RESPOSTA</strong>
                    <Input
                      id={activeForm.id}
                      multiline
                      name="answer"
                      placeholder="Digite sua resposta."
                    />

                    <button type="submit">Responder Aluno</button>
                  </Form>
                </Wrapper>
              </div>
            </Box>
          </Background>
        </>
      ) : null}
    </>
  );
}
