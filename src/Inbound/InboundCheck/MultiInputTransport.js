// import React from 'react';
// import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';

// const MultiInputTransport = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       address: '',
//     },
//   });

//   // Definisikan array untuk input
//   const inputFields = [
//     {
//       name: 'firstName',
//       label: 'First Name',
//       placeholder: 'Enter your first name',
//       rules: {required: true},
//     },
//     {
//       name: 'lastName',
//       label: 'Last Name',
//       placeholder: 'Enter your last name',
//       rules: {required: true},
//     },
//     {
//       name: 'email',
//       label: 'Email',
//       placeholder: 'Enter your email',
//       rules: {required: true, pattern: /^\S+@\S+$/i},
//     },
//     {
//       name: 'phone',
//       label: 'Phone',
//       placeholder: 'Enter your phone number',
//       rules: {required: true},
//     },
//     {
//       name: 'address',
//       label: 'Address',
//       placeholder: 'Enter your address',
//       rules: {required: true},
//     },
//   ];

//   const onSubmit = data => console.log(data);

//   return (
//     <View style={styles.container}>
//       <View style={styles.form}>
//         {inputFields.map((field, index) => (
//           <View key={index}>
//             <Text style={styles.label}>{field.label}</Text>
//             <Controller
//               control={control}
//               name={field.name}
//               rules={field.rules}
//               render={({field: {onChange, onBlur, value}}) => (
//                 <TextInput
//                   style={styles.input}
//                   placeholder={field.placeholder}
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                 />
//               )}
//             />
//             {errors[field.name] && (
//               <Text style={styles.errorText}>{field.label} is required.</Text>
//             )}
//           </View>
//         ))}
//         <Text>{'\n'}</Text>
//         <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   form: {
//     width: '80%',
//   },
//   label: {
//     marginTop: 20,
//     marginBottom: 5,
//     color: 'black',
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 18,
//     color: 'black',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//   },
// });

// export default MultiInputTransport;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const MultiInputTransport = () => {
  // Inisialisasi state dengan 1 set input yang memiliki nilai default untuk Vehicle Type, Vehicle No, Driver No, Container No, Seal No
  const [inputs, setInputs] = useState([
    {vehicleType: '', vehicleNo: '', driverNo: '', containerNo: '', sealNo: ''},
  ]);

  // Fungsi untuk menambah input baru
  const addInput = () => {
    setInputs([
      ...inputs,
      {
        vehicleType: '',
        vehicleNo: '',
        driverNo: '',
        containerNo: '',
        sealNo: '',
      },
    ]);
  };

  // Fungsi untuk menghapus input, kecuali input pertama
  const removeInput = index => {
    if (inputs.length > 1) {
      const updatedInputs = inputs.filter((_, i) => i !== index);
      setInputs(updatedInputs);
    }
  };

  // Fungsi untuk menangani perubahan nilai pada setiap input
  const handleChange = (text, field, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = text;
    setInputs(updatedInputs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MultiInputTransport</Text>

      <ScrollView>
        {inputs.map((input, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input.vehicleType}
              placeholder="Vehicle Type"
              onChangeText={text => handleChange(text, 'vehicleType', index)}
            />
            <TextInput
              style={styles.input}
              value={input.vehicleNo}
              placeholder="Vehicle No"
              onChangeText={text => handleChange(text, 'vehicleNo', index)}
            />
            <TextInput
              style={styles.input}
              value={input.driverNo}
              placeholder="Driver No"
              onChangeText={text => handleChange(text, 'driverNo', index)}
            />
            <TextInput
              style={styles.input}
              value={input.containerNo}
              placeholder="Container No"
              onChangeText={text => handleChange(text, 'containerNo', index)}
            />
            <TextInput
              style={styles.input}
              value={input.sealNo}
              placeholder="Seal No"
              onChangeText={text => handleChange(text, 'sealNo', index)}
            />
            {/* Tombol Remove hanya muncul jika input bukan yang pertama */}
            {index > 0 && (
              <TouchableOpacity
                onPress={() => removeInput(index)}
                style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Add Vehicle Info" onPress={addInput} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black'
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: 'black'

  },
  buttonContainer: {
    marginTop: 20,
  },
  removeButton: {
    backgroundColor: '#ff0000',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MultiInputTransport;
