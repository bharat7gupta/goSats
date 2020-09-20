import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ChevronLeftProps {
	size?: number;
}

export default function ChevronLeft(props: ChevronLeftProps) {
	const { size = 22 } = props;

	return (
		<Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
			<Path d="M13.75 16.5L8.25 11L13.75 5.5" stroke="white" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</Svg>
	);
}
