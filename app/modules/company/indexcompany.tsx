import { TouchableOpacity, Text} from "react-native";
import ModuleSubbutton from "@/components/SubModuleButton";
import { useRouter, Link } from "expo-router";
const router = useRouter();

 //<ModuleSubbutton title="CREAR COMPAÑIA" iconname="menu"/>
const indexCompany = () =>{

    return(
        <Link href={'/modules/company/pages/registercompany'}>
           <Text>IR a compañia</Text>
        </Link>
    )
}

export default indexCompany;