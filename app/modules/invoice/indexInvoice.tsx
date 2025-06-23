import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { company } from "@/storage/empresa";
import InvoiceHome from "./pages/HomeInvoicepage";
import InvoiceGen from "./pages/InvoiceGen";
import { invoice, invoicesconfig } from "@/storage/invoice";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    HomeInvoice: undefined;
    InvoiceGen: { item: company };
    CancelInvoice : { item : invoice};
};

const IndexInvoice = () => {
    return (
        <Stack.Navigator 
        initialRouteName="HomeInvoice" 
        screenOptions={{ 
            headerShown: false
            }}>
            <Stack.Screen name="HomeInvoice" component={InvoiceHome}/>
            <Stack.Screen name="InvoiceGen" component={InvoiceGen}/>
        </Stack.Navigator>

    )
}
export default IndexInvoice;