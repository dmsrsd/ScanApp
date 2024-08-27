import React, {useState} from 'react';
import {NavigationActions} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

export default LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    if (username === 'admin' && password === '12345') {
      console.log('Login successful!');
      navigation.navigate('TabNavigator', {screen: 'Home'});
    } else {
      setError('Invalid username or password');
    }
  };

  showAlert = viewId => Alert.alert('Alert', 'Button pressed ' + viewId);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{
            uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png',
          }}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          placeholderTextColor="#666"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{uri: 'https://img.icons8.com/ios-glyphs/512/key.png'}}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          placeholderTextColor="#666"
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => handleLogin()}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      {/* 
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => showAlert('forgot password')}>
        <Text>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={(onPress = {handleLogin})}>
        <Text>Sign up</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    color: '#000',
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});
