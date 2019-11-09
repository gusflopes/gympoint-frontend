import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Menu, MenuBar, SearchBar, Content, Table } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getStudents() {
      const { data } = await api.get('students');

      setStudents(data);
    }
    getStudents();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja deletar este aluno?') === true) {
      await api.delete(`students/${id}`);

      setStudents(students.filter(student => student.id !== id));
      return;
    }
    console.log('Delete cancelado');
  }

  function handleSearch(input) {
    setSearch(input);
    console.log(input);
  }

  async function handleKeyPress(key) {
    if (key === 'Enter') {
      const { data } = await api.get('students', {
        params: {
          name: search,
        },
      });
      setStudents(data);
    }
    // Handled by other function;
  }

  return (
    <Container>
      <Menu>
        <strong>Gerenciando alunos</strong>
        <MenuBar>
          <button
            type="button"
            onClick={() => history.push('/students/details')}
          >
            <MdAdd size={24} />
            CADASTRAR
          </button>
        </MenuBar>
        <SearchBar>
          <div>
            <MdSearch size={24} />
            <input
              type="text"
              value={search}
              onChange={e => handleSearch(e.target.value)}
              onKeyPress={e => handleKeyPress(e.key)}
              placeholder="Buscar aluno"
            />
          </div>
        </SearchBar>
      </Menu>

      <Content>
        <Table>
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
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() =>
                      history.push(`/students/details/${student.id}`)
                    }
                  >
                    editar
                  </button>
                  <button
                    className="delete"
                    type="button"
                    onClick={() => handleDelete(student.id)}
                  >
                    apagar
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
