import { View, Text, TouchableOpacity, TextInput, Switch, Button, Platform } from "react-native";
import { invoicesconfig, rangos } from "@/storage/invoice";
import { saveInvoiceconfigs, updateInvoicesconfig, getInvoicesconfigs } from "@/storage/invoiceconfig.storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "@/assets/styles/styles";
import { useState } from "react";

type sendingprops = {
    parentprops: (value: invoicesconfig) => void;
}
// this is to configurate teh invoices information

const InvoiceConfig = () => {
    const [show, setShow] = useState(false);
    const [rango, setRangos] = useState<rangos>({
        id: 0,
        numero_uno: 0,
        numero_dos: 0,
        numero_tres: 0,
        numero_cuatro: 0,
        active: true
    })

    const [form, setForm] = useState({
        id: "",
        id_company: "",
        encabezado: "",
        fechalimite: new Date(),
        rangodefacturas: "",
        cantidad_maxima_efectivo: "",
        piedehoja: "",
        referencia_facturas: {
            inicio: "",
            fin: "",
        },
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
        const data = {
            ...form,
            id: parseInt(form.id),
            id_company: parseInt(form.id_company),
            rangodefacturas: parseInt(form.rangodefacturas),
            cantidad_maxima_efectivo: parseFloat(form.cantidad_maxima_efectivo),
            referencia_facturas: {
                inicio: parseInt(form.referencia_facturas.inicio),
                fin: parseInt(form.referencia_facturas.fin),
            },
        };
        //saveInvoiceconfigs(from)
        console.log("📦 Datos guardados:", data);
    };


    return (
        <View style={[styles.rectanglebutton,
        { alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', padding: 5, borderWidth: 0, aspectRatio: 'auto' }]}>
            <View style={[{ width: '90%' }]}>

                <TextInput placeholder="Encabezado de la factura" style={styles.textinput} onChangeText={(val) => handleInputChange("encabezado", val)} />

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

                    <Text style={styles.smallText}>Rango de facturas</Text>
                <View style={[styles.flexcomponentsRow, { margin : 0, justifyContent : 'space-between'}]}>
                    <TextInput placeholder="Numero 1" keyboardType="numeric" style={[styles.textinput, { margin : 0}]} onChangeText={(val) => handleFacturaRannge("rangodefacturas", parseInt(val))} />
                    <TextInput placeholder="Numero 2" keyboardType="numeric" style={[styles.textinput, { margin : 0}]} onChangeText={(val) => handleFacturaRannge("rangodefacturas", parseInt(val))} />
                    <TextInput placeholder="Numero 3" keyboardType="numeric" style={[styles.textinput, { margin : 0}]} onChangeText={(val) => handleFacturaRannge("rangodefacturas", parseInt(val))} />
                    <TextInput placeholder="Numero 4" keyboardType="numeric" style={[styles.textinput, { margin : 0}]} onChangeText={(val) => handleFacturaRannge("rangodefacturas", parseInt(val))} />
                </View>



                <TextInput placeholder="Máximo efectivo" keyboardType="numeric" style={styles.textinput} onChangeText={(val) => handleInputChange("cantidad_maxima_efectivo", val)} />

                <TextInput placeholder="Pie de hoja" style={styles.textinput} onChangeText={(val) => handleInputChange("piedehoja", val)} />

                <Text style={styles.smallText}>Fecha inicial</Text>
                <TextInput placeholder="Ingrese la fecha inicial." keyboardType="numeric" style={styles.textinput} onChangeText={(val) => handleReferenciaChange("inicio", val)} />

                <Text style={styles.smallText}>Fecha final</Text>
                <TextInput placeholder="Ingrese la fecha final." keyboardType="numeric" style={styles.textinput} onChangeText={(val) => handleReferenciaChange("fin", val)} />

                <View>
                    <Text style={styles.smallText}>¿Activo?</Text>
                    <Switch
                        value={form.active}
                        onValueChange={(val: boolean) => handleInputChange("active", val)}
                    />
                </View>
            </View>

            <TouchableOpacity style={[styles.rectanglebutton, { backgroundColor: '#1e8449', aspectRatio: 'auto' }]}>
                <Text style={[{ color: 'white' }]}>SAVE INVOICE CONFIG</Text>
            </TouchableOpacity>

        </View>
    )
}

export default InvoiceConfig;