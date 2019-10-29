import React from 'react';
import styled from 'styled-components'
import posed from 'react-native-pose'
import {
  Animated,
} from 'react-native'

import { Colors } from 'smartchef/src/styles/Colors'

const slowTween = ({ value, toValue }) => Animated.timing(value, {
  toValue,
  duration: 100,
  useNativeDriver: true
})

const TabsContainer = posed(styled.View`
  height: ${props => props.height || 50}px;
  width: 100%;
  background-color: ${props => props.bgColor || 'white'};
  display: flex;
  flex-direction: row;
  z-index: 9;
  border-bottom-color: ${Colors.lightgray};
  border-bottom-width: 1px;
`)({
  visible: {
    y: 0,
    opacity: 1,
    transition: slowTween
  },
  hidden: {
    y: -55,
    opacity: 0,
    transition: slowTween
  },
  hiddenA: {
    y: -42,
    opacity: 0,
    transition: slowTween
  }
})

export {
  TabsContainer
}
