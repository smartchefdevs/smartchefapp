import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
// import { FontAwesome } from '@expo/vector-icons';
import KitchenSection from 'smartchef/src/components/KitchenSection';
// actions
import ChefsActions from 'smartchef/src/services/chefs/chefs.reducers';

const ChefList = ({ chefs, getChefs, navigation }) => {
  useEffect(() => {
    getChefs();
  }, [getChefs]);

  console.tron.log("chefRRR", chefs)
  return (
    <Card style={{ width: '100%', marginTop: 10 }}>
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>NEARBY Chefs</Text>
        </View>
        <View style={styles.sortContainer}>
          {/* <FontAwesome name='sort-amount-desc' size={12} color='#4285f4' /> */}
          <Text style={styles.sortText}>DISTANCE</Text>
        </View>
        {chefs.map((chef, index) => (
          <KitchenSection
            key={chef.key}
            kitchenTitle={chef.full_name}
            kitchenDecription={chef.decription}
            reviewsNumber={chef.reviewsNumber}
            openStatus={chef.openStatus}
            chefImage={chef.chefImage}
            distance={chef.distance}
            dishes={chef.events[0].dishes || []}
            rate={chef.rate}
            navigation={navigation}
            isLast={index === chefs.length - 1}
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
  chefs: state.chefs.get('chefList')
});

const mapStateToDispatch = dispatch => ({
  getChefs: () => dispatch(ChefsActions.getChefs(2)),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(ChefList);
