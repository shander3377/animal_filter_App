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
import Filter from "../Components/Filter";

import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";

const data = {
	Crown: [
		{ id: "crown-pic1", src: require("../assets/crown-pic1.png") },
		{ id: "crown-pic2", src: require("../assets/crown-pic2.png") },
		{ id: "crown-pic3", src: require("../assets/crown-pic3.png") },
	],
	Flowers: [
		{ id: "flower-pic1", src: require("../assets/flower-pic1.png") },
		{ id: "flower-pic2", src: require("../assets/flower-pic2.png") },
		{ id: "flower-pic3", src: require("../assets/flower-pic3.png") },
	],
	Hairs: [{ id: "hair-pic1", src: require("../assets/hair-pic1.png") }],
	Hats: [
		{ id: "hat-pic1", src: require("../assets/hat-pic1.png") },
		{ id: "hat-pic2", src: require("../assets/hat-pic2.png") },
	],
	Others: [
		{ id: "other-pic1", src: require("../assets/other-pic1.png") },
		{ id: "other-pic2", src: require("../assets/other-pic2.png") },
		{ id: "other-pic3", src: require("../assets/other-pic3.png") },
	],
};

const filters = {
	"crown-pic1": {
		src: require("../assets/crown-pic1.png"),
		width: 3.5,
		height: 0.7,
		left: 0.46,
		right: 0.15,
		top: 1.5,
	},
	"crown-pic2": {
		src: require("../assets/crown-pic2.png"),
		width: 3.5,
		height: 1.2,
		left: 0.46,
		right: 0.15,
		top: 0.7,
	},
	"crown-pic3": {
		src: require("../assets/crown-pic3.png"),
		width: 2,
		height: 0.6,
		left: 0.36,
		right: 0.15,
		top: 1.5,
	},
	"flower-pic1": {
		src: require("../assets/flower-pic1.png"),
		width: 1.5,
		height: 0.55,
		left: 0.36,
		right: 0.15,
		top: 1.5,
	},
	"flower-pic2": {
		src: require("../assets/flower-pic2.png"),
		width: 1.2,
		height: 0.55,
		left: 0.36,
		right: 0.15,
		top: 1.3,
	},
	"flower-pic3": {
		src: require("../assets/flower-pic3.png"),
		width: 5,
		height: 0.8,
		left: 0.46,
		right: 0.15,
		top: 1.4,
	},
	"hair-pic1": {
		src: require("../assets/hair-pic1.png"),
		width: 1,
		height: 2.5,
		left: 0.35,
		right: 0.5,
		top: 0.75,
	},
	"hat-pic1": {
		src: require("../assets/hat-pic1.png"),
		width: 1.3,
		height: 0.65,
		left: 0.36,
		right: 0.15,
		top: 1.5,
	},
	"hat-pic2": {
		src: require("../assets/hat-pic2.png"),
		width: 1,
		height: 1.5,
		left: 0.4,
		right: 0.1,
		top: 0.8,
	},
	"other-pic1": {
		src: require("../assets/other-pic1.png"),
		width: 3.5,
		height: 0.65,
		left: 0.45,
		right: 0.15,
		top: 1.5,
	},
	"other-pic2": {
		src: require("../assets/other-pic2.png"),
		width: 3.5,
		height: 0.65,
		left: 0.45,
		right: 0.15,
		top: 1,
	},
	"other-pic3": {
		src: require("../assets/other-pic3.png"),
		width: 3.5,
		height: 0.75,
		left: 0.45,
		right: 0.15,
		top: 1.2,
	},
};
export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			faces: [],
			current_filter: "crown-pic1",
			selected: "Crown",
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
						var f = filters[this.state.current_filter];
						console.log(this.state.current_filter)
						return (
							<Filter
								face={face}
								img={f.src}
								width={f.width}
								height={f.height}
								left={f.left}
								right={f.right}
								top={f.top}
							/>
						);
					})}
				</View>

				<View style={styles.bottomContainer}>
					<View style={styles.topBottomContainer}>
						<ScrollView
							contentContainerStyle={styles.scrollContainer}
							horizontal
							showsHorizontalScrollIndicator={false}
						>
							{Object.keys(data).map((category) => {
								return (
									<TouchableOpacity
										key={category.id}
										style={[
											styles.category,
											{
												backgroundColor:
													this.state.selected === category
														? "rgba(32, 154, 214, 0.4)"
														: "rgba(235, 52, 180, 0.2)",
											},
										]}
										onPress={() => {
											this.setState({
												selected: category,
											});
										}}
									>
										<Text>{category}</Text>
									</TouchableOpacity>
								);
							})}
						</ScrollView>
					</View>
					<View
						style={{
							borderBottomColor: "black",
							borderBottomWidth: StyleSheet.hairlineWidth,
						}}
					/>
					<View style={styles.lowerBottomContainer}>
						<ScrollView
							contentContainerStyle={styles.scrollContainer}
							horizontal
							showsHorizontalScrollIndicator={false}
						>
							{data[this.state.selected].map((filter_data) => {
								return (
									<TouchableOpacity
										key={`${filter_data.id}`}
										style={[
											styles.filterButton,
											{
												borderColor:
													this.state.current_filter === filter_data.id
														? "#FFA384"
														: "#FFFF",
											},
										]}
										onPress={() =>
											this.setState({
												current_filter: `${filter_data.id}`,
											})
										}
									>
										<Image source={filter_data.src} />
									</TouchableOpacity>
								);
							})}
						</ScrollView>
					</View>
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

		flex: 0.7,
	},
	bottomContainer: {
		flex: 0.2,
		backgroundColor: "#e3e186",
	},
	topBottomContainer: {
		flex: 0.3,
	},
	lowerBottomContainer: {
		flex: 0.7,
	},
	scrollContainer: {},
	filter_image: {
		width: 50,
		height: 50,
	},
	category: {
		height: RFValue(40),
		width: RFValue(80),
		justifyContent: "center",
		alignItems: "center",
		borderRadius: RFValue(35),
		borderWidth: 3,
		marginRight: RFValue(20),
		marginBottom: RFValue(10),
	},
	filterButton: {
		height: RFValue(90),
		width: RFValue(90),
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(32, 154, 214, 0.4)",
		borderRadius: RFValue(35),
		borderWidth: 3,
		marginRight: RFValue(20),
		marginTop: RFValue(7),
	},
});
