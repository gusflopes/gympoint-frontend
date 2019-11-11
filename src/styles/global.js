import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import colors from './colors';

// import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
    background: #dcdcdc;
  }
  body, input, button {
    font:  14px 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  background: #fff;
  border-radius: 4px;
`;

export const Table = styled.table`
  flex: 1;
  display: table;
  border-collapse: separate;

  thead th {
    text-align: left;
    color: #444;
    font-weight: bold;
    font-size: 16px;
    padding: 20px 10px;
    border-bottom: 1px solid #eee;

    &:nth-child(n + 2) {
      text-align: center;
    }
  }

  tbody td {
    padding: 20px 10px;
    font-size: 16px;
    color: #666;
    border-bottom: 1px solid #eee;

    &:nth-child(n + 2) {
      text-align: center;
    }

    &:nth-child(4) {
    }

    button {
      margin: 0 10px;
      border: 0;
      background-color: #fff;
    }

    .edit {
      color: ${colors.btnPrimary};
    }
    .delete {
      color: ${colors.btnSecondary};
    }
  }
`;
