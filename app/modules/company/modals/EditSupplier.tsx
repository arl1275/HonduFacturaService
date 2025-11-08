import React, { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { supplier } from "@/storage/modals/supplier";
import styles from "@/assets/styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
//import { Button } from "@react-navigation/elements";

type props = {
    item: supplier | undefined,
    saveUpdate: (Up: supplier) => void;
    onclose: () => void;
}

const ModalEditSupplier = ({ item, saveUpdate, onclose }: props) => {
    const [NewSupplier, setNewSupplier] = useState<supplier>({
        id: Date.now(),
        name: "",
        code: "",
        rtn: "",
        phone_num: "",
        email: "",
        is_block: false,
    });

    useEffect(() => {
        if (typeof item != 'undefined') setNewSupplier(item);
    }, [item]);

    const VAlItem = () => { return item != undefined ? true : false}

    const OnUpdateValue = (e: string | number | boolean, field: string) => { setNewSupplier((prev) => ({ ...prev, [field]: e }))}

    const Update_SUPP = () => {
        if(NewSupplier.name != "" && NewSupplier.code != "" && NewSupplier.phone_num != ""){
            saveUpdate(NewSupplier);
            onclose();
        }else{
            Alert.alert("FIELDs MISSING", "You have not updated the fields for this supplier");
        }
    }

    return (
        <View style={[{ width: '100%', alignSelf: 'center', justifyContent: 'space-between', padding: 5, borderBlockColor: 'black', borderWidth: 1, elevation: 10, borderRadius: 7, backgroundColor: 'white', marginBottom: 10 }]}>

            <View style={[styles.flexcomponentsRow, { margin: 5, alignItems: 'center', justifyContent: 'space-between' }]}>
                <Text style={[styles.paragraph, { color: 'black' }]}>CREATE SUPPLIER</Text>
                <TouchableOpacity style={[{ marginLeft: 5, marginRight: 5 }]} onPress={() => onclose()}>
                    <Ionicons name={"close-circle-outline"} size={25} color={"red"} />
                </TouchableOpacity>
            </View>

            <TextInput 
                placeholder={ VAlItem() ? item?.name : "Insert Name"}
                onChangeText={(e: string) => OnUpdateValue(e, "name")} 
                style={[styles.textinput, { padding: 10, margin: 7 }]} 
            />
            
            <TextInput
                placeholder={ VAlItem() ? item?.code : "Insert Code"}
                onChangeText={(e) => OnUpdateValue(e, "code")}
                style={[styles.textinput, { padding: 10, margin: 7 }]}
            />

            <TextInput 
                placeholder={ VAlItem() ? item?.rtn : "Insert RTN"}
                onChangeText={(e: string) => OnUpdateValue(e, "rtn")} 
                style={[styles.textinput, { padding: 10, margin: 7 }]} 
            />
            
            <TextInput
                placeholder={ VAlItem() ? item?.phone_num : "Insert Phone Number"}
                onChangeText={(e) => OnUpdateValue(e, "phone_num")}
                style={[styles.textinput, { padding: 10, margin: 7 }]}
            />

             <TextInput
                placeholder={ VAlItem() ? item?.email : "Insert E-mail"}
                onChangeText={(e) => OnUpdateValue(e, "email")}
                style={[styles.textinput, { padding: 10, margin: 7 }]}
            />


            <View style={[styles.flexcomponentsRow, { alignSelf: 'flex-end', margin: 0 }]}>
                <Text style={[styles.smallText]}>Active Supplier</Text>
                <Switch
                    value={NewSupplier.is_block}
                    onValueChange={(val: boolean) => OnUpdateValue(val, "is_block")}
                />
            </View>

            <View>
                <TouchableOpacity onPress={() => Update_SUPP()} style={[{ padding: 10, backgroundColor: 'black', borderRadius: 50 }]}>
                    <Text style={[{ color: 'white', alignSelf: 'center' }]}>UPDATE SUPPLIER</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalEditSupplier;