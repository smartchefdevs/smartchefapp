import React from 'react'
import styled from 'styled-components'
import Label from 'smartchef/src/components/Label';

/* Colors */
import { Colors } from 'smartchef/src/styles/Colors'

const TabComponent = styled.TouchableHighlight`
  height: 100%;
  flex:1;
  background-color: white;
  border-bottom-color: ${props => props.selected ? Colors.darkgray : Colors.gray};
  border-bottom-width: ${props => props.selected ? '2px' : '1px'};
  display: flex;
  justify-content: center;
  align-items: center;
`

const TabText = styled(Label)`
  color: ${props => props.selected ? Colors.darkgray : Colors.gray};
  font-size: 14px;
`

const TabAction = ({
  selected,
  action,
  title
}) => {
  return (
    <TabComponent
      underlayColor={Colors.transparent}
      selected={selected}
      onPress={action}
    >
      <TabText
        weight={600}
        selected={selected}
      >
        {title}
      </TabText>
    </TabComponent>
  )
}

export default TabAction;
