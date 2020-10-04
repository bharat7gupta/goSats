import React from 'react';
import { Image } from 'react-native';

interface DimStarProps {
	size?: number;
}

export default function DimStar(props: DimStarProps) {
	const { size = 12 } = props;

	return (
		<Image
			source={{ uri: 'https://res.cloudinary.com/dm5xyhl7v/image/upload/v1601829750/sats/dimstar_q4lbbb.png' }}
			style={{ width: size, height: size }}
		/>
	);
}
