import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

import HomeHeader from '../Components/Header/HomeHeader';
import HomeDashboard from '../Components/Dashboard/HomeDashboard';

const Home = () => {
  const loginData = useSelector(state => state.loginData.item);

  return (
    <View style={{flex: 1, backgroundColor: '#FBFBFB'}}>
      <HomeHeader loginData={loginData} />
      <HomeDashboard loginData={loginData} />
    </View>
  );
};

export default Home;
