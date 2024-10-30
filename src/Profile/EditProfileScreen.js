import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const EditProfileScreen = () => {
  const profile = {
    avatar: 'https://example.com/jane-doe-avatar.png',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '08123456789',
    crewId: '007',
  };
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setBio] = useState(profile.phone);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [crewId, setcrewId] = useState(profile.crewId);

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../Assets/img/avatar.png')}
        />
        <TouchableOpacity
          style={styles.changeAvatarButton}
          onPress={() => {
            /* open image picker */
          }}>
          <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          value={phone}
          onChangeText={setBio}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Crew Id</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Crew Id"
          value={crewId}
          onChangeText={setBio}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmit({avatar, name, email, phone, crewId})}>
          <Text style={styles.buttonText}>Save Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
    color: 'black',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    color: 'black',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 18,
  },
});

export default EditProfileScreen;
