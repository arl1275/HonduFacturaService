import React, {useState} from "react";
import { View, TextInput } from "react-native";
import { impuesto } from "@/storage/empresa";

type props = {
    addImpuesto : (value : impuesto) => void;
    onclose : () => void; 
}

const ModalCreateImpuesto = ({addImpuesto, onclose} : props) => {
    const [NewImpuesto, setNewImpuesto] = useState<impuesto>({
        id : Date.now(),
        nombre : '',
        porcentaje : 0,
        active : false
    });

    const OnUpdateValue = ( e : string | number | boolean , field : string) =>{
        setNewImpuesto((prev) =>({...prev, [field] : e}))
    }

    return(
        <View>

        </View>
    )
}

export default ModalCreateImpuesto;