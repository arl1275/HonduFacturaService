import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import styles from '@/assets/styles/styles';

type Props = {
  base64Image: string;  // Cadena base64 que recibes
};

const { width } = Dimensions.get('window'); // Obtenemos ancho de pantalla

const CircularImage: React.FC<Props> = ({ base64Image }) => {
  const imageSize = width * 0.3; // 30% del ancho de la pantalla

  return (
    <View style={[styles.imageRender, { width: imageSize/2, height: imageSize/2, borderRadius: imageSize / 2 }]}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${base64Image}` }}
        style={{ width: '100%', height: '100%', borderRadius: imageSize / 2 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default CircularImage;
