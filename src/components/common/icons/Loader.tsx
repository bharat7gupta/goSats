import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { ViewStyle } from 'react-native';

interface LoaderProps {
	size?: number;
	style?: ViewStyle;
}

export default function Loader(props: LoaderProps) {
	const { size = 80, style } = props;

	return (
		<Svg style={style} width={size} height={size} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<Circle cx="50" cy="50" fill="none" stroke="rgba(227, 133, 81, 0.87)" strokeWidth="10" r="35"  strokeDasharray="164.93361431346415 56.97787143782138" transform="matrix(1,0,0,1,0,0)" />
		</Svg>
	);
}
