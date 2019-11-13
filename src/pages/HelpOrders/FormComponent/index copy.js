import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import { Wrapper } from './styles';

import { solicitationAnswerRequest } from '~/store/modules/solicitation/actions';

export default function FormComponent() {
  const dispatch = useDispatch();
  const { solicitation } = useSelector(state => state.solicitation);

  const [input, setInput] = useState();
  const [activeId, setActiveId] = useState();
  const [activeQuestion, setActiveQuestion] = useState();
  const [activeStudent, setActiveStudent] = useState();

  useEffect(() => {
    function loadData() {
      const { id, question, student } = solicitation;
      console.log('Alteração no state do Redux');

      setActiveId(id);
      setActiveQuestion(question);
      setActiveStudent(student);
    }
    loadData();
  }, [solicitation]);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(`Question: ${activeQuestion}`);
    console.log(
      `Form submit ref. Id: ${activeId}, com resposta: ${input}, referente ao aluno: ${activeStudent.name}.`
    );

    dispatch(solicitationAnswerRequest(input));

    // const response = await api.post(`/help-order/${id}/answer`, input);
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <strong>PERGUNTA DO ALUNO:</strong>
        <p>{activeQuestion}</p>
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
