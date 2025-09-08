import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORTS OF SCREENS
import IndexInvoice from './modules/invoice/indexInvoice';
import IndexCompany from './modules/company/indexcompany';
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/native";
import type { ViewStyle } from "react-native";

export const hideTabBarOnSubRoutes = (
  route: RouteProp<Record<string, object | undefined>, string>,
  homeRoute: string,
  hiddenRoutes: string[]
) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? homeRoute;

  if (hiddenRoutes.includes(routeName)) {
    return { tabBarStyle: { display: "none" } as ViewStyle };
  }

  return {};
};


const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Text>Hola</Text>
  )
}


export default function App() {
  const visibleRoutes = ['Inicio', 'Invoices', 'Company'];
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        tabBarStyle: visibleRoutes.includes(route.name)
          ? {
            margin: 10,
            borderRadius: 50,
            elevation: 10,
          }
          : { display: 'none' },

        headerShown: false,
        tabBarAllowFontScaling: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home-sharp' : 'home-sharp';
          } else if (route.name === 'Invoices') {
            iconName = focused ? 'document-text-sharp' : 'document-text-sharp';
          } else if (route.name === 'Company') {
            iconName = focused ? 'settings-sharp' : 'settings-sharp';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Invoices" component={IndexInvoice} options={({ route }) => hideTabBarOnSubRoutes(route, "HomeInvoice", ["InvoiceGen", "InvoiceShow", "InvoiceDraft"])}  />
      <Tab.Screen name="Company" component={IndexCompany} options={({ route }) => hideTabBarOnSubRoutes(route, "HomeCompany", ["Settings", "Editpage"])} />

    </Tab.Navigator>
  );
}