import { View, Text } from "react-native";
import { product } from "@/storage/modals/inventory";
import { inventoryWH } from "@/storage/modals/inventory";
import { useEffect } from "react";

type props={
    invo : inventoryWH
}

const InsertLot = ({invo} : props) =>{

    useEffect(()=>{

    }, [invo])
    
    return(
        <View>

        </View>
    )
}

export default InsertLot;