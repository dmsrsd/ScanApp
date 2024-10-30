import React from 'react';
import {
  StyleSheet,
  Animated,
  ScrollView,
  Text,
  SafeAreaView,
} from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

const MyComponent = ({
  visible,
  animateFrom,
  style,
}) => {
  const [isExtended, setIsExtended] = React.useState(true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent.contentOffset.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        {[...new Array(100).keys()].map((_, i) => (
          <Text key={i}>{i}</Text>
        ))}
      </ScrollView>
      <AnimatedFAB
        icon="plus"
        label="Label"
        extended={isExtended}
        onPress={() => console.log('Pressed')}
        visible={visible}
        animateFrom={animateFrom}
        style={[styles.fabStyle, style]}
      />
    </SafeAreaView>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
