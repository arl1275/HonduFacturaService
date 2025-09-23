import React, { useState } from 'react';
import { TextInput, Button, Text, ScrollView, View, Image, Alert, TouchableOpacity } from 'react-native';
import { company } from '@/storage/modals/empresa';
import styles from "@/assets/styles/styles";
import { addcompany } from '@/storage/company.storage';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RootStackParamList } from '../indexcompany';
import { useNavigation } from '@react-navigation/native';

type HomeCompanyNavigationProp = StackNavigationProp<RootStackParamList, 'HomeCompany'>;

//-----------------------------------------------------------------------------------------------------//
//  THIS FILE IS TO CREATE A COMPANY
//-----------------------------------------------------------------------------------------------------//

export default function RegisterCompany() {
  const navigation = useNavigation<HomeCompanyNavigationProp>();

  const [companyname, setCompanyname] = useState('');
  const [image, setImage] = useState('');
  const [rtn, setRtn] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [success, setSuccess] = useState(false);

  // Nueva función para seleccionar imagen
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a tus fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImage(selectedImage.base64 ?? '');
    }
  };

  const handleSave = () => {
    if (!companyname || !rtn) {
      setSuccess(false);
      return;
    }

    const nueva: company = {
      id: Date.now(),
      image,  // Aquí ya va el base64
      companyname,
      impuestos: [],
      rtn,
      direccion_company: direccion,
      direccion_correo: correo,
      numero_telefono_compay: telefono,
      active: true
    };

    addcompany(nueva);
    setSuccess(true);
    setCompanyname('');
    setRtn('');
    setDireccion('');
    setCorreo('');
    setTelefono('');
    setImage('');
  };
  const oncancel = () => { navigation.goBack() }

  return (
    <ScrollView contentContainerStyle={[{ margin: 10 }]}>
      <TouchableOpacity onPress={oncancel} style={[styles.flexcomponentsRow, { alignItems: 'center' }]}>
        <Ionicons name="chevron-back" size={30} color="black" />
        <Text style={[styles.paragraph, { fontWeight: 'bold', marginLeft: 10, color: 'black' }]}>CREAR EMPRESA</Text>
      </TouchableOpacity>

      <Text style={[styles.smallText, { color: 'black', textAlign: 'left', margin: 10 }]}>Please full fill the whole fields to create a company. Do not let any field black, that could generate errors.</Text>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput value={companyname} onChangeText={setCompanyname} placeholder='Nombre de la Empresa' />
      </View>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput placeholder="RTN" value={rtn} onChangeText={setRtn} keyboardType="numeric" />
      </View>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput placeholder="Dirección física" value={direccion} onChangeText={setDireccion} />
      </View>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput placeholder="Email" value={correo} onChangeText={setCorreo} keyboardType="email-address" />
      </View>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      </View>



      {image !== '' && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${image}` }}
          style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginVertical: 10 }}
        />
      )}

      <View style={[styles.flexcomponentsRow, {justifyContent : 'space-between'}]}>
        <Button title="Seleccionar Logo" onPress={pickImage} color={'blue'} />
        <Button title="Guardar Compañía" onPress={handleSave} color={'green'} />
      </View>

    </ScrollView>
  );
}
