import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-paper-dropdown';
import {TextInput} from 'react-native-paper';

const OPTIONS = [
  {label: 'WINGBOX', value: 'WINGBOX'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

const Transportation = () => {
  // const item = useSelector(state => state.orderList.item);

  // const {id, title, body} = item;

  // useEffect(() => {
  //   console.log('item', item);
  // }, [item]);

  const [gender, setGender] = useState();
  const [text, setText] = useState('');

  return (
    <View>
      {/* <Text style={{color: 'red'}}>Id : {id}</Text>
      <Text style={{color: 'red'}}>Title : {title}</Text>
      <Text style={{color: 'red'}}>Body : {body}</Text> */}
      <View style={{paddingVertical: 5}}>
        <Dropdown
          label="Vehicle Type"
          placeholder="Select Type"
          options={OPTIONS}
          value={gender}
          onSelect={setGender}
          menuContentStyle={{backgroundColor: 'grey'}}
        />
      </View>

      <TextInput
        label="Vehicle No"
        value={text}
        onChangeText={text => setText(text)}
      />

      <TextInput
        label="Driver Name"
        value={text}
        onChangeText={text => setText(text)}
      />

      <TextInput
        label="Seal No"
        value={text}
        onChangeText={text => setText(text)}
      />

    </View>
  );
};

export default Transportation;
