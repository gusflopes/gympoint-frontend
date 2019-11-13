import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content, Table } from '~/styles/global';
import ReactModal from '~/components/Modal';
import { Wrapper } from './styles';

import api from '~/services/api';

import MenuBar from '~/components/MenuBar';

export default function HelpOrders() {
  const [helporders, setHelporders] = useState([]);

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
    api.post(`help-orders/${data.id}/answer`, data);

    // Refatorar isso - fechando o Modal aqui
    document.getElementById('AnswerForm').submit();
  }

  function closeModal() {
    console.log('teste');
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
                  <ReactModal
                    title="responder"
                    button="Responder Aluno"
                    onLoad={modalLoad}
                    propsFoda={() => closeModal()}
                  >
                    <Wrapper>
                      <Form id="AnswerForm" onSubmit={handleSubmit}>
                        <strong>PERGUNTA DO ALUNO</strong>
                        <p>{helporder.question}</p>
                        <strong> SUA RESPOSTA</strong>
                        <Input type="hidden" name="id" value={helporder.id} />
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
