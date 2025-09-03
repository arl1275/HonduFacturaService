import { View, Text, TouchableOpacity, TextInput, Switch, Button, Platform } from "react-native";
import React from "react";
import { invoicesconfig, rangos } from "@/storage/invoice";
import { addInvoiceconfig, updateInvoicesconfig } from "@/storage/invoiceconfig.storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "@/assets/styles/styles";
import { cais } from "@/storage/empresa";
import { useState, useEffect } from "react";
import { formated_invoice_number } from "../../invoice/utils/InvoiceNumberGenerator";

type ForEditParams = {
    id_company: number | undefined;
    parentprops: invoicesconfig | undefined;
    _onclose_: () => void;
}

const InvoiceConfig = ({ parentprops, _onclose_, id_company }: ForEditParams) => {
    const [show, setShow] = useState(false);
    const [cais_, setcais] = useState<cais>({ id: Date.now(), nombre: "", active: true })
    const [rango, setRangos] = useState<rangos>({
        id: Date.now(),
        numero_uno: 0,
        numero_dos: 0,
        numero_tres: 0,
        numero_cuatro: 0,
        active: true
    })

    useEffect(() => {
        if (parentprops != undefined) {
            setForm(parentprops);
            setRangos(parentprops.referencia_facturas);
            setcais(parentprops.cai);
        }
    }, [parentprops])

    const [form, setForm] = useState<invoicesconfig>({
        id: Date.now(),
        created_at : new Date(),
        id_company: id_company ? id_company : 0,
        encabezado: "",
        cai: cais_,
        fechalimite: new Date(),
        rangodefacturas: 0,
        numero_maximo: 0,
        piedehoja: "",
        referencia_bruta : '',
        referencia_facturas: rango,
        active: false,
    });

    const handleInputChange = (field: string, value: string | number | boolean | rangos | cais) => {
        setForm({ ...form, [field]: value });
    };

    const handleFacturaRannge = (field: string, value: any) => {
        const num = parseInt(value);
        setRangos(prev => ({
            ...prev,
            [field]: num,
        }));
    };


    const handleSave = () => {
        const finalForm: invoicesconfig = {
            ...form,
            referencia_bruta : formated_invoice_number(rango),
            referencia_facturas: rango,
            cai: cais_
        };

        if(finalForm.fechalimite < new Date()){ alert("Date seleccted not alowed"); return;}

        if (finalForm.cai.nombre != "" && finalForm.referencia_facturas.numero_cuatro != 0) {
            if (parentprops) {
                updateInvoicesconfig(finalForm);
                _onclose_();
                alert('Invoice config has been updated')
                return
            }

            addInvoiceconfig(finalForm);
            _onclose_();
            return
        }
        alert('Values are not carget yet')
    };


    return (
        <View style={[styles.rectanglebutton,
        { alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', padding: 5, borderWidth: 0, aspectRatio: 'auto' }]}>
            <View style={[{ width: '90%' }]}>
                <Text style={styles.smallText}>
                    Registrar la configuracion de las facturas, esta configuracion se agregara en todas las facturas generadas para esta empresa.
                    Siempre y cuando la configuracion se mantenga activa</Text>
                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5, marginBottom: 5 }]} />

                <TextInput
                    placeholder={parentprops ? form.encabezado : "Encabezado de la factura"}
                    style={styles.textinput} multiline={true}
                    onChangeText={(val) => handleInputChange("encabezado", val)}
                />

                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5, marginBottom: 5 }]} />
                <View>
                    <Text style={styles.smallText}>Fecha límite:</Text>
                    <Button title={form.fechalimite.toString()} onPress={() => setShow(!show)} />
                    {show && (
                        <DateTimePicker
                            value={new Date(form.fechalimite)}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(event, selectedDate) => {
                                setShow(false);
                                if (selectedDate) {
                                    setForm({ ...form, fechalimite: selectedDate });
                                }
                            }}
                        />
                    )}
                </View>

                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5, marginBottom: 5 }]} />

                <TextInput
                    value={parentprops && cais_.nombre }
                    placeholder={parentprops ? form.cai.nombre : "Ingrese CAI"} style={[styles.textinput]}
                    multiline={true}
                    onChangeText={(val) => setcais(prev => ({ ...prev, nombre: val.toString() }))}
                />

                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5, marginBottom: 5 }]} />

                <Text style={styles.smallText}>Rango de facturas</Text>
                <View style={[styles.flexcomponentsRow, { margin: 0, justifyContent: 'space-between' }]}>
                    <TextInput
                        value={parentprops && rango.numero_uno.toString()}
                        placeholder={parentprops ? form.referencia_facturas.numero_uno.toString() : "Numero 1"}
                        keyboardType="numeric" style={[styles.textinput, { margin: 0, width: '23%' }]}
                        onChangeText={(val) => handleFacturaRannge("numero_uno", val)}
                    />

                    <TextInput
                        value={parentprops && rango.numero_dos.toString()}
                        placeholder={parentprops ? form.referencia_facturas.numero_dos.toString() : "Numero 2"}
                        keyboardType="numeric" style={[styles.textinput, { margin: 0, width: '23%' }]}
                        onChangeText={(val) => handleFacturaRannge("numero_dos", val)}
                    />

                    <TextInput
                        value={parentprops && rango.numero_tres.toString()}
                        placeholder={parentprops ? form.referencia_facturas.numero_tres.toString() : "Numero 3"}
                        keyboardType="numeric" style={[styles.textinput, { margin: 0, width: '23%' }]}
                        onChangeText={(val) => handleFacturaRannge("numero_tres", val)}
                    />

                    <TextInput
                        value={parentprops && rango.numero_cuatro.toString()}
                        placeholder={parentprops ? form.referencia_facturas.numero_cuatro.toString() : "Numero 4"}
                        keyboardType="numeric" style={[styles.textinput, { margin: 0, width: '23%' }]}
                        onChangeText={(val) => handleFacturaRannge("numero_cuatro", val)}
                    />

                </View>


                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5, marginBottom: 5 }]} />
                <TextInput 
                    placeholder={parentprops ? form.numero_maximo.toString() : "Cantidad maxima de factura"} 
                    keyboardType="numeric" style={styles.textinput} 
                    onChangeText={(val: string) => handleInputChange("numero_maximo", parseInt(val))} 
                />

                <TextInput 
                    placeholder={parentprops ? parentprops.piedehoja : 'Ingrese pie de la factura'} 
                    style={styles.textinput} 
                    onChangeText={(val) => handleInputChange("piedehoja", val)} 
                />

                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5 }]} />
                <View style={[styles.flexcomponentsRow]}>
                    <Text style={styles.smallText}>Activo</Text>
                    <Switch
                        value={form.active}
                        onValueChange={(val: boolean) => handleInputChange("active", val)}
                    />
                </View>
            </View>

            <TouchableOpacity
                onPress={() => { handleSave() }}
                style={[styles.rectanglebutton, { backgroundColor: parentprops ? '#16a085' : '#1e8449', aspectRatio: 'auto' }]}>
                <Text style={[{ color: 'white' }]}>{parentprops ? "UPDATE SAVE INVOICE CONFIG" : "SAVE CHANGES"}</Text>
            </TouchableOpacity>

        </View>
    )
}

export default InvoiceConfig;