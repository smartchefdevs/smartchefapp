import React from 'react';
import styled from 'styled-components';
// components
import { Colors } from 'smartchef/src/styles/Colors';
import Label from 'smartchef/src/components/Label';

const TagComponent = styled.View`
  display: flex;
  justify-content: center;
  border: 1px solid #ffbb96;
  background: ${props => props.background || "#fff2e8"} ;
  border-color: ${props => props.borderColor || "#ffbb96"};
  padding: 3px 6px;
  border-radius: 5px;
`;
const Tag = ({ title, labelprops }) => {
  const selector = title ? title.replace(/ /g, "") : 'others';
  const styles = styleCategory[selector];
  return (
    <TagComponent {...styles}>
      <Label color={styles.color || '#fa541c'} {...labelprops}>
        {title || 'others'}
      </Label>
    </TagComponent>
  );
};

export default Tag;
