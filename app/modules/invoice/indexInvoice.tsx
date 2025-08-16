import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { company } from "@/storage/empresa";
import InvoiceHome from "./pages/HomeInvoicepage";
import InvoiceGen from "./pages/InvoiceGen";
import { invoice, invoicesconfig } from "@/storage/invoice";
import InvoiceDraftEditorPage from "./pages/InvoiceDraftEditor";
import InvoiceShowPage from "./pages/InvoiceShow";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    HomeInvoice: undefined;
    InvoiceGen: { item: company },
    InvoiceShow : { item : invoice},
    InvoiceDraft : { item : invoice}
    CancelInvoice : { item : invoice},
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
            <Stack.Screen name="InvoiceShow" component={InvoiceShowPage}/>
            <Stack.Screen name="InvoiceDraft" component={InvoiceDraftEditorPage}/>
        </Stack.Navigator>

    )
}
export default IndexInvoice;