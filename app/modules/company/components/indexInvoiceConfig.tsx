import { View, Text, Button, Animated, FlatList } from "react-native";
import { invoicesconfig } from "@/storage/invoice";
import { getInvoicesconfigs } from "@/storage/invoiceconfig.storage";
import { useEffect, useState, useRef } from "react";
import InvoiceConfig from "./Invoiceconfig";
import styles from "@/assets/styles/styles";

const Index_invoice_company = () => {
    const [configlist, setConfiglist] = useState<invoicesconfig[]>([]);
    const updateList = async () => { setConfiglist(getInvoicesconfigs()) };
    const [isCreating, setIsCreating] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const creating = () => {
        setIsCreating(prev => !prev);
    };

    useEffect(() => {
        updateList();
    }, [configlist.length]);

    // Ejecutar animación cuando se activa "crear"
    useEffect(() => {
        if (isCreating) {
            fadeAnim.setValue(0); // reiniciar
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }).start();
        }
    }, [isCreating]);

    const formatrefenciafactura = ( props : any) =>{
        return `${props.numero_uno} - ${props.numero_dos} - ${props.numero_tres} - ${props.numero_cuatro}`
    }

    return (
        <View>
            <View style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
                <Button title={!isCreating ? 'CREAR INVOICE CONFIG' : 'CANCELAR'} color={!isCreating ? 'black' : '#c0392b'} onPress={creating} />
            </View>

            {isCreating && (
                <Animated.View style={{ opacity: fadeAnim }}>
                    <InvoiceConfig />
                </Animated.View>
            )}

            <FlatList
                data={configlist}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.rectanglebutton, { height: 'auto', alignSelf : 'center', justifyContent: 'space-between', margin : 5, padding : 5 }]}>
                        <View style={[{ alignSelf : 'flex-start' }]}>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'black', marginVertical : 0 }]}>CAI : {item.cai.nombre}</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'black', marginVertical : 0 }]}>Fecha Maxima : {item.fechalimite.toString()}</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'black', marginVertical : 0 }]}>Rango Maximo : {item.numero_maximo}</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'black', marginVertical : 0 }]}>Rango inicial : {formatrefenciafactura(item.referencia_facturas)}</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: item.active ? "green" : 'red' , marginVertical : 0}]}>{item.active ? "ACTIVO" : 'DESACTIVADO'}</Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text>Digit a new information config.</Text>
                }
            />

        </View>
    );
};

export default Index_invoice_company;
