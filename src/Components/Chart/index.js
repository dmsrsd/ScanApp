import {PieChart} from 'react-native-gifted-charts';
import {View, Text} from 'react-native';

const ChartScreen = () => {
  const pieData = [
    {
      value: 70,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
    },
    {
      value: 30,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
      focused: true,
    },
  ];

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#006DFF')}
            <Text style={{color: 'white'}}>On Progress: 70%</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#3BE9DE')}
            <Text style={{color: 'white'}}>Completed: 30%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          margin: 5,
          padding: 25,
          borderRadius: 20,
          backgroundColor: '#232B5D',
          shadowColor: '#103f7d',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 5,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Dashboard
        </Text>
        <View style={{padding: 20, alignItems: 'center'}}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                    30%
                  </Text>
                  <Text style={{fontSize: 14, color: 'white'}}>Completed</Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};

export default ChartScreen;
