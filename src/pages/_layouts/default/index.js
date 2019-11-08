import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Page } from './styles';
import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Page>{children}</Page>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
