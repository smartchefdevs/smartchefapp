import React from 'react';
import { createForm } from 'rc-form';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome';
/** styles */
import { Colors } from 'amissa/src/styles/Colors'
import FONTS from 'amissa/src/styles/Fonts';
/** components */
import { FormItem } from 'amissa/src/components/form/FormItem'
import ButtonRound from 'amissa/src/components/Button.comp'
import Label from 'amissa/src/components/Label'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  errorView: {
    marginBottom: 17
  },
  erroMesage: {
    color: Colors.red,
    fontFamily: FONTS[500]
  },
  input: {
    color: Colors.white
  },
  buttonView: {
    width: '100%'
  }
});

const ActionContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

class Form extends React.Component {
  _submit = () => {
    const { onSubmit, form } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        onSubmit(values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldError }
    } = this.props;
    const { errorMessage } = this.props;
    return (
      <View style={styles.container}>
        {getFieldDecorator('email', {
          validateFirst: true,
          rules: [
            { required: true, message: 'Email es requerido' },
            { type: 'email', message: 'Ingresa un Email valido!' }
          ]
        })(
          <FormItem
            placeholder="Email"
            error={getFieldError('email')}
            textContentType="emailAddress"
            keyboardType="email-address"
            stylesInput={styles.input}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={() => this.submit()}
          />
        )}
        {getFieldDecorator('password', {
          validateFirst: false,
          rules: [
            { type: 'string', required: true, message: 'Password es requerido' }
          ]
        })(
          <FormItem
            placeholder="Password"
            error={getFieldError('password')}
            secureTextEntry
            textContentType="password"
            stylesInput={styles.input}
            returnKeyType="done"
            onSubmitEditing={() => this.submit()}
          />
        )}
        <View style={styles.errorView}>
          <Text style={styles.erroMesage}>{errorMessage}</Text>
        </View>
        <ActionContainer>
          <Label weight={700} size={'38px'} lineHeight={38} color={Colors.white}>
            Log in
          </Label>
          <ButtonRound
            onPress={this._submit}
            round={32}
            height={64}
            width={64}
            BgColor={Colors.white}
            underlayColor={Colors.white}
          >
            <Icon name="arrow-right" size={28} color="#000000" />
          </ButtonRound>
        </ActionContainer>
      </View>
    );
  }
}

export default createForm()(Form);
