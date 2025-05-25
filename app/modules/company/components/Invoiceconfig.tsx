import { View, Text, TouchableOpacity, TextInput, Switch } from "react-native";
import { invoicesconfig, rangos } from "@/storage/invoice";
import { saveInvoiceconfigs, updateInvoicesconfig, getInvoicesconfigs } from "@/storage/invoiceconfig.storage";
import styles from "@/assets/styles/styles";
import { useState } from "react";

type sendingprops = {
    parentprops: (value: invoicesconfig) => void;
}
// this is to configurate teh invoices information

const InvoiceConfig = () => {
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
        { alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', padding: 5, borderWidth: 0, aspectRatio : 'auto'}]}>
            <View style={[{width : '90%'}]}>

                <TextInput placeholder="Encabezado de la factura" style={styles.textinput} onChangeText={(val) => handleInputChange("encabezado", val)} />

                {/*<View style={styles.datePickerContainer}>
                    <Text style={styles.label}>Fecha límite:</Text>
                    <Button title={form.fechalimite.toDateString()} onPress={() => setShowDatePicker(true)} />
                    {showDatePicker && (
                        <DateTimePicker
                            value={form.fechalimite}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    setForm({ ...form, fechalimite: selectedDate });
                                }
                            }}
                        />
                    )}
                </View>*/}

                <TextInput placeholder="Rango de facturas" keyboardType="numeric" style={styles.textinput} onChangeText={(val) => handleInputChange("rangodefacturas", val)}/>

                <TextInput placeholder="Máximo efectivo" keyboardType="numeric" style={styles.textinput} onChangeText={(val) => handleInputChange("cantidad_maxima_efectivo", val)}/>

                <TextInput placeholder="Pie de hoja" style={styles.textinput} onChangeText={(val) => handleInputChange("piedehoja", val)} />

                <Text style={styles.smallText}>Referencia - Inicio</Text>
                <TextInput placeholder="Inicio" keyboardType="numeric" style={styles.textinput} onChangeText={(val) => handleReferenciaChange("inicio", val)}/>

                <Text style={styles.smallText}>Referencia - Fin</Text>
                <TextInput placeholder="Fin" keyboardType="numeric" style={styles.textinput} onChangeText={(val) => handleReferenciaChange("fin", val)}/>

                <View>
                    <Text style={styles.smallText}>¿Activo?</Text>
                    <Switch
                        value={form.active}
                        onValueChange={(val : boolean) => handleInputChange("active", val)}
                    />
                </View>
            </View>

            <TouchableOpacity style={[styles.rectanglebutton,  {backgroundColor : '#1e8449', aspectRatio : 'auto'}]}>
                <Text style={[{ color: 'white' }]}>SAVE INVOICE CONFIG</Text>
            </TouchableOpacity>

        </View>
    )
}

export default InvoiceConfig;