import { View, Text, Button, Animated, FlatList, TouchableOpacity, Alert } from "react-native";
import { invoicesconfig } from "@/storage/modals/invoice";
import { getInvoicesconfig_by_companyid } from "@/storage/invoiceconfig.storage";
import { useEffect, useState, useRef } from "react";
import InvoiceConfig from "./Invoiceconfig";
import styles from "@/assets/styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { company } from "@/storage/empresa";

type companyparams = { companyprops: company | undefined; }

const Index_invoice_company = ({ companyprops }: companyparams) => {
    const [CompanyParam, setCompanyParam] = useState<company>();
    const [configlist, setConfiglist] = useState<invoicesconfig[]>([]);
    const [SendtoEdit, setSendtoEdit] = useState<invoicesconfig | undefined>()
    const [isCreating, setIsCreating] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const updateList = async () => {
        companyprops != undefined ? setCompanyParam(companyprops) : alert("");
        if (CompanyParam) {
            let result = getInvoicesconfig_by_companyid(CompanyParam.id);
            //console.log("result: ", result);
            setConfiglist(result);
        }
    };

    const creating = () => {
        setIsCreating(prev => !prev);
    };

    useEffect(() => {
        updateList();
    }, [companyprops, isCreating]);

    //isCreating, companyprops
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

    const formatrefenciafactura = (props: any) => {
        return `${props.numero_uno} - ${props.numero_dos} - ${props.numero_tres} - ${props.numero_cuatro}`
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
                <Button title={!isCreating ? 'CREATE INVOICE CONFIG' : 'CANCELAR'} color={!isCreating ? 'black' : '#c0392b'}
                    onPress={() => {
                        if (!isCreating) setSendtoEdit(undefined)
                        creating()
                    }} />
            </View>

            {isCreating && (
                <Animated.View style={{ opacity: fadeAnim }}>
                    <InvoiceConfig _onclose_={creating} parentprops={SendtoEdit} id_company={CompanyParam?.id} />
                </Animated.View>
            )}

            <FlatList
                data={configlist}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.rectanglebutton, styles.flexcomponentsRow, { height: 'auto', alignSelf: 'center', justifyContent: 'space-between', margin: 5, padding: 5, borderWidth: 1, borderColor: '#e5e8e8' }]}>

                        <View style={[{ alignSelf: 'flex-start' }]}>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'black', marginVertical: 0, fontWeight: 'bold' }]}>CAI : {item.cai.nombre}</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'black', marginVertical: 0 }]}>Fecha Maxima : <Text style={[styles.smallText, styles.textalingleft, { color: 'black', marginVertical: 0, fontWeight: 'bold' }]}>{item.fechalimite.toString()}</Text></Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'black', marginVertical: 0 }]}>Rango Maximo : {item.numero_maximo}</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'black', marginVertical: 0 }]}>Rango inicial : {item.referencia_bruta}</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: item.active ? "green" : 'red', marginVertical: 0 }]}>{item.active ? "ACTIVO" : 'DESACTIVADO'}</Text>
                        </View>
                        <View style={{ alignContent: 'center' }}>
                            {
                                SendtoEdit?.id === item.id && isCreating === true ?
                                    <Text style={[styles.paragraph, { color: 'red', fontWeight: 'bold' }]}>ON EDIT</Text>
                                    :
                                    <TouchableOpacity onPress={() => { setSendtoEdit(item), creating() }}>
                                        <Ionicons name={"create-outline"} size={30} color={"black"} />
                                    </TouchableOpacity>
                            }

                        </View>

                    </View>
                )}
                ListEmptyComponent={
                    <Text>Digit a new information config.</Text>
                }
            />

        </View>
    );
    2
};

export default Index_invoice_company;
