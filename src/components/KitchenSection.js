import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import { Divider } from 'react-native-elements';
// components
import KitchenItem from './KitchenItem';
import StarRateWidget from './StarRateWidget';
import Label from 'smartchef/src/components/Label';

export default class KitchenSection extends Component {
  render() {
    const { kitchenTitle, kitchenDecription, reviewsNumber, openStatus, chefImage, distance, dishes, rate, isLast, navigation, eventId } = this.props;
    return (
      <Section isLast={isLast}>
        <Divider styleName='line' style={{ marginTop: 13, marginLeft: 16, marginRight: 16, width: 343 }} />
        <View style={styles.kitchenHeader}>
          <HeaderTextContainer>
            <Text style={styles.kitchenTitle}>{kitchenTitle}</Text>
            <View>
              <Label
                color="#4a4a4a"
                weight={700}
                size={'12px'}
                lineHeight={14}
                ellipsizeMode="tail"
                numberOfLines={2}
              >
                {kitchenDecription}
              </Label>
            </View>
            <View style={styles.kitchenStatusContainer}>
              <StarRateWidget rate={rate} />
              <Text style={{ fontSize: 12, color: '#9b9b9b', lineHeight: 16, marginLeft: 7 }}>{reviewsNumber}</Text>
              <Text style={{ fontSize: 12, color: '#8ac96b', lineHeight: 16, marginLeft: 13 }}>{openStatus}</Text>
            </View>
          </HeaderTextContainer>
          <Image
            style={styles.chefImage}
            source={{ uri: chefImage }}
          />
        </View>
        <ScrollView horizontal={true} style={{ marginTop: 10, marginLeft: 16 }}>
          {dishes && dishes.map((item, index) => <KitchenItem
            eventId={eventId}
            key={item.key}
            imgSrc={item.src}
            quantity={item.quantity}
            navigation={navigation}
            index={index}
            dish={item}
          />)}
        </ScrollView>
        <Text style={styles.distanceText}>{distance}</Text>
      </Section>
    )
  }
}

const Section = styled.View`
  margin-bottom: ${({ isLast }) => (isLast ? '40px' : '3px')};
  height: 193px;
`;
const HeaderTextContainer = styled.View`
  position: relative;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin-right: 6px;
`;
const styles = StyleSheet.create({
  kitchenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 9,
    marginLeft: 18,
    marginRight: 18,
  },
  kitchenTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a4a4a',
    lineHeight: 19,
  },
  kitchenStatusContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chefImage: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  distanceText: {
    fontSize: 12,
    color: '#e25f54',
    lineHeight: 16,
    position: 'absolute',
    top: 180,
    right: 18,
  },
});
