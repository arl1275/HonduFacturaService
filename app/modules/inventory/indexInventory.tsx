import { createStackNavigator } from '@react-navigation/stack';
import { inventoryWH, product } from '@/storage/modals/inventory';

// pages
import HomeInventory from './pages/homeinventory';
import InventoryDetail from './pages/inventoryDetail';
import { company } from '@/storage/modals/empresa';
import InsertLot_view from './pages/Insert_lot';
import InsertingLotPage from './pages/InsertingLotPage';

export type StackParamList = {
  HomeInventory: undefined;
  Inventorydetail : {invo : inventoryWH, comp : company | undefined};
  InsertingLot : {invo : inventoryWH};
  InsertingLotPage : {invo : inventoryWH | undefined};
};

const InventoryStack = createStackNavigator<StackParamList>();

const IndexInventory = () => {
  return (
    <InventoryStack.Navigator initialRouteName="HomeInventory" screenOptions={{ headerShown: false }}>
      <InventoryStack.Screen name="HomeInventory" component={HomeInventory}/>
      <InventoryStack.Screen name="Inventorydetail" component={InventoryDetail}/>
      <InventoryStack.Screen name="InsertingLot" component={InsertLot_view}/>
      <InventoryStack.Screen name="InsertingLotPage" component={InsertingLotPage}/>
    </InventoryStack.Navigator>
  );
};

export default IndexInventory;
