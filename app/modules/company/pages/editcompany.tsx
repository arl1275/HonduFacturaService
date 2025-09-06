import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, Image, Modal, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../indexcompany';
import styles from '@/assets/styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { updatecompany } from '@/storage/company.storage';
import Index_invoice_company from '../components/indexInvoiceConfig';

import { company, impuesto } from '@/storage/empresa';
import ModalCreateImpuesto from '../modals/CrearImpuesto';
import ModalEditImpuesto from '../modals/EditImpuesto';

type Props = StackScreenProps<RootStackParamList, 'Editpage'>;

export default function EditCompanyPage({ route, navigation }: Props) {
  const { item } = route.params;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [EditCompany, setEditCompany] = useState<company>(item);
  const [ShowModalTax, setShowModalTax] = useState<boolean>(false);
  const [ShowModalTaxEdit, setShowModalTaxEdit] = useState<boolean>(false);
  const [editTax, setEditTax] = useState<impuesto | undefined>(undefined);

  const iseditingCompany = () => { setIsEditing(!isEditing) };
  const oncancel = () => { navigation.navigate('HomeCompany') }

  const valuesEditing = (key: string, value: string | number | impuesto[]) => {
    setEditCompany(prev => ({ ...prev, [key]: value }));
  }

  const onSave = () => { updatecompany(EditCompany); oncancel(); }

  //-----------------------------------------------------this funtions are for tax configurations -----------------------------------------------------
  // this is to set the object before save the updates
  const appendNewTax = (newTAX: impuesto): impuesto[] => {
    if (!EditCompany.impuestos || EditCompany.impuestos.length === 0) {
      return [newTAX];
    }
    const exists = EditCompany.impuestos.some(item => item.id === newTAX.id);
    let alterArray: impuesto[] = [];
    if (exists) {
      alterArray = EditCompany.impuestos.map(item =>
        item.id === newTAX.id ? newTAX : item
      );
    } else {
      alterArray = [...EditCompany.impuestos, newTAX];
    }

    return alterArray;
  };


  // this is to open modal of editing and create Taxes
  const onViewModalTax = () => { setShowModalTax(!ShowModalTax) };
  const onViewModalTaxEdit = () => { setShowModalTaxEdit(!ShowModalTaxEdit) };

  const onSaveTaxAdd = (newTax: impuesto) => {
    const ArrayTax: impuesto[] = appendNewTax(newTax);
    valuesEditing("impuestos", ArrayTax);
    //onSaveTAxes('The Value has been created');
  };

  const OnEditTax = (UpdatedTax: impuesto) => {
    const ArrayTax: impuesto[] = appendNewTax(UpdatedTax);
    valuesEditing("impuestos", ArrayTax);
    //onSaveTAxes('The value has been updated');
  }

  // onDelte Tax
  const DeleteTax = (DeleteTax: impuesto) => {
    Alert.alert("WAARNING", "You will delete a Tax from this company",
      [
        {
          text: "CANCEL",
          style: "cancel"
        },
        {
          text: "YEX",
          onPress: () => {
            const UpdateArrayTax: impuesto[] = item.impuestos.filter(imp => imp.id != DeleteTax.id);
            valuesEditing("impuestos", UpdateArrayTax);
            //onSaveTAxes('The value has been deleted.')
          }
        }
      ],
      { cancelable: false }
    )

  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    <View style={{ flex: 1 }}>

      {/*-------------------THIS ARE THE MODALs-------------------*/}

      <Modal visible={ShowModalTax} transparent={true} animationType="fade" >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={[{ width: '70%' }]}>
            <ModalCreateImpuesto addImpuesto={onSaveTaxAdd} onclose={onViewModalTax} />
          </View>
        </View>
      </Modal>

      <Modal visible={ShowModalTaxEdit} transparent={true} animationType="fade" >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={[{ width: '70%' }]}>
            <ModalEditImpuesto item={editTax} saveUpdate={OnEditTax} onclose={onViewModalTaxEdit} />
          </View>
        </View>
      </Modal>


      {/*-------------------THIS ARE THE MODALs-------------------*/}

      <View style={[styles.flexcomponentsRow, { margin: 5, alignItems : 'center' }]}>
        <TouchableOpacity onPress={() => oncancel()}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>Edit Company</Text>

      </View>

      {
        isEditing ?
          <View style={[{ alignSelf: 'center', justifyContent: 'space-between', padding: 5, borderBlockColor: 'black', borderWidth: 1, elevation: 10, borderRadius: 7, width: '95%', backgroundColor: 'white', marginBottom: 10 }]}>
            <View>
              <Text style={[styles.paragraph, styles.textalingleft, { color: 'black', fontWeight: 'bold', marginBottom: 10 }]}>EDIT COMPANY</Text>

              <TouchableOpacity onPress={onViewModalTax} style={[{ padding: 10, backgroundColor: 'black', borderRadius: 50 }]}>
                <Text style={[styles.smallText, { color: 'white', alignSelf: 'center' }]}>PRESS HERE TO ADD A TAX</Text>
              </TouchableOpacity>

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

            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', borderRadius: 5, borderWidth: 1, borderColor: '#e5e8e8' }]}>
              {EditCompany.image !== '' && (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${EditCompany.image}` }}
                  style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginVertical: 10, borderWidth: 1, borderColor: 'grey' }}
                />
              )}

              <View style={[{ width: '50%', justifyContent: 'space-around', padding: 10 }]}>
                <Button title="CHANCE LOGO" onPress={pickImage} color={'blue'} />
                <Button title="SAVE CHANGES" onPress={onSave} color={'green'} />
                <Button title="CANCEL" onPress={iseditingCompany} color={'red'} />
              </View>
            </View>

            <View>
              <Text style={[styles.paragraph, styles.textalingleft, { marginBottom: 0, color: 'grey' }]}>TAXes</Text>

              <FlatList
                style={[{ height: '15%', borderWidth: 1, borderRadius: 5, borderColor: 'grey', marginLeft: 5, marginRight: 5, marginBottom: 5 }]}
                data={EditCompany.impuestos}
                keyExtractor={(_item_) => _item_.id.toString()}
                renderItem={({ item }) => (
                  <View style={[styles.flexcomponentsRow, { borderBottomWidth: 0.5, borderBottomColor: 'grey', width: '95%', justifyContent: 'space-between', alignItems: 'center', margin: 0 }]}>

                    <View style={[styles.flexcomponentsRow, { alignItems: 'center', margin: 0 }]}>
                      <TouchableOpacity onPress={() => { setEditTax(item); onViewModalTaxEdit() }}>
                        <Ionicons name={"create"} size={25} color={"black"} />
                      </TouchableOpacity>

                      <TouchableOpacity style={[{ marginLeft: 5, marginRight: 5 }]} onPress={() => DeleteTax(item)}>
                        <Ionicons name={"trash"} size={25} color={"grey"} />
                      </TouchableOpacity>

                      <Text>{item.nombre}</Text>
                    </View>

                    <Text>{item.porcentaje} %</Text>
                    <Text style={[styles.smallText, { color: item.active ? 'green' : 'red' }]}>{item.active ? 'ACTIVE' : 'DEACTIVE'}</Text>

                  </View>
                )}
                ListEmptyComponent={
                  <Text>NO TAXES REGISTER</Text>
                }
              />
            </View>


          </View>
          :
          <View>
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

          </View>

      }

      {!isEditing && <Index_invoice_company companyprops={item} />}

    </View>
  );
}
