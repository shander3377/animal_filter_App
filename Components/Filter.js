import React from "react";
import { Image, View, Text } from "react-native";
var Filter = (props) => {
	var faceHeight = props["face"]["bounds"]["size"]["height"];
	var faceWidth = props["face"]["bounds"]["size"]["width"];
	var leftEyePosition = props["face"]["LEFT_EYE"];
	var rightEyePosition = props["face"]["RIGHT_EYE"];
	console.log(props["face"]["bounds"]);
	var noseBasePosition = props["face"]["NOSE_BASE"];
	var left = props["left"] + 0.1;
	var right = props["right"];
	var top = props["top"];
	var img = props["img"];
	var width = props["width"];
	var height = props["height"];

	const filterWidth = faceWidth * width;
	const filterHeight = faceHeight * height;
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
				left: leftEyePosition.x - filterWidth * left,
				right: rightEyePosition.x - filterWidth * right,
				top: noseBasePosition.y - filterHeight * top,
			}}
		>
			<Image
				source={img}
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
export default Filter;
