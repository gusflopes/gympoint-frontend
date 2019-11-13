import styled from 'styled-components';

export const Container = styled.div`
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

export const Box = styled.div`
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
