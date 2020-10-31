import React from 'react';
import { Svg, Path } from 'react-native-svg';
import colorConstants from '../../../constants/color';

interface UserIconProps {
	width?: number;
	height?: number;
	fillColor?: string;
}

export default function UserIcon(props: UserIconProps) {
	const { width = 16, height = 16, fillColor = colorConstants.WARM_GREY } = props;

	return (
		<Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
			<Path d="M8 8C5.87899 8.00194 3.84553 8.6949 2.34575 9.92686C0.845968 11.1588 0.00235684 12.8292 0 14.5714V15.1429C0.000313007 15.3701 0.110351 15.588 0.305974 15.7487C0.501596 15.9094 0.766827 15.9997 1.04348 16H14.9565C15.2332 15.9997 15.4984 15.9094 15.694 15.7487C15.8896 15.588 15.9997 15.3701 16 15.1429V14.5714C15.9976 12.8292 15.154 11.1588 13.6543 9.92686C12.1545 8.6949 10.121 8.00194 8 8Z" fill={fillColor} />
			<Path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill={fillColor} />
		</Svg>
	);
}
