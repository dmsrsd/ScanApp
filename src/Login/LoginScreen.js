import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import {setItem} from '../Redux/Reducers/LoginSlice';
import {useDispatch} from 'react-redux';
import FormLogin from '../Components/Form/FormLogin';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

export default LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    if (username !== '' && password !== '') {
      dispatch(setItem(username));

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('CombineNavigatorNew', {screen: 'Home'});
      } else {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to use this feature.',
        );
      }
    } else {
      setError('Invalid username or password');
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const toggleSecureTextEntry = () => setSecureTextEntry(!secureTextEntry);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <LottieView
        style={styles.lottieBackground}
        source={require('../Assets/lottie/wallpaper.json')}
        autoPlay
        loop
      />

      <View style={styles.containerImg}>
        <Image
          style={styles.img}
          source={require('../Assets/img/logo-nti.png')}
        />
      </View>

      <FormLogin
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        secureTextEntry={secureTextEntry}
        toggleSecureTextEntry={toggleSecureTextEntry}
        isFocused={isFocused}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
    width: '90%',
    borderRadius: 10,
    bottom: 140,
  },
  loginButton: {
    backgroundColor: '#0c4ca3',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerImg: {
    paddingBottom: 20,
  },
  img: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.5,
    resizeMode: 'contain',
  },
  lottieBackground: {
    position: 'absolute',
    width: Dimensions.get('window').width * 1.1,
    height: Dimensions.get('window').height * 1,
    transform: [{rotate: '180deg'}],
  },
});
