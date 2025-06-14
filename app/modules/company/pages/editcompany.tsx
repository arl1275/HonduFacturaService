import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../indexcompany';
import styles from '@/assets/styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { updatecompany } from '@/storage/company.storage';
import Index_invoice_company from '../components/indexInvoiceConfig';

import { company } from '@/storage/empresa';

type Props = StackScreenProps<RootStackParamList, 'Editpage'>;

export default function EditCompanyPage({ route, navigation }: Props) {
  const { item } = route.params;
  //const navigation = useNavigation<Props>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [EditCompany, setEditCompany] = useState<company>(item)

  const iseditingCompany = () => { setIsEditing(!isEditing) };
  const oncancel = () => { navigation.navigate('HomeCompany') }

  const valuesEditing = (key: string, value: string | number) => {
    setEditCompany(prev => ({ ...prev, [key]: value }));
  }

  const onSave = () => { updatecompany(EditCompany); oncancel() }

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
      valuesEditing("image", selectedImage.base64 ?? '');
    }
  };


  return (
    <View style={{flex : 1}}>
      <View style={[styles.flexcomponentsRow, { margin: 5 }]}>
        <TouchableOpacity onPress={() => oncancel()}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>Edit Company Page</Text>
      </View>

      {
        isEditing ?
          <View style={[{ alignSelf: 'center', justifyContent: 'space-between', padding: 5, borderBlockColor: 'black', borderWidth: 1, elevation: 10, borderRadius: 7, width: '95%', backgroundColor: 'white' }]}>
            <View>
              <Text style={[styles.smallText, styles.textalingleft, { color: 'black', fontWeight: 'bold' }]}>Edit Company</Text>
            </View>

            <View style={[styles.textinput, { padding: 10 }]}>
              <TextInput onChangeText={(e) => valuesEditing("companyname", e)} placeholder={"Nombre de empresa: " + item.companyname} />
            </View>

            <View style={[styles.textinput, { padding: 10 }]}>
              <TextInput placeholder={"RTN: " + item.rtn} onChangeText={(e) => valuesEditing("rtn", e)} keyboardType="numeric" />
            </View>

            <View style={[styles.textinput, { padding: 10 }]}>
              <TextInput placeholder={"Dirección física: " + item.direccion_company} onChangeText={(e) => valuesEditing("direccion_company", e)} />
            </View>

            <View style={[styles.textinput, { padding: 10 }]}>
              <TextInput placeholder={"Email: " + item.direccion_correo} onChangeText={(e) => valuesEditing("direccion_correo", e)} keyboardType="email-address" />
            </View>

            <View style={[styles.textinput, { padding: 10 }]}>
              <TextInput placeholder={"Teléfono: " + item.numero_telefono_compay} onChangeText={(e) => valuesEditing("numero_telefono_compay", e)} keyboardType="phone-pad" />
            </View>

            {EditCompany.image !== '' && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${EditCompany.image}` }}
                style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginVertical: 10 }}
              />
            )}

            <View style={[styles.flexcomponentsRow, { width: '100%', justifyContent: 'space-around', padding: 10 }]}>
              <Button title="Cambiar Logo" onPress={pickImage} color={'blue'} />
              <Button title="Guardar" onPress={onSave} color={'green'} />
              <Button title="Cancelar" onPress={iseditingCompany} color={'red'} />
            </View>

          </View>
          :
          <View style={[styles.rectanglebutton, styles.flexcomponentsRow,
          { alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', padding: 5, borderBlockColor: 'black', borderWidth: 1 }]}>
            <View style={[{ padding: 5 }]}>
              <Text style={[styles.smallText, styles.textalingleft, { color: 'black' }]}>{item.companyname}</Text>
              <Text style={[styles.smallText, styles.textalingleft]}>Numero: {item.numero_telefono_compay}</Text>
              <Text style={[styles.smallText, styles.textalingleft]}>Dirreccion: {item.direccion_correo}</Text>
              <Text style={[styles.smallText, styles.textalingleft]}>RTN: {item.rtn}</Text>
            </View>

            <View>
              <TouchableOpacity onPress={iseditingCompany}>
                <Ionicons name={"create"} size={25} color={"black"} />
              </TouchableOpacity>
            </View>

          </View>
      }

     <Index_invoice_company/>

    </View>
  );
}
