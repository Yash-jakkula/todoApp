import { useState } from "react"

import { 
    Text,View,TextInput,
    StyleSheet,TouchableOpacity 
} from "react-native"

import AndriodCheckBox from 'expo-checkbox'

const Flex = () => {
    return(
        <View style={styles.home}>
     
     <View style={styles.container}>
            <Text>hello</Text>
            <Text>hii</Text>
     </View>
        
        <View style={{flex:1}}>
            <Text>good</Text>
        </View>
</View>
    )
}

const styles = StyleSheet.create({
    home:{
       flex:1,
       backgroundColor:'red',
       flexDirection:'column'
    },
    container:{
       flex:1,
       maxHeight:60,
       backgroundColor:'pink',
       flexDirection:'row',
    
    },
    input:{
        height:40,
        width:200,
        borderColor:'black',
        borderWidth:1,
        margin:10,
        padding:10
    },
    plus:{
        fontSize:30,
        margin:10,
        color:'blue'
    }
})

export default Flex;