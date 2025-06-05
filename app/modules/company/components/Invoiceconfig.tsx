import { View, Text, TouchableOpacity, TextInput, Switch, Button, Platform } from "react-native";
import { invoicesconfig, rangos } from "@/storage/invoice";
import { addInvoiceconfig } from "@/storage/invoiceconfig.storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "@/assets/styles/styles";
import { cais } from "@/storage/empresa";
import { useState } from "react";

type sendingprops = {
    parentprops: (value: invoicesconfig) => void;
}
// this is to configurate teh invoices information

const InvoiceConfig = () => {
    const [show, setShow] = useState(false);
    const [cais_, setcais] = useState<cais>({ id: 0, nombre: "", active: true })
    const [rango, setRangos] = useState<rangos>({
        id: 0,
        numero_uno: 0,
        numero_dos: 0,
        numero_tres: 0,
        numero_cuatro: 0,
        active: true
    })

    const [form, setForm] = useState<invoicesconfig>({
        id: 0,
        id_company: 0,
        encabezado: "",
        cai: cais_,
        fechalimite: new Date(),
        rangodefacturas: 0,
        numero_maximo: 0,
        piedehoja: "",
        referencia_facturas: rango,
        active: false,
    });

    const handleInputChange = (field: string, value: string | number | boolean) => {
        setForm({ ...form, [field]: value });
    };

    const handleReferenciaChange = (field: "inicio" | "fin", value: string) => {
        setForm({
            ...form,
            referencia_facturas: {
                ...form.referencia_facturas,
                [field]: value,
            },
        });
    };

    const handleFacturaRannge = (field: string, value: number) => {
        setRangos(prev => ({
            ...prev,
            [field]: value,
        }));
    };


    const handleSave = () => {
        addInvoiceconfig(form);
        console.log("📦 Datos guardados:", form);
    };


    return (
        <View style={[styles.rectanglebutton,
        { alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', padding: 5, borderWidth: 0, aspectRatio: 'auto' }]}>
            <View style={[{ width: '90%' }]}>
                <Text style={styles.smallText}>Registrar la configuracion de las facturas, esta configuracion se agregara en todas las facturas generadas para esta empresa. Siempre y cuando la configuracion se mantenga activa</Text>
                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5, marginBottom: 5 }]} />

                <TextInput placeholder="Encabezado de la factura" style={styles.textinput} multiline={true} onChangeText={(val) => handleInputChange("encabezado", val)} />

                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5, marginBottom: 5 }]} />
                <View>
                    <Text style={styles.smallText}>Fecha límite:</Text>
                    <Button title={form.fechalimite.toDateString()} onPress={() => setShow(!show)} />
                    {show && (
                        <DateTimePicker
                            value={form.fechalimite}
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
                <TextInput placeholder="Ingrese CAI" style={[styles.textinput]} multiline={true} onChangeText={(val) => setcais(prev =>({...prev, nombre : val}))} />

                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5, marginBottom: 5 }]} />

                <Text style={styles.smallText}>Rango de facturas</Text>
                <View style={[styles.flexcomponentsRow, { margin: 0, justifyContent: 'space-between' }]}>
                    <TextInput placeholder="Numero 1" keyboardType="numeric" style={[styles.textinput, { margin: 0 }]} onChangeText={(val) => handleFacturaRannge("numero_uno", parseInt(val))} />
                    <TextInput placeholder="Numero 2" keyboardType="numeric" style={[styles.textinput, { margin: 0 }]} onChangeText={(val) => handleFacturaRannge("numero_dos", parseInt(val))} />
                    <TextInput placeholder="Numero 3" keyboardType="numeric" style={[styles.textinput, { margin: 0 }]} onChangeText={(val) => handleFacturaRannge("numero_tres", parseInt(val))} />
                    <TextInput placeholder="Numero 4" keyboardType="numeric" style={[styles.textinput, { margin: 0 }]} onChangeText={(val) => handleFacturaRannge("numero_cuatro", parseInt(val))} />
                </View>


                <View style={[{ borderBottomWidth: 1, borderBlockColor: '#e5e7e9', marginTop: 5, marginBottom: 5 }]} />
                <TextInput placeholder="Máximo efectivo" keyboardType="numeric" style={styles.textinput} onChangeText={(val) => handleInputChange("numero_maximo", val)} />

                <TextInput placeholder="Pie de hoja" style={styles.textinput} onChangeText={(val) => handleInputChange("piedehoja", val)} />
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
            onPress={handleSave}
            style={[styles.rectanglebutton, { backgroundColor: '#1e8449', aspectRatio: 'auto' }]}>
                <Text style={[{ color: 'white' }]}>SAVE INVOICE CONFIG</Text>
            </TouchableOpacity>

        </View>
    )
}

export default InvoiceConfig;