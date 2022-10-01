import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class Home extends Component {
  render() {
    return (
        <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.upperContainer}>
            <Image
                style={{ height: 40, width: 46 }}
                source={require("../assets/fox.png")}
            ></Image>
            <Text style={styles.title}>Look at me...</Text>
            </View>
            
            <View style={styles.middleContainer}>

                <View style={styles.topMiddleContainer}>
                    <Text style={styles.text}> Look at me is one of the best app to try out filters. There are many types of filters such as crows, hats, flowers, hair etc. You shoud definetey try them all!</Text>
                </View>

                <TouchableOpacity style={styles.lowerMiddleContainer}
                onPress={()=>this.props.navigation.navigate("Main")}>
                <Text style={styles.text}>TRY NOWW!</Text>

                </TouchableOpacity>
            </View>
</View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: "#e3e186",

    },
    droidSafeArea: {
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
    upperContainer: {
        flexDirection: "row",
		flex: 0.1,
		backgroundColor: "#e3e186",
		alignItems: "center",
        justifyContent: "center",
    },
    middleContainer: {
        flex: 0.8,
		backgroundColor: "rgba(32, 154, 214, 0.4)",


        marginLeft: RFValue(20),
        marginRight: RFValue(20),
        borderRadius: 15

    },
    topMiddleContainer: {
        flex: 0.6,
        marginTop: RFValue(20),
        borderRadius: 15,
        backgroundColor: "rgba(235, 52, 180, 0.4)",
        
        marginLeft: RFValue(10),
        marginRight: RFValue(10),

    },
lowerMiddleContainer: {
        flex: 0.2,
        marginTop: RFValue(20),
        borderRadius: 15,
        backgroundColor: "rgba(235, 52, 180, 0.4)",
        flexDirection: "row",
		alignItems: "center",
        justifyContent: "center",
        marginLeft: RFValue(10),
        marginRight: RFValue(10),

    },
    text: {
        fontSize: 22,
        color: 'red',
        fontFamily: "monospace"
    }
})