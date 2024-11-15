import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import React, {useState, useEffect} from 'react';
import {TextInput, Icon, Portal, Modal, Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {baseURL} from '../../utils/url';

import {useSelector, useDispatch} from 'react-redux';
import {setItem} from '../../Redux/Reducers/OutstandingSlice';

import useDisableBackButton from '../../utils/useDisableBackButton';

export default function ScanItem({route, navigation}) {
  useDisableBackButton('Anda tidak dapat kembali dari halaman ini.');
  
  const param = route.params;
  const checkQtyScanValidity = param.param
  const dispatch = useDispatch();

  // REDUX DATA
  const itemVehicle = useSelector(state => state.vehicleData.itemVehicle);
  const itemOrderList = useSelector(state => state.orderList.item);
  const loginData = useSelector(state => state.loginData.item);


  // Destructuring itemVehicle
  const {vehicle_no, activity_id, transport_id} = itemVehicle || {};
  const {inbound_planning_no, checker} = itemOrderList || {};

  useEffect(() => {

    if (!itemVehicle) {
      setLoadingSKU(false);
    } else {
      fetchSKUs();
      // checkQtyScan();
    }
  }, [itemVehicle, itemOrderList]);

  // CAMERA FOR SCANNER AND INPUT
  const [activeCameraIndex, setActiveCameraIndex] = useState(null);
  const [activeBagIndex, setActiveBagIndex] = useState(null);

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
    setInputsSKUPallets(
      inputSKUPallets.map(input => ({
        ...input,
        bags: [{value: '', showCamera: false}],
      })),
    );

    setStockType('');
  };

  const device = useCameraDevice('back');
  if (!device) {
    return <Text>Tidak Ada Kamera</Text>;
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],

    onCodeScanned: codes => {
      if (activeCameraIndex !== null && activeBagIndex !== null) {
        const scannedValue = codes[0].value;
        console.log('Scanned value:', scannedValue);

        // Periksa duplikasi sebelum memperbarui
        const isDuplicate = inputSKUPallets.some(input =>
          input.bags.some(bag => bag.value === scannedValue),
        );

        if (isDuplicate) {
          Alert.alert(
            'Duplicate Barcode',
            'This barcode has already been scanned.',
            [{text: 'OK', onPress: handleCloseCamera}],
          );
        } else {
          const updatedInputs = [...inputSKUPallets];
          updatedInputs[activeCameraIndex].bags[activeBagIndex].value =
            scannedValue;
          updatedInputs[activeCameraIndex].bags[
            activeBagIndex
          ].showCamera = false;
          setInputsSKUPallets(updatedInputs);
          setActiveCameraIndex(null);
          setActiveBagIndex(null);
        }
      }
    },
  });

  const handleAddBag = index => {
    const updatedInputs = [...inputSKUPallets];
    updatedInputs[index].bags.push({value: '', showCamera: false});
    setInputsSKUPallets(updatedInputs);
  };

  const handleRemoveBag = (skuIndex, bagIndex) => {
    if (inputSKUPallets[skuIndex].bags.length > 1) {
      const updatedInputs = [...inputSKUPallets];
      updatedInputs[skuIndex].bags = updatedInputs[skuIndex].bags.filter(
        (_, i) => i !== bagIndex,
      );
      setInputsSKUPallets(updatedInputs);
    }
  };

  const handleInputChange = (skuIndex, bagIndex, text) => {
    // Debugging log
    console.log('Handling input change:', skuIndex, bagIndex, text);

    // Periksa duplikasi
    const isDuplicate = inputSKUPallets.some((input, i) =>
      input.bags.some(
        (bag, j) => bag.value === text && (i !== skuIndex || j !== bagIndex),
      ),
    );

    if (isDuplicate) {
      // Tampilkan alert jika duplikat ditemukan
      Alert.alert(
        'Duplicate Barcode',
        'This barcode has already been scanned.',
        [{text: 'OK', onPress: () => handleCloseAndReset(skuIndex, bagIndex)}],
      );
    } else {
      // Update nilai input jika tidak ada duplikasi
      const newInputs = [...inputSKUPallets];
      newInputs[skuIndex].bags[bagIndex].value = text;
      setInputsSKUPallets(newInputs);
    }
  };

  const handleCloseAndReset = (skuIndex, bagIndex) => {
    console.log('Closing and resetting:', skuIndex, bagIndex); // Debugging log
    const newInputs = [...inputSKUPallets];
    newInputs[skuIndex].bags[bagIndex].value = '';
    newInputs[skuIndex].bags[bagIndex].showCamera = false; // Tutup kamera
    setInputsSKUPallets(newInputs);
    setActiveCameraIndex(null); // Reset activeCameraIndex
    setActiveBagIndex(null); // Reset activeBagIndex
  };

  const handleOpenCamera = (skuIndex, bagIndex) => {
    const newInputs = [...inputSKUPallets];
    newInputs[skuIndex].bags[bagIndex].showCamera = true;
    setInputsSKUPallets(newInputs);
    setActiveCameraIndex(skuIndex);
    setActiveBagIndex(bagIndex);
  };

  const handleCloseCamera = () => {
    console.log('Closing camera'); // Debugging log
    if (activeCameraIndex !== null && activeBagIndex !== null) {
      const newInputs = [...inputSKUPallets];
      newInputs[activeCameraIndex].bags[activeBagIndex].showCamera = false;
      setInputsSKUPallets(newInputs);
      setActiveCameraIndex(null);
      setActiveBagIndex(null);
    }
  };
  // END OF SCANNER AND INPUT

  // DROPDOWN STOCK TYPE
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);
  const [selectedstockType, setStockType] = useState('');
  const [dataStockType, setDataStockType] = useState([]);
  useEffect(() => {
    const api = `${baseURL}/stock-type-scan`;

    fetch(api)
      .then(response => response.json())
      .then(data => {
        const dropdownData = data.map(stockType => ({
          label: stockType.stock_type,
          value: stockType.stock_id,
        }));
        setDataStockType(dropdownData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // GET SKU
  const [inputSKUPallets, setInputsSKUPallets] = useState([]);
  const [loadingSKU, setLoadingSKU] = useState(false);
  const fetchSKUs = async () => {
    const api = `${baseURL}/get-sku/${inbound_planning_no}`;

    setLoadingSKU(true);

    try {
      const response = await fetch(api);
      const data = await response.json();

      console.log('Res SKU', data);

      setLoadingSKU(false);

      // Memetakan SKU dan mengecek outstanding untuk setiap SKU
      const mappedInputs = await Promise.all(
        data.map(async (item, index) => {
          const sku = item.SKU;
          const outstandingApi = `${baseURL}/check-outstanding/${inbound_planning_no}/${sku}`;

          const outstandingResponse = await fetch(outstandingApi);
          const outstandingData = await outstandingResponse.json();

          return {
            id: (index + 1).toString(),
            sku: item.SKU,
            qty: item.qty,
            qty_outstanding: outstandingData.qty_outstanding,
            bags: [{value: '', showCamera: false, palletQty: ''}],
          };
        }),
      );

      // Menghitung total qty_outstanding
      const totalQtyOutstanding = mappedInputs.reduce((total, item) => {
        const qtyOutstandingNumber = parseFloat(item.qty_outstanding) || 0; // Mengonversi string ke angka
        return total + qtyOutstandingNumber; // Tambahkan ke total
      }, 0);

      // Dispatch totalQtyOutstanding ke Redux
      dispatch(setItem(totalQtyOutstanding));

      setInputsSKUPallets(mappedInputs);
    } catch (error) {
      console.error(error);
      setLoadingSKU(false);
    }
  };

  // PRE-SCAN PROCESS
  const prepareDataForPost = () => {
    const errorMessages = [];

    const data = inputSKUPallets.map(input => {
        const totalQtyScan = input.bags.reduce((sum, bag) => {
            const qtyScan = parseInt(bag.palletQty) || 0; // Menggunakan 0 jika parseInt gagal
            return sum + qtyScan;
        }, 0);

        // Validasi qty_scan terhadap qty_plan
        if (totalQtyScan > input.qty) {
            errorMessages.push(
                `SKU ${input.sku}: Total qty_scan (${totalQtyScan}) tidak boleh melebihi qty_plan (${input.qty})`
            );
        }

        // Memperbolehkan totalQtyScan 0, hanya memeriksa jika kurang dari 0 atau tidak valid
        if (totalQtyScan < 0) {
            errorMessages.push(`SKU ${input.sku}: Qty Scan tidak boleh kurang dari 0`);
        }

        // Memeriksa apakah qty_scan kosong
        if (input.bags.some(bag => bag.palletQty === "")) {
            errorMessages.push(`SKU ${input.sku}: Qty Scan tidak boleh kosong`);
        }

        return {
            sku: input.sku,
            qty_plan: input.qty,
            pallets: input.bags.map(bag => ({
                pallet_id: bag.value,
                qty_scan: bag.palletQty,
            })),
        };
    });

    // Jika ada pesan kesalahan, tampilkan alert dan kembalikan null
    if (errorMessages.length > 0) {
        Alert.alert('Error', errorMessages.join('\n'));
        return null;
    }

    return data;
};

  // PROSES SCAN
  const saveScan = async () => {
    const dataToSend = prepareDataForPost();
    
    const url = `${baseURL}/process-scan/${inbound_planning_no}/${activity_id}/${checker}`;

    // Check for mandatory fields
    const missingFields = [];

    if (!activity_id) missingFields.push('Activity ID');
    if (!transport_id) missingFields.push('Transport ID');
    if (!selectedstockType.value) missingFields.push('Stock Type');
    if (!dataToSend) missingFields.push('Pallet Number & Qty');

    if (missingFields.length > 0) {
      Alert.alert('Error', 'Missing fields: ' + missingFields.join(', '));
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      Cookie: 'XSRF-TOKEN=your_xsrf_token; wms_session=your_session_token',
    };

    const body = JSON.stringify({
      activity_id: activity_id,
      transport_id: transport_id,
      stock_id: selectedstockType.value,
      user_created: loginData,
      details: dataToSend,
    });

    if (dataToSend != null) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: body,
        });

        const result = await response.json(); // Parsing respons
        console.log('Response:', result); // Log respons untuk debug

        if (!response.ok) {
          // Jika respons tidak OK, lempar error dengan detail
          throw new Error(
            JSON.stringify(result.errors) || JSON.stringify(result.message),
          );
        } else {
          Alert.alert('Success', 'Data posted successfully!');
          navigation.navigate('InboundNavigator', {
            screen: 'OrderList',
          });
        }
      } catch (error) {
        // console.error('Error:', error.message); // Log pesan error
        Alert.alert('Error', 'Failed to post data. ' + error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 5}}>
      {loadingSKU ? (
        <View style={{top: 100}}>
          <ActivityIndicator size="large" color="#279EFF" />
        </View>
      ) : (
        <ScrollView>
          <View>
            {/* PALLET and STOCK TYPE */}

            <TextInput
              theme={theme}
              label={<Text style={{color: 'white'}}>Inbound Planning</Text>}
              value={inbound_planning_no}
              onFocus={handleFocus}
              onBlur={handleBlur}
              textColor="white"
              style={styles.txtInpPal}
              editable={false}
            />

            <TextInput
              theme={theme}
              label={<Text style={{color: 'white'}}>Vehicle No</Text>}
              value={vehicle_no}
              onFocus={handleFocus}
              onBlur={handleBlur}
              textColor="white"
              style={styles.txtInpPal}
              editable={false}
            />

            <View style={{paddingVertical: 5}}>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusDropdown && {borderColor: 'green'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={dataStockType}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Stock Type"
                searchPlaceholder="Search..."
                value={selectedstockType}
                onFocus={() => setIsFocusDropdown(true)}
                onBlur={() => setIsFocusDropdown(false)}
                onChange={item => {
                  setStockType(item);
                  setIsFocusDropdown(false);
                }}
                itemTextStyle={{color: 'black'}}
              />
              {!selectedstockType && (
                <Text style={{color: 'red'}}>Stock Type is required</Text>
              )}
            </View>

            {/* SKU AND PALLETS*/}
            {inputSKUPallets.map((input, skuIndex) => (
              <View key={input.sku} style={{marginBottom: 20}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', top: 10}}>
                  <TextInput
                    theme={theme}
                    label={<Text style={{color: 'white'}}>SKU</Text>}
                    value={input.sku}
                    textColor="white"
                    style={styles.txtInpSKU}
                    editable={false}
                  />

                  <TextInput
                    theme={theme}
                    label={<Text style={{color: 'white'}}>Qty Plan</Text>}
                    value={input.qty.toString()}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    textColor="white"
                    style={styles.txtInpQTY}
                    editable={false}
                  />

                  <TextInput
                    theme={theme}
                    label={<Text style={{color: 'white'}}>Outstanding</Text>}
                    value={input.qty_outstanding}
                    textColor="white"
                    style={styles.txtInpQTY}
                    editable={false}
                  />
                </View>

                {/* PALLET */}
                {input.bags.map((bag, bagIndex) => (
                  <View
                    key={bagIndex}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 15,
                    }}>
                    <View style={{flex: 1}}>
                      <TextInput
                        style={styles.inpBagNum}
                        value={bag.value}
                        onChangeText={text =>
                          handleInputChange(skuIndex, bagIndex, text)
                        }
                        theme={theme}
                        label={
                          <Text style={{color: isFocused ? 'grey' : 'black'}}>
                            Pallet Number
                          </Text>
                        }
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        textColor="black"
                        // editable={checkQtyScanValidity == false}
                      />
                    </View>

                    <TextInput
                      style={styles.inpBgWg}
                      value={bag.palletQty} // Bind to palletQty
                      theme={theme}
                      label={
                        <Text style={{color: isFocused ? 'grey' : 'black'}}>
                          Qty Scan
                        </Text>
                      }
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      textColor="black"
                      onChangeText={text => {
                        const newInputs = [...inputSKUPallets];
                        newInputs[skuIndex].bags[bagIndex].palletQty = text;
                        setInputsSKUPallets(newInputs);
                      }}
                      // editable={checkQtyScanValidity == false}
                    />

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => handleOpenCamera(skuIndex, bagIndex)}
                        style={{
                          backgroundColor: 'lightgrey',
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          right: 8,
                          borderRadius: 25,
                        }}>
                        <Icon source="barcode" color="green" size={30} />
                      </TouchableOpacity>

                      {bagIndex === 0 && (
                        <TouchableOpacity
                          onPress={() => handleAddBag(skuIndex)}
                          style={{
                            backgroundColor: 'lightgrey',
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 25,
                            right: 5,
                          }}>
                          <Icon source="plus" color="blue" size={30} />
                        </TouchableOpacity>
                      )}

                      {input.bags.length > 1 && bagIndex > 0 && (
                        <TouchableOpacity
                          onPress={() => handleRemoveBag(skuIndex, bagIndex)}
                          style={{
                            backgroundColor: 'lightgrey',
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 25,
                          }}>
                          <Icon source="minus" color="red" size={30} />
                        </TouchableOpacity>
                      )}
                    </View>

                    <Portal>
                      <Modal
                        visible={bag.showCamera}
                        onDismiss={handleCloseCamera}
                        contentContainerStyle={styles.cameraContainer}>
                        <View style={styles.cameraContainer}>
                          <Camera
                            device={device}
                            isActive={bag.showCamera}
                            style={[styles.camera, {alignSelf: 'center'}]}
                            codeScanner={codeScanner}
                          />
                        </View>
                      </Modal>
                    </Portal>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>

          {/* {checkQtyScanValidity == false ? ( */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                style={{width: 170, borderRadius: 10}}
                mode="contained"
                buttonColor="red"
                textColor="white"
                onPress={() => handleClear()}>
                Clear
              </Button>

              <Button
                style={{width: 170, borderRadius: 10}}
                mode="contained"
                buttonColor="green"
                textColor="white"
                onPress={() => saveScan()}>
                Save
              </Button>
            </View>
          {/* ) : (
            <>
              <Text style={{color: 'black'}}>Sudah Di Scan Semua</Text>
            </>
          )} */}

          <Text>{'\n'}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 500,
    height: 500,
    borderColor: 'black',
    borderWidth: 1,
  },
  cameraContainer: {
    backgroundColor: 'white',
    padding: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inpBagNum: {
    height: 40,
    width: 183,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'red',
    backgroundColor: '#FBF9F1',
  },
  inpBgWg: {
    height: 40,
    width: 95,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'red',
    backgroundColor: '#FBF9F1',
    right: 20,
  },
  txtInpPal: {
    backgroundColor: '#103f7d',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 2,
  },
  txtInpSKU: {
    backgroundColor: '#103f7d',
    borderColor: 'gray',
    borderWidth: 1,
    width: 183,
  },
  txtInpQTY: {
    backgroundColor: '#103f7d',
    // flex: 1,
    marginLeft: 5,
    borderColor: 'gray',
    borderWidth: 1,
    width: 90,
  },
  clrTxtQTY: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF9F1',
    height: 60,
  },

  // DROPDOWN
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
    borderRadius: 10,
  },
});
