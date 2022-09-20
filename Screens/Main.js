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

import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			facer: [],
		};
	}

	componentDidMount = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		this.setState({ hasCameraPermission: status === "granted" });
	};
	render() {
        var { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No access to camera</Text>
        </View>
      );
    }

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
                <Camera
						style={{ flex: 1 }}
						type={Camera.Constants.Type.back}
						faceDetectorSettings={{
							mode: FaceDetector.FaceDetectorMode.fast,
							detectLandmarks: FaceDetector.FaceDetectorLandmarks.all, //detect face features such as nose, eyes etc.
							runClassfication: FaceDetector.FaceDetectorClassifications.all,
						}}
						onFacesDetected={this.onFacesDetected}
						onFacesDetectionError={this.onFacesDetectionError}
					/>
                </View>

                <View style={styles.bottomContainer}></View>

                </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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

	title: {
		fontSize: 20,
		fontFamily: "monospace",
	},
	middleContainer: {
		flex: 0.7,
	},
	bottomContainer: {
        flex: 0.2,
		backgroundColor: "#e3e186",
        
	},
});
