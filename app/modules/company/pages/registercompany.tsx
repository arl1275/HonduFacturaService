import React, { useState } from 'react';
import { TextInput, Button, Text, ScrollView, View } from 'react-native';
import { company } from '@/storage/empresa';
import styles from "@/assets/styles/styles";
import { addcompany, getCompanies } from '@/storage/company.storage';

export default function RegisterCompany() {
  const [companyname, setCompanyname] = useState('');
  const [image, setImage] = useState('');
  const [rtn, setRtn] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    if (!companyname || !rtn) {
      setSuccess(false);
      return;
    }

    const nueva: company = {
      id: Date.now(),
      image,
      companyname,
      rtn,
      direccion_company: direccion,
      direccion_correo: correo,
      numero_telefono_compay: telefono,
      cais: [],
      active: true
    };

    addcompany(nueva);
    setSuccess(true);
    setCompanyname('');
    setRtn('');
    setDireccion('');
    setCorreo('');
    setTelefono('');
  };

  return (
    <ScrollView contentContainerStyle={[styles.fixedbox, { elevation: 0 }]}>
      <Text style={[{ fontSize: 15, fontWeight: 'bold', margin: 10 }]}>CREAR EMPRESA</Text>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput value={companyname} onChangeText={setCompanyname} placeholder='Nombre de la Empresa' />
      </View>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput  placeholder="RTN" value={rtn} onChangeText={setRtn} keyboardType="numeric" />
      </View>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput  placeholder="Direccion fisica" value={direccion} onChangeText={setDireccion} />
      </View>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput placeholder="Email" value={correo} onChangeText={setCorreo} keyboardType="email-address" />
      </View>

      <View style={[styles.textinput, { padding: 10 }]}>
        <TextInput  placeholder="telefono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      </View>

      <Button title="Guardar Compañía" onPress={handleSave} color={'green'} />
    </ScrollView>
  );
}

