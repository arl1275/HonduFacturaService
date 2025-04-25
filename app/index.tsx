import { View, TouchableOpacity, Text } from "react-native";
import Modulebutton from "@/components/ModuleButton";
import { useRouter, Link } from 'expo-router';
const router = useRouter();
//import { routeCompany } from "./modules.index";
// <Modulebutton title={"GENERACION DE FACTURAS"} iconname="file-present" />
export default function Index() {

  return (
    <Link href={'/modules/company/indexcompany'}>
      <Modulebutton title={"GENERACION DE FACTURAS"} iconname="file-present" />
    </Link>
  );
}
