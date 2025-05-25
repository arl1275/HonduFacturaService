import { View, Text, Button, Animated } from "react-native";
import { invoicesconfig } from "@/storage/invoice";
import { getInvoicesconfigs } from "@/storage/invoiceconfig.storage";
import { useEffect, useState, useRef } from "react";
import InvoiceConfig from "./Invoiceconfig";

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
    }, []);

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

    return (
        <View>
            <View style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
                <Button title={!isCreating ? 'CREAR INVOICE CONFIG' : 'CANCELAR'} color={!isCreating ?'black' : '#c0392b'} onPress={creating} />
            </View>

            {isCreating && (
                <Animated.View style={{ opacity: fadeAnim }}>
                    <InvoiceConfig />
                </Animated.View>
            )}
        </View>
    );
};

export default Index_invoice_company;
