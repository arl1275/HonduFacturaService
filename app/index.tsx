import { Text, View } from "react-native";
import Modulebutton from "@/components/ModuleButton";
import { useRouter } from 'expo-router';
import ModuleIndex from "./modules.index";

export default function Index() {
  const router = useRouter();
  const routesModules = ModuleIndex;
  const value = (value: string) => { router.push( routesModules.company)}

  return (
    <View>
      <Modulebutton title={"GENERACION DE FACTURAS"} iconname="file-present" _onclick_={value} />
    </View>
  );
}
