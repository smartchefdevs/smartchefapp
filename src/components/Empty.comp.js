import React from 'react';
import styled from 'styled-components';

/* Colors */
import { Colors } from 'smartchef/src/styles/Colors';
import FONTS from 'smartchef/src/styles/Fonts';

const EmptyView = styled.View`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${Colors.white}
`
const EmptyText = styled.Text`
  fontFamily: ${FONTS[500]};
  color: ${Colors.gray};
  fontSize: 18px
`

export const Empty = ({
  text = 'No hay resultados'
}) => (
    <EmptyView>
      <EmptyText>{text}</EmptyText>
    </EmptyView>
  )
