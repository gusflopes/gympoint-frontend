import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 45px;
  border-radius: 4px;
  border: 0;
  font-weight: bold;
  background-color: #ee4d64;
  color: #fff;
  border: 1px solid #dddddd;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${darken(0.03, '#ee4d64')};
  }
`;
