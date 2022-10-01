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
import Filter12 from "../Components/Filter12";
import Filter11 from "../Components/Filter11";
import Filter10 from "../Components/Filter10";
import Filter9 from "../Components/Filter9";
import Filter8 from "../Components/Filter8";
import Filter7 from "../Components/Filter7";
import Filter6 from "../Components/Filter6";
import Filter5 from "../Components/Filter5";
import Filter4 from "../Components/Filter4";
import Filter3 from "../Components/Filter3";
import Filter2 from "../Components/Filter2";
import Filter1 from "../Components/Filter1";

import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";

var data = [
	{ id: "filter1", src: require("../assets/crown-pic1.png") },
	{ id: "filter2", src: require("../assets/crown-pic2.png") },
	{ id: "filter3", src: require("../assets/crown-pic3.png") },
	{ id: "filter4", src: require("../assets/flower-pic1.png") },
	{ id: "filter5", src: require("../assets/flower-pic2.png") },
	{ id: "filter6", src: require("../assets/flower-pic3.png") },
	{ id: "filter7", src: require("../assets/hair-pic1.png") },
	{ id: "filter8", src: require("../assets/hat-pic1.png") },
	{ id: "filter9", src: require("../assets/hat-pic2.png")},
	{ id: "filter10", src: require("../assets/other-pic1.png") },
	{ id: "filter11", src: require("../assets/other-pic2.png" )},
	{ id: "filter12", src: require("../assets/other-pic3.png") },
];
export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			faces: [],
			current_filter: "filter1",
		};
	}

	componentDidMount = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		this.setState({ hasCameraPermission: status === "granted" });
	};
	onFaceDetectionError = (error) => {
		console.warn(error);
	};
	onFacesDetected = (faces) => {
		if (faces["faces"][0]) {
			this.setState({ faces: faces["faces"] });
		}
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
						type={Camera.Constants.Type.front}
						faceDetectorSettings={{
							mode: FaceDetector.FaceDetectorMode.fast,
							detectLandmarks: FaceDetector.FaceDetectorLandmarks.all, //detect face features such as nose, eyes etc.
							runClassfication: FaceDetector.FaceDetectorClassifications.all,
						}}
						onFacesDetected={this.onFacesDetected}
						onFacesDetectionError={this.onFacesDetectionError}
					/>
					{this.state.faces.map((face) => {
						if (this.state.current_filter==="filter1") {
							return <Filter1 face={face} />;
						} else if (this.state.current_filter==="filter2") {
							return <Filter2 face={face} />;
						} else if (this.state.current_filter==="filter3") {
							return <Filter3 face={face} />;
						} else if (this.state.current_filter==="filter4") {
							return <Filter4 face={face} />;
						} else if (this.state.current_filter==="filter5") {
							return <Filter5 face={face} />;
						} else if (this.state.current_filter==="filter6") {
							return <Filter6 face={face} />;
						} else if (this.state.current_filter==="filter7") {
							return <Filter7 face={face} />
						} else if (this.state.current_filter==="filter8") {
							return <Filter8 face={face} />;
						} else if (this.state.current_filter==="filter9") {
							return <Filter9 face={face} />;
						} else if (this.state.current_filter==="filter10") {
							return <Filter10 face={face} />;
						} else if (this.state.current_filter==="filter11") {
							return <Filter11 face={face} />;
						} else if (this.state.current_filter==="filter12") {
							return <Filter12 face={face} />;
						}
					})}
				</View>

				<View style={styles.bottomContainer}>
						<ScrollView
							contentContainerStyle={styles.scrollContainer}
							horizontal
							showsHorizontalScrollIndicator={false}
						>
						{data.map((facedata) => {
								return (
									<TouchableOpacity
										key={facedata.id}
										style={[
											styles.button,
											{
												borderColor:
													this.state.current_filter === facedata.id
														? "red"
														: "#b",
											},
										]}
										onPress={() => {
											this.setState({
												current_filter: facedata.id,
											});
										}}
									>
										<Image
											source={facedata.src}
											style={styles.filter_image}
										></Image>
									</TouchableOpacity>
								);
							})}
						</ScrollView>
				</View>
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
		flexDirection: "row",

		flex: 0.8,
	},
	bottomContainer: {
		flex: 0.1,
		backgroundColor: "#e3e186",

	},
	scrollContainer: {


	},
	filter_image: {
		width: 50,
		height: 50
	},
	button: {
		height: RFValue(70),
		width: RFValue(70),
	justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(35),
    backgroundColor: "#E7F2F8",
    borderWidth: 5,
    marginRight: RFValue(20),
    marginBottom: RFValue(10)
	}
});
