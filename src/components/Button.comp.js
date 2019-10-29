import React from 'react';
import styled from 'styled-components'
import { Colors } from 'smartchef/src/styles/Colors'

import Label from 'smartchef/src/components/Label'

const StyledButton = styled.TouchableHighlight`
  height: ${props => props.height || 45}px;
  width: ${props => props.width || '45px'};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.BgColor || 'orange'};
  border-radius: ${props => props.round || 0}px;
`;

const ButtonOutLine = styled.TouchableHighlight`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-horizontal: 6px;
  padding-vertical: 9px;
  margin-bottom: 9px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${({ borderColor }) => borderColor || 'orange'};
`;

const CustomButton = ({
  colorBg,
  actionHandler,
  title,
  styleText,
  height,
  width
}) => {
  const stylesLabel = Object.assign(
    {
      weight: 500,
      color: Colors.white,
      size: '14px'
    },
    styleText
  );
  return (
    <StyledButton
      round={5}
      height={height}
      width={width}
      BgColor={colorBg}
      onPress={actionHandler}
      underlayColor={Colors.transparent}
    >
      <Label
        weight={stylesLabel.weight}
        color={stylesLabel.color}
        size={stylesLabel.size}
      >
        {title}
      </Label>
    </StyledButton>
  );
};

export { CustomButton, ButtonOutLine };
export default StyledButton;
