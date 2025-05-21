import { View, Text, Button } from "react-native";
import { invoicesconfig, rangos } from "@/storage/invoice";
import { getInvoicesconfigs} from "@/storage/invoiceconfig.storage";
import { useEffect, useState } from "react";


const Index_invoice_company = () => {
    const [configlist, setConfiglist] = useState<invoicesconfig[]>([])

    const updateList = async ()=>{setConfiglist( getInvoicesconfigs())}

    useEffect(()=>{
        updateList();
    }, [])

    return (
        <View>
            <View style={[{ width: '90%', alignSelf: 'center' }]}>
                <Button title='CREAR INVOICE CONFIG' color={'black'} />
            </View>


        </View>
    )
}

export default Index_invoice_company