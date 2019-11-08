import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  max-height: 64px;
  background: #ffffff;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  border: solid 1px #ddd;

  nav {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
  }

  img {
    margin: 0 30px 0 30px;
    height: 24px;
    align-self: center;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const NavItem = styled(Link)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  text-align: center;
  align-items: center;
  justify-content: center;

  color: #999999;
  font-size: 15px;
  font-weight: bold;
  margin-right: 20px;
  transition: color 0.2s;

  &:first-child {
    margin-left: 30px;
  }

  &:hover {
    color: #444444;
    cursor: pointer;
  }
`;

export const Profile = styled.div`
  width: 200px;
  display: flex;
  justify-self: left;
  align-content: center;
  flex-direction: column;
  margin: 0 30px 0 30px;
  text-align: center;

  strong {
    font-weight: bold;
    color: #666;
  }

  span {
    color: #de3b3b;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
`;
