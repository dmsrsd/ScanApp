import {useEffect, useCallback} from 'react';
import {BackHandler, Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native'; // Perbaiki di sini

const useDisableBackButton = message => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        console.log(message);
        return true; // Menandakan bahwa kita menangani back button
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [message]),
  );
};

export default useDisableBackButton;
