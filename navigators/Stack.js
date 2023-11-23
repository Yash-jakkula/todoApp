import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text,View,Button,StyleSheet } from "react-native";
import Home from "../components/Home";
import Flex from "../components/flex";
const stack = createNativeStackNavigator();
const StackNav = () =>{
    return(
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name="Todo List" component={Home} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNav;