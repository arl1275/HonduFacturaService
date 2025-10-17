import { View, Text } from "react-native";
import { product } from "@/storage/modals/inventory";
import { inventoryWH } from "@/storage/modals/inventory";
import { useEffect, useState } from "react";
import styles from "@/assets/styles/styles";

type props={ invo : inventoryWH }

const InsertLot = ({invo} : props) =>{
    const [invoLocal, setInvoloca]= useState<inventoryWH>()

    useEffect(()=>{
        setInvoloca(invo);
    }, [invo])
    
    return(
        <View>
            <View>
                <Text style={[styles.paragraph]}>Insert Lot</Text>
                <Text style={[styles.smallText]}>This view is to show the format to insert an inserting lot</Text>
            </View>
            <View>
                <Text></Text>
            </View>

        </View>
    )
}

export default InsertLot;