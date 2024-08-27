import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TextInput, Divider, Icon, MD3Colors, Button} from 'react-native-paper';

const OppKeeperScreen = () => {
  const [poNumber, setPOnumber] = useState('12345');
  const [lotNumber, setLotNumber] = useState('56789');

  const [isFocused, setIsFocused] = useState(false);

  const theme = {
    colors: {
      text: 'black',
      primary: '#000',
    },
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    setPOnumber('');
    setLotNumber('');
  };

  const openScanner = () => {
    console.log('opened');
  };

  // ADD NEW BAG NUMBER TEXTINPUT
  const [bagNumber, setBagNum] = useState('202020');
  const [bagWeight, setBagWeight] = useState('50');
  const [subBagNumbers, setSubBagNumbers] = useState([]);
  const [subBagWeights, setSubBagWeights] = useState([]);

  const newBagNum = () => {
    setSubBagNumbers([...subBagNumbers, '']);
    setSubBagWeights([...subBagWeights, '']);
  };

  const deleteSubBagNum = index => {
    setSubBagNumbers(subBagNumbers.filter((_, i) => i !== index));
    setSubBagWeights(subBagWeights.filter((_, i) => i !== index));
  };

  const updateSubBagNum = (index, value) => {
    setSubBagNumbers(
      subBagNumbers.map((num, i) => (i === index ? value : num)),
    );
  };

  const updateSubBagWeight = (index, value) => {
    setSubBagWeights(
      subBagWeights.map((weight, i) => (i === index ? value : weight)),
    );
  };
  // END of ADD NEW TEXTINPUT

  //   POST DATA INTO API
  const postData = async () => {
    const data = {
      DataBagNumber: [
        {
          BagNumber: bagNumber,
          BagWeight: bagWeight,
        },
        ...subBagNumbers.map((num, index) => ({
          BagNumber: num,
          BagWeight: subBagWeights[index],
        })),
      ],
    };

    console.log('data', data);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                PO Number
              </Text>
            }
            value={poNumber}
            onChangeText={text => setPOnumber(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.textInp}
            editable={false}
          />

          {/* <View style={styles.clearText}>
            <TouchableOpacity onPress={handleClear}>
              <Icon source="close" color={MD3Colors.error50} size={20} />
            </TouchableOpacity>
          </View> */}
        </View>

        <Divider />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                LOT Number
              </Text>
            }
            value={lotNumber}
            onChangeText={text => setLotNumber(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.textInp}
            editable={false}
          />

          {/* <View style={styles.clearText}>
            <TouchableOpacity onPress={handleClear}>
              <Icon source="close" color={MD3Colors.error50} size={20} />
            </TouchableOpacity>
          </View> */}
        </View>

        <Divider />

        {/* MAIN BAG NUMBER */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                Bag Number
              </Text>
            }
            value={bagNumber}
            onChangeText={text => setBagNum(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.textInpBag}
          />

          <TouchableOpacity onPress={openScanner} style={styles.btnScan}>
            <Icon source="barcode" color={MD3Colors.primary0} size={20} />
          </TouchableOpacity>

          {/* <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                Bag Weight
              </Text>
            }
            value={bagWeight}
            onChangeText={text => setBagWeight(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.textInpBagWeight}
            keyboardType="numeric"
          /> */}

          <TouchableOpacity onPress={newBagNum} style={styles.addScan}>
            <Icon source="plus" color={MD3Colors.primary100} size={20} />
          </TouchableOpacity>
        </View>

        <Divider />

        {/* BAG Weight */}
        <View style={{flexDirection: 'row', alignItems: 'center', left: 30}}>
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                Bag Weight
              </Text>
            }
            value={bagWeight}
            onChangeText={text => setBagWeight(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.textInpBagWeight}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.clrBagWeight}>
            <Icon
              source="close"
              color={MD3Colors.error60}
              size={20}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>

        {/* SUB BAG NUMBERS */}
        {subBagNumbers.map((num, index) => (
          <View key={index}>
            <Divider />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                theme={theme}
                label={
                  <Text style={{color: isFocused ? 'grey' : 'black'}}>
                    Bag Number
                  </Text>
                }
                value={num}
                onChangeText={text => updateSubBagNum(index, text)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                textColor="black"
                style={styles.textInpBag}
              />

              <TouchableOpacity style={styles.btnScan} onPress={openScanner}>
                <Icon source="barcode" color={MD3Colors.primary0} size={20} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.delTxtBagNum}
                onPress={() => deleteSubBagNum(index)}>
                <Icon source="delete" color={MD3Colors.primary100} size={20} />
              </TouchableOpacity>
            </View>

            <Divider />

            {/* Sub BAG Weight */}
            <View
              style={{flexDirection: 'row', alignItems: 'center', left: 30}}>
              <TextInput
                theme={theme}
                label={
                  <Text style={{color: isFocused ? 'grey' : 'black'}}>
                    Bag Weight
                  </Text>
                }
                value={subBagWeights[index]}
                onChangeText={text => updateSubBagWeight(index, text)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                textColor="black"
                style={styles.textInpBagWeight}
                keyboardType="numeric"
              />

              <View style={styles.clearText}>
                <TouchableOpacity>
                  <Icon source="close" color={MD3Colors.error50} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Button
            style={{width: 170}}
            mode="contained"
            buttonColor="red"
            textColor="white"
            onPress={() => console.log('Pressed')}>
            Clear
          </Button>

          <Button
            style={{width: 170}}
            mode="contained"
            buttonColor="green"
            textColor="white"
            onPress={() => postData()}>
            Save
          </Button>
        </View>

        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OppKeeperScreen;

const styles = StyleSheet.create({
  textInp: {
    backgroundColor: '#FBF9F1',
    width: 370,
  },
  textInpBag: {
    backgroundColor: '#FBF9F1',
    width: 250,
  },
  textInpBagWeight: {
    backgroundColor: '#FBF9F1',
    width: 250,
    height: 60,
    borderColor: 'gray',
    margin: 5,
  },
  clearText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF9F1',
    height: 60,
  },
  clrBagWeight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF9F1',
    height: 60,
  },
  btnScan: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: 70,
  },
  addScan: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    height: 70,
  },
  delTxtBagNum: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 70,
  },
});
