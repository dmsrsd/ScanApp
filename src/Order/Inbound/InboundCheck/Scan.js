import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Divider,
  Icon,
  MD3Colors,
  Button,
  Portal,
  Modal,
} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

const ScanScreen = () => {
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

  // ADD NEW BAG NUMBER TEXTINPUT
  const [bagNumber, setBagNum] = useState(['']);
  const [bagWeight, setBagWeight] = useState('');

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

  //POST DATA INTO API
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

    console.log('data postData', data);
  };

  // SCANNER MODAL
  const [ValScan, setValScan] = useState('tidak ada data');
  // const [isCameraActive, setIsCameraActive] = useState(true);

  const device = useCameraDevice('back');
  if (!device) {
    return <Text>Tidak Ada Kamera</Text>;
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    // codeTypes: ['ean-13', 'code-128'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value} codes!`);
      setValScan(codes[0].value);
      if (codes[0].value != '') {
        // setIsCameraActive(false);
        setBagNum(codes[0].value);
        hideModal();
      }
    },
  });

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 80};

  return (
    <SafeAreaView>
      <ScrollView>
        {/* <Divider /> */}

        {/* PALLET and STOCK TYPE */}
        <View style={{flexDirection: 'row', alignItems: 'center', top: 5}}>
          
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                PALLET NO
              </Text>
            }
            value="CG001"
            onChangeText={text => setLotNumber(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.txtInpSKU}
            editable={true}
          />

          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                STOCK TYPE
              </Text>
            }
            value="60"
            onChangeText={text => setLotNumber(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.txtInpQTY}
            editable={true}
          />
          <View style={styles.clrTxtQTY}>
            <TouchableOpacity>
              <Icon source="close" color={'transparent'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SKU and QTY */}
        <View style={{flexDirection: 'row', alignItems: 'center', top: 10}}>
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>SKU</Text>
            }
            value="CG001"
            onChangeText={text => setLotNumber(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.txtInpSKU}
            editable={true}
          />

          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>QTY</Text>
            }
            value="60"
            onChangeText={text => setLotNumber(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.txtInpQTY}
            editable={true}
          />
          <View style={styles.clrTxtQTY}>
            <TouchableOpacity onPress={handleClear}>
              <Icon source="close" color={MD3Colors.error50} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* MAIN BAG NUMBER */}
        <View style={{flexDirection: 'row', alignItems: 'center', top: 15}}>
          <TextInput
            theme={theme}
            label={
              <Text style={{color: isFocused ? 'grey' : 'black'}}>
                Bag Number
              </Text>
            }
            value={ValScan}
            onChangeText={text => setBagNum(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textColor="black"
            style={styles.textInpBag}
          />

          <TouchableOpacity onPress={showModal} style={styles.btnScan}>
            <Icon source="barcode" color={MD3Colors.primary0} size={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={newBagNum} style={styles.addScan}>
            <Icon source="plus" color={MD3Colors.primary100} size={20} />
          </TouchableOpacity>
        </View>

        {/* BAG Weight */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            left: 30,
            top: 15,
          }}>
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
                value={ValScan + 1}
                onChangeText={text => updateSubBagNum(index, text)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                textColor="black"
                style={styles.textInpBag}
                editable={false}
              />

              <TouchableOpacity style={styles.btnScan} onPress={showModal}>
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

        <Portal>
          <Modal visible={visible} contentContainerStyle={containerStyle}>
            <View style={styles.cameraContainer}>
              <Camera
                device={device}
                isActive={true}
                style={styles.camera}
                codeScanner={codeScanner}
              />
            </View>
          </Modal>
        </Portal>

        {/* <Text style={styles.textScan}>{ValScan}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScanScreen;

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

  //BETWEEN TEXTINPUT
  txtInpSKU: {
    backgroundColor: '#FBF9F1',
    flex: 1,
  },
  txtInpQTY: {
    backgroundColor: '#FBF9F1',
    flex: 1,
    marginLeft: 5,
  },
  clrTxtQTY: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF9F1',
    height: 60,
  },

  // SCANNER
  camera: {
    width: 400,
    height: 400,
    borderColor: 'black',
    borderWidth: 1,
  },
  textScan: {
    color: 'red',
    fontSize: 20,
  },
});
