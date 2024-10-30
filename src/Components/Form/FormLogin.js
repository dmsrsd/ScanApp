import React, {useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

const FormLogin = ({
  username,
  setUsername,
  password,
  setPassword,
  secureTextEntry,
  toggleSecureTextEntry,
}) => {
  // State untuk warna label
  const [labelColors, setLabelColors] = useState({
    username: '#000',
    password: '#000',
  });

  // Fungsi umum untuk fokus dan blur
  const handleFocus = field => {
    setLabelColors(prev => ({
      ...prev,
      [field]: '#0c4ca3',
    }));
  };

  const handleBlur = field => {
    setLabelColors(prev => ({
      ...prev,
      [field]: '#000',
    }));
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          left={
            <TextInput.Icon
              icon={'account'}
              onPress={toggleSecureTextEntry}
              size={30}
              color="black"
            />
          }
          theme={{colors: {text: 'black', primary: '#000'}}}
          label={<Text style={{color: labelColors.username}}>Username</Text>}
          value={username}
          onFocus={() => handleFocus('username')}
          onBlur={() => handleBlur('username')}
          textColor="black"
          style={styles.txtInput}
          editable={true}
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          left={
            <TextInput.Icon
              icon={'key'}
              onPress={toggleSecureTextEntry}
              size={30}
              color="black"
            />
          }
          theme={{colors: {text: 'black', primary: '#000'}}}
          label={<Text style={{color: labelColors.password}}>Password</Text>}
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
          textColor="black"
          style={styles.txtInput}
          editable={true}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              icon={secureTextEntry ? 'eye-off' : 'eye'}
              onPress={toggleSecureTextEntry}
              size={20}
              color="#0c4ca3"
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    bottom: 150,
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: 'rgba(223, 223, 222, 0.4)',
    width: 351,
  },
  txtInput: {
    backgroundColor: 'rgba(223, 223, 222, 0.0)',
    width: 350,
  },
  inputIcon: {
    width: 30,
    height: 30,
    margin: 10,
    justifyContent: 'center',
  },
});

export default FormLogin;
