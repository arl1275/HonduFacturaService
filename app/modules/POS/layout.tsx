import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
//import { company } from "@/storage/empresa";
//import InvoiceHome from "./pages/HomeInvoicepage";
//import InvoiceGen from "./pages/InvoiceGen";
import { invoice, invoicesconfig } from "@/storage/modals/invoice";
//import InvoiceDraftEditorPage from "./pages/InvoiceDraftEditor";
//import InvoiceShowPage from "./pages/InvoiceShow";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    HomePOS: undefined;
}

const IndexPOS = () => {
    return (
        <Stack.Navigator 
        initialRouteName="HomePOS" 
        screenOptions={{ 
            headerShown: false,
            }}>
            <Stack.Screen name="HomePOS" component={null}/>
        </Stack.Navigator>

    )
}
export default IndexPOS;