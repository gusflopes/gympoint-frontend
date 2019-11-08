import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';

import { Container, Menu, Content, SearchBar } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getStudents() {
      const { data } = await api.get('students');
      console.log(data);

      setStudents(data);
    }
    getStudents();
  }, []);

  function handleEdit(id) {
    console.log(`Edit clicado - Student.id: ${id}`);
  }

  function handleDelete(id) {
    setStudents(students.filter(student => student.id !== id));

    // Falta deletar!

    console.log(`Delete clicado: ${id}`);
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
        <SearchBar>
          <button type="button" onClick={() => console.log('Cadastrar')}>
            <MdAdd size={24} />
            CADASTRAR
          </button>
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
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleEdit(student.id)}
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
        </table>
      </Content>
    </Container>
  );
}
