import React from 'react';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface LinearGradientProps {
	width?: number;
	height?: number;
}

export default function LinearGradientComponent(props: LinearGradientProps) {
	const { width = 300, height = 27 } = props;

	return (
		<Svg width={width} height={height} viewBox="0 0 300 27" fill="none" preserveAspectRatio="xMinYMin slice">
			<Path d="M0 0H300V17C300 22.5228 295.523 27 290 27H10C4.47716 27 0 22.5228 0 17V0Z" fill="url(#paint0_linear)"/>
			<Defs>
				<LinearGradient id="paint0_linear" x1="150" y1="-58.6957" x2="150" y2="27" gradientUnits="userSpaceOnUse">
					<Stop stopColor="#1E1E1E" stopOpacity="0"/>
					<Stop offset="1" stopColor="#1E1E1E"/>
				</LinearGradient>
			</Defs>
		</Svg>
	);
}
