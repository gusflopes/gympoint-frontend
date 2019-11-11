import React, { useState, useEffect } from 'react';

import { Container, Content, Table } from '~/styles/global';

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
                    className="edit"
                    onClick={() => {
                      alert('botão clicado');
                    }}
                  >
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
