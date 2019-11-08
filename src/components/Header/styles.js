import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex: 1;
  background: #ffffff;
  height: 64px;
  align-items: center;
  margin: 0 auto;
  border: solid 1px #ddd;
`;

export const Logo = styled.img`
  margin: 0 30px 0 30px;
  color: #ee4d64;
  height: 24px;
`;

export const NavItem = styled(Link)`
  color: #999999;
  font-size: 15px;
  font-weight: bold;
  justify-content: space-between;
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
  display: flex;
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
