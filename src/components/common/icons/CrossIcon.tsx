import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface CrossIconProps {
	size?: number;
}

export default function CrossIcon(props: CrossIconProps) {
	const { size = 14 } = props;

	return (
		<Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
			<Path d="M13 13L7 7L13 1" stroke="#939393" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			<Path d="M1 13L7 7L1 1" stroke="#939393" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</Svg>
	);
}
