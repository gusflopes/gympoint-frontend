import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import { Wrapper } from './styles';

export default function FormComponent() {
  const solicitation = useSelector(state => state.solicitation);

  const [input, setInput] = useState();
  const [question, setQuestion] = useState();
  const [student, setStudent] = useState();
  const [active, setActive] = useState();

  useEffect(() => {
    function initialData() {
      if (!solicitation) {
        history.push('/help-orders');
        return;
      }
      c;
      const { question, student } = solicitation[0];
      console.log(student);
      console.log(question);
      // console.log(`solicitation: ${JSON.stringify(solicitation)}`);
      setQuestion(question);
      // setStudent(name);
      setActive(solicitation);
    }
    initialData();
  }, [solicitation]);
  // function inputHandler() {}

  async function handleSubmit(event) {
    event.preventDefault();
    const { id, question } = solicitation;

    console.log(`Question: ${question}`);
    console.log(`Form submit ref. Id: ${id}, com resposta: ${input}.`);

    // const response = await api.post(`/help-order/${id}/answer`, input);
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <strong>PERGUNTA DO ALUNO:</strong>
        <p>{question || 'Aguardando.'}</p>
        <strong> SUA RESPOSTA</strong>
        <textarea
          onChange={e => setInput(e.target.value)}
          value={input}
          name="answer"
          type="text"
          placeholder="Digite sua resposta."
        />

        <button type="submit" onClick={e => handleSubmit(e)}>
          Responder Aluno
        </button>
      </form>
    </Wrapper>
  );
}

/*
FormComponent.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
};
*/
