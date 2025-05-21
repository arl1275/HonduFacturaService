import { View, Text, TouchableOpacity } from "react-native";
import { invoicesconfig, rangos } from "@/storage/invoice";
import { saveInvoiceconfigs, updateInvoicesconfig, getInvoicesconfigs } from "@/storage/invoiceconfig.storage";
import styles from "@/assets/styles/styles";

type sendingprops = {
    parentprops: (value: invoicesconfig) => void;
}
// this is to configurate teh invoices information

const InvoiceConfig = () => {
    return (
        <View>
            <View>

            </View>

            <TouchableOpacity>
                <Text>GUARDAR INVOICE CONFIG</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default InvoiceConfig;