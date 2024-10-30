import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import ChartComponent from '../Chart';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const defaultDataWith6Colors = [
  '#B0604D',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

function CarouselComponent() {
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1}}>
      <Carousel
        autoPlayInterval={2000}
        data={defaultDataWith6Colors}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={width}
        height={width}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ChartComponent />
          </View>
        )}
      />
    </View>
  );
}

export default CarouselComponent;
