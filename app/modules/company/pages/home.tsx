import { Text, View, TouchableOpacity, FlatList } from "react-native";
import Homecardcompany from "../components/headCompanycard";
import { useNavigation } from '@react-navigation/native';
import { getCompanies } from "@/storage/company.storage";
import { RootStackParamList } from "../indexcompany";
import { StackNavigationProp } from '@react-navigation/stack';
import styles from "@/assets/styles/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { company } from "@/storage/empresa";

type HomeCompanyNavigationProp = StackNavigationProp<RootStackParamList, 'HomeCompany'>;

export default function HomeCompany() {
  const navigation = useNavigation<HomeCompanyNavigationProp>();
  const [Companies, setCompanies] = useState<company[]>([]);

  const getallcompanies =  () => {
    const companies =  getCompanies(); // Si getCompanies es async
    setCompanies(companies);
  };

  useEffect(() => {
    getallcompanies();
  }, []);

  return (
    <View>
      <Text style={[styles.title, styles.textalingleft, { color: 'black', fontFamily: 'sans-serif' }]}>Company</Text>
      <View>
        <Text style={[styles.smallText, styles.textalingleft, { color: 'black', fontFamily: 'sans-serif' }]}>
          This page is to manage and companies in this app, important.
          You can only delete a company when it does not have an invoice indexed
        </Text>
      </View>

      <View style={styles.flexcomponentsRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.squarebutton}>
          <Ionicons name={"create"} size={25} color={"black"} />
          <Text>CREAR COMPAÑIA</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={Companies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Editpage', { item })}>
            <Homecardcompany value={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: 'center', color: 'gray' }}>No companies yet.</Text>
          </View>
        }
      />

    </View>
  );
}
