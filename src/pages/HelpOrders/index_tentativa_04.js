import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content, Table } from '~/styles/global';
import ReactModal from '~/components/Modal';
import { Wrapper } from './styles';

import api from '~/services/api';

import MenuBar from '~/components/MenuBar';

export default function HelpOrders() {
  const [helporders, setHelporders] = useState([]);
  const [activeForm, setActiveForm] = useState();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('help-orders');

      setHelporders(response.data);
    }

    loadData();
  }, []);

  function modalLoad() {
    // Função sendo chamada quando o Modal carrega
    console.log('Modal carregado');
  }

  function handleSubmit(data) {
    console.log(data);
    // api.post(`help-orders/${data.id}/answer`, data);

    // Refatorar isso - fechando o Modal aqui
    document.getElementById('AnswerForm').submit();
  }

  function closeModal() {
    console.log('teste');
  }

  useEffect(() => {
    console.log('activeForm modificado');
    // console.log(`activeForm: ${JSON.stringify(activeForm)}`);
    if (activeForm) {
      const { question } = activeForm;
      console.log(`Question: ${activeForm.question}`);
    }
  }, [activeForm]);

  async function openModal(e) {
    const { id } = e.target;
    console.log(`Event_ID: ${id}`);
    // console.log(helporders[0].id);

    const filtered = helporders.filter(
      helporder => helporder.id === Number(id)
    );
    console.log(`Active Form: ${JSON.stringify(filtered)}`);
    setActiveForm(filtered);
    setModalShow(true);
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
                      type="button"
                      className="edit"
                      onClick={e => openModal(e)}
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
      {modalShow ? (
        <ReactModal onLoad={modalLoad}>
          <Wrapper>
            <Form id="AnswerForm" onSubmit={handleSubmit}>
              <strong>PERGUNTA DO ALUNO</strong>
              <p>{activeForm.question}</p>
              <strong> SUA RESPOSTA</strong>
              <Input
                multiline
                name="answer"
                placeholder="Digite sua resposta."
              />

              <button onClick={() => {}} type="submit">
                Responder Aluno
              </button>
            </Form>
          </Wrapper>
        </ReactModal>
      ) : (
        console.log('modalshow false')
      )}
    </>
  );
}
