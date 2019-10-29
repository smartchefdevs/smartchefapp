import styled from 'styled-components'
import posed from 'react-native-pose'
import { Animated } from 'react-native';

/* Colors */
import { Colors } from 'smartchef/src/styles/Colors'

const slowTween = ({ value, toValue }) => Animated.timing(value, {
  toValue,
  duration: 98,
  useNativeDriver: true
})

const IconsContainer = posed(styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  border-bottom-width: 1;
  border-bottom-color: ${Colors.light_gray};
  background-color: white;
  z-index: 100;
`)({
  original: {
    y: 0,
    transition: slowTween
  },
  compact: {
    y: -42,
    transition: slowTween
  }
})

export const ContainerIcon = styled.View`
  padding: 13px 16px;
`
export default IconsContainer;
