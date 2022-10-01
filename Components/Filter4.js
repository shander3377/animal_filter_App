import React from "react";
import { Image, View, Text } from "react-native";
var Filter4 = (props) => {
	var faceHeight = props["face"]["bounds"]["size"]["height"];
	var faceWidth = props["face"]["bounds"]["size"]["width"];
	var leftEyePosition = props["face"]["LEFT_EYE"];
    var rightEyePosition = props["face"]["RIGHT_EYE"];
    console.log( props["face"]["bounds"])
	var noseBasePosition = props["face"]["NOSE_BASE"];
    
    const filterWidth = faceWidth * 3.5;
    const filterHeight = faceHeight * 0.7;
	const transformAngle = (
		angleRad = Math.atan(
			(rightEyePosition.y - leftEyePosition.y) /
				(rightEyePosition.x - leftEyePosition.x)
		)
	) => (angleRad * 100) / Math.PI;
	return (
        <View
        style={{
          position: "absolute",
          left: leftEyePosition.x - filterWidth * 0.576,
          right: rightEyePosition.x - filterWidth * 0.1,
          top: noseBasePosition.y - filterHeight * 1.5
        }}
      >
			<Image
				source={require("../assets/flower-pic1.png")}
				style={{
					width: filterWidth,
					height: filterHeight,
					resizeMode: "contain",
					transform: [{ rotate: `${transformAngle()}deg` }],
				}}
			></Image>
		</View>
	);
};
export default Filter4;
