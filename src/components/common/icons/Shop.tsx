import React from 'react';
import { Svg, Mask, Path } from 'react-native-svg';
import colorConstants from '../../../constants/color';

interface ShopProps {
	size?: number;
	isActive?: boolean;
}

export default function Shop(props: ShopProps) {
	const { size = 18, isActive = false } = props;
	const fillColor = isActive ? colorConstants.WHITE : colorConstants.ICON_INACTIVE;

	return (
		<Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
			<Path d="M17.1 3.6H0.9C0.36 3.6 0 3.96 0 4.5V7.2C0 8.19 0.81 9 1.8 9C2.79 9 3.6 8.19 3.6 7.2C3.6 8.19 4.41 9 5.4 9C6.39 9 7.2 8.19 7.2 7.2C7.2 8.19 8.01 9 9 9C9.99 9 10.8 8.19 10.8 7.2C10.8 8.19 11.61 9 12.6 9C13.59 9 14.4 8.19 14.4 7.2C14.4 8.19 15.21 9 16.2 9C17.19 9 18 8.19 18 7.2V4.5C18 3.96 17.64 3.6 17.1 3.6ZM2.07 1.8H16.2C16.74 1.8 17.1 1.44 17.1 0.9C17.1 0.36 16.74 0 16.2 0H2.07C1.53 0 1.17 0.36 1.17 0.9C1.17 1.44 1.62 1.8 2.07 1.8ZM14.4 9C14.4 9.99 13.59 10.8 12.6 10.8C11.61 10.8 10.8 9.99 10.8 9C10.8 9.99 9.99 10.8 9 10.8C8.01 10.8 7.2 9.99 7.2 9C7.2 9.99 6.39 10.8 5.4 10.8C4.41 10.8 3.6 9.99 3.6 9C3.6 9.99 2.79 10.8 1.8 10.8V17.1C1.8 17.64 2.16 18 2.7 18H6.3V15.3C6.3 13.77 7.47 12.6 9 12.6C10.53 12.6 11.7 13.77 11.7 15.3V18H15.3C15.84 18 16.2 17.64 16.2 17.1V10.8C15.21 10.8 14.4 9.99 14.4 9Z" fill={fillColor}/>
		</Svg>
	);
}
