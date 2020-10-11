import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ShareIconProps {
	size?: number;
}

export default function ShareIcon(props: ShareIconProps) {
	const { size = 16 } = props;

	return (
		<Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
			<Path d="M16 7.99458L9.35071 0V4.76971H7.93701C3.55347 4.76971 0 8.66595 0 13.4723V16L0.62793 15.2455C2.76282 12.6808 5.78357 11.2194 8.95056 11.2194H9.35071V15.9892L16 7.99458Z" fill="#737373"/>
		</Svg>
	);
}
