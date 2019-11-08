import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';

import { Container, Menu, Content, SearchBar } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    async function getStudents() {
      const { data } = await api.get('students');
      console.log(data);

      setStudents(data);
    }
    getStudents();
  }, []);

  function handleEdit(e) {
    console.log(`Edit clicado: ${e}`);
  }

  function handleDelete(e) {
    console.log(`Delete clicado: ${e}`);
  }

  function handleSearchInput() {
    console.log(students);
  }

  return (
    <Container>
      <Menu>
        <strong>Gerenciando alunos</strong>
        <SearchBar>
          <button type="button">
            <MdAdd size={24} />
            CADASTRAR
          </button>
          <div>
            <MdSearch size={24} />
            <input type="text" placeholder="Buscar aluno" />
          </div>
        </SearchBar>
      </Menu>

      <Content>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th>BOTOES</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>gusflopes86@gmail.com</td>
                <td>33</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={e => handleEdit(e)}
                  >
                    editar
                  </button>
                  <button
                    className="delete"
                    type="button"
                    onClick={e => handleDelete(e)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
