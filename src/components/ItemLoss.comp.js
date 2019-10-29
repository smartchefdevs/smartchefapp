import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components';
// components
import { Colors } from 'smartchef/src/styles/Colors';
import Label from 'smartchef/src/components/Label';
import Tag from 'smartchef/src/components/Tag.comp'

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding-vertical: 12px;
  background: ${Colors.white};
`;

const HeaderContainer = styled.View`
  display: flex;
  padding: 3px 9px 15px 9px;
`;

const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImgContainer = styled.View`
  position: relative
  display: flex;
  flex: 1;
  min-height: 300px;
  background-color: ${Colors.orange};
`;
const LoadingImg = styled.View`
  position: absolute;
  top: 50%;
  left 40%;
`;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: Colors.lightgray
  }
});

const ItemLoss = ({ img_url, category, description, user }) => {
  const [loadImg, setLoadImg] = useState(false);
  return (
    <Container>
      <HeaderContainer>
        <FlexRow>
          <Label weight={600} color={Colors.dark}>
            Category:
          </Label>
          <Tag title={category} />
        </FlexRow>
      </HeaderContainer>
      <ImgContainer>
        {loadImg && (
          <LoadingImg>
            <Label>{'Loading...'}</Label>
          </LoadingImg>
        )}
        <Image
          style={styles.img}
          source={{ uri: img_url }}
          resizeMethod="scale"
          onLoadStart={() => setLoadImg(true)}
          onLoadEnd={e => {
            setLoadImg(false);
          }}
          onError={({ nativeEvent: { error } }) => setLoadImg(false)}
        />
      </ImgContainer>
      <Label>{description}</Label>
    </Container>
  );
};

export default ItemLoss;
