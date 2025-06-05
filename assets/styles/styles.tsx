import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  fixedbox: {
    borderWidth: 1,
    borderColor: 'grey',
    elevation: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 3,
    padding: 10,
    height: 'auto',
    margin: 5
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'transparent',
    borderRadius: 5,
    margin: 5,
    fontSize: 20,
  },
  mainbuttonstyle: {
    borderRadius: 50,
    backgroundColor: 'black',
    borderWidth: 0,
    margin: 20,
    padding: 10
  },
  flexcomponentsRow: {
    display: 'flex',
    flexDirection: 'row',
    //justifyContent : 'space-around',
    margin: 10,
    padding: 5
  },
  squarebutton: {
    aspectRatio: 1,             // Hace que siempre sea un cuadrado perfecto
    width: '30%',               // El ancho será 30% del contenedor padre (puedes ajustar)
    justifyContent: 'center',   // Centrar contenido verticalmente
    alignItems: 'center',       // Centrar contenido horizontalmente
    borderRadius: 10,           // Bordes redondeados
    elevation: 10,              // Sombra en Android
    backgroundColor: 'white',   // (Opcional) para que se vea mejor
    padding: 10,                // Espacio interno para que el texto no quede pegado
  },
  rectanglebutton: {
    width: '95%',               // 80% del ancho del contenedor (ajustable)
    aspectRatio: 5.0,            // Relación ancho:alto (2.5 veces más ancho que alto)
    justifyContent: 'center',    // Centrado vertical
    alignItems: 'center',        // Centrado horizontal
    borderRadius: 10,            // Bordes redondeados
    elevation: 10,               // Sombra para Android
    backgroundColor: 'white',    // Color de fondo
    padding: 10,                 // Espaciado interno
  },
  title: {
    fontSize: width * 0.07,  // 7% del ancho de pantalla
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  paragraph: {
    fontSize: width * 0.045, // 4.5% del ancho
    color: 'white',
    textAlign: 'justify',
    lineHeight: width * 0.06, // Line height también responsive
    marginVertical: 5,
  },
  smallText: {
    fontSize: width * 0.03, // 3% del ancho
    color: 'gray',
    textAlign: 'center',
    marginVertical: 2,
  },
  textalingleft: {
    textAlign: 'left',
    marginLeft: 10
  },
  imageRender: {
    overflow: 'hidden',
    backgroundColor: '#ccc', // Color de fondo por si tarda en cargar
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default styles