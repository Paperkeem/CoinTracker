import React from 'react';
import styled from 'styled-components';

export default function Coins() {
  return (
    <div>
      <StTitle>Coin</StTitle>
    </div>
  );
}

const StTitle = styled.h1`
  color: ${props => props.theme.accentColor};
`

