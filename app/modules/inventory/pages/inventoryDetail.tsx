import { View, Text } from "react-native";
import styles from "@/assets/styles/styles";
import { StackParamList } from "../indexInventory";
import { StackScreenProps } from "@react-navigation/stack";
import { inventoryWH } from "@/storage/modals/inventory";

type props = StackScreenProps<StackParamList, "Inventorydetail">;

const InventoryDetail = ({route, navigation} : props) =>{
    const item = route.params;
    return(
        <View>

        </View>
    )
}

export default InventoryDetail;