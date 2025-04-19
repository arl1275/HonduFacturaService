import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fixedbox : {
        borderWidth : 1,
        borderColor : 'grey',
        elevation : 0,
        backgroundColor : 'rgba(255, 255, 255, 0)',
        borderRadius : 3,
        padding : 10,
        height : 'auto',
        margin : 5
    },
    textinput : {
        borderWidth : 1,
        borderColor : 'grey',
        backgroundColor : 'transparent',
        borderRadius : 4,
        margin : 5,
        fontSize : 20,
    },
    mainbuttonstyle : {
        borderRadius : 50,
        backgroundColor : 'black',
        borderWidth : 0,
        margin : 20
    },
    flexcomponentsRow : {
        display : 'flex',
        flexDirection : 'row',
        //justifyContent : 'space-around',
        margin : 10,
        padding : 5
    }
})

export default styles