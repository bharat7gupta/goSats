import React from 'react';
import { Image } from 'react-native';

interface DimStarProps {
	size?: number;
}

export default function DimStar(props: DimStarProps) {
	const { size = 12 } = props;

	return (
		<Image
			source={require('../../../assets/images/dimstar.png')}
			style={{ width: size, height: size }}
		/>
	);
}
