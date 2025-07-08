//------ THIS COMPONENT IS FOR ADD A COUSTOMER HERE ---------------//

import styles from "@/assets/styles/styles"
import { useState } from "react";
import { Button, TextInput, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";

type props = {
    setComprador: (value: any) => void;
    _onSet_: () => void;
}


const EditConsumer = ({ setComprador, _onSet_ }: props) => {
    //const [Comprador, setComprador] = useState({ comprador: 'Cliente Final', comprador_rtn: '0000-0000-00000' });
    const [RegisterComprador, setRegisterComprador] = useState<boolean>(false);
    const _RegisterComprador_ = () => { setRegisterComprador(!RegisterComprador) }

    return (
        <View style={[styles.flexcomponentsRow, { marginLeft: 20, marginRight: 20, borderWidth: 1, borderColor: 'grey', borderRadius: 7 }]}>
            <View style={[{ margin: 10 }]}>
                <Button title={!RegisterComprador ? "WITH RTN ?" : "<"} color={RegisterComprador ? "blue" : "black"} onPress={_RegisterComprador_} />
            </View>

            {
                RegisterComprador &&
                <View style={[styles.flexcomponentsRow, { margin: 0 }]}>
                    <View style={[styles.textinput, { padding: 10, width: '40%' }]}>
                        <TextInput
                            onChangeText={(e) => setComprador((prev: any) => ({ ...prev, comprador: e }))}
                            placeholder="BUYER" style={{ width: '100%', textAlign: 'left', textAlignVertical: 'center' }}
                        />
                    </View>

                    <View style={[styles.textinput, { padding: 10, width: '40%' }]}>
                        <TextInput
                            placeholder="RTN"
                            onChangeText={(e) => setComprador((prev: any) => ({ ...prev, comprador_rtn: e }))}
                            keyboardType="numeric"
                            style={{ width: '100%', textAlign: 'left', textAlignVertical: 'center' }}
                        />
                    </View>

                    <TouchableOpacity onPress={_onSet_}>
                        <Ionicons name="checkbox-outline" color="green" size={20} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default EditConsumer