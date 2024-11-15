import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const HomeHeader = ({loginData}) => {
  return (
    <>
      <View style={styles.roundedBox}>
        <Image
          source={require('../../Assets/img/bg-3.jpg')}
          style={styles.imgBox}
        />
      </View>

      <View style={styles.userIcon}></View>
      <Image
        source={require('../../Assets/img/logo-nti.png')}
        style={styles.image}
      />

      <View style={styles.title}>
        <Text style={styles.wlcmTxt}>Selamat datang,</Text>
        <Text style={styles.nameTxt} numberOfLines={1}>
          {loginData}
        </Text>
      </View>
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  roundedBox: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    top: 0,
    shadowColor: '#103f7d',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
  },
  imgBox: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userIcon: {
    backgroundColor: '#fffbef',
    width: 120,
    height: 120,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 3,
    top: 15,
    right: 260,
    opacity: 0.8,
  },
  image: {
    width: 100,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 3,
    right: 270,
    top: -30,
  },
  title: {
    position: 'absolute',
    top: 50,
    flex: 1,
    right: 45,
  },
  wlcmTxt: {
    color: '#fffbef',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameTxt: {
    color: '#fffbef',
    fontWeight: 'bold',
    fontSize: 20,
    width: 200,
  },
});
