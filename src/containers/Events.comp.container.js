import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
// import { FontAwesome } from '@expo/vector-icons';
import KitchenSection from 'smartchef/src/components/KitchenSection';
// actions
import EventsActions from 'smartchef/src/services/events/events.reducers';

const ChefList = ({ events, getEvents, navigation }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);
  return (
    <Card style={{ width: '100%', marginTop: 10 }}>
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>NEARBY Events</Text>
        </View>
        <View style={styles.sortContainer}>
          {/* <FontAwesome name='sort-amount-desc' size={12} color='#4285f4' /> */}
          <Text style={styles.sortText}>DISTANCE</Text>
        </View>
        {events && events.map((event, index) => (
          <KitchenSection
            key={event.key}
            kitchenTitle={event.name}
            kitchenDecription={event.description}
            reviewsNumber={event.reviewsNumber}
            openStatus={event.openStatus}
            chefImage={event.chef.avatar}
            distance={event.distance}
            dishes={event.dishes}
            rate={event.rate}
            navigation={navigation}
            isLast={index === events.length - 1}
          />
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#4a4a4a',
    fontWeight: '500',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 16,
  },
  sortText: {
    fontSize: 14,
    color: '#4285f4',
    lineHeight: 19,
    marginLeft: 6,
  },
});

const mapStateToProps = state => ({
  events: state.events.get('events'),
});

const mapStateToDispatch = dispatch => ({
  getEvents: () => dispatch(EventsActions.getEvents()),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(ChefList);
