import { createStackNavigator } from '@react-navigation/stack';
import InvoiceHome from '../invoice/pages/HomeInvoicepage';

export type StackParamList = {
  HomeInventory: undefined;
};

const InventoryStack = createStackNavigator<StackParamList>();

const IndexInventory = () => {
  return (
    <InventoryStack.Navigator initialRouteName="HomeInventory" screenOptions={{ headerShown: false }}>
      <InventoryStack.Screen name="HomeInventory" component={InvoiceHome}/>
    </InventoryStack.Navigator>
  );
};

export default IndexInventory;
