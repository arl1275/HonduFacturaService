import React from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../indexcompany';

type Props = StackScreenProps<RootStackParamList, 'Editpage'>;

export default function EditCompanyPage({ route}: Props) {
  const { item } = route.params;

  return (
    <View>
      <Text>Edit Company Page</Text>
      <Text>{item.companyname}</Text>
    </View>
  );
}
