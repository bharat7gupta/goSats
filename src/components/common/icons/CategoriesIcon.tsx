import React from 'react';
import Svg, { Path } from 'react-native-svg';
import colorConstants from '../../../constants/color';

interface CategoriesIconProps {
	size?: number;
	isActive?: boolean;
}

export default function CategoriesIcon(props: CategoriesIconProps) {
	const { size = 18, isActive = false } = props;
	const fillColor = isActive ? colorConstants.WHITE : colorConstants.ICON_INACTIVE;

	return (
		<Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
			<Path d="M8.25008 6.75C8.25008 7.57485 7.57463 8.25008 6.75 8.25008H1.50008C0.675225 8.25008 0 7.57485 0 6.75V1.50008C0 0.675225 0.675225 0 1.50008 0H6.75C7.57463 0 8.25008 0.675225 8.25008 1.50008V6.75Z" fill={fillColor}/>
			<Path d="M8.25008 16.4999C8.25008 17.3248 7.57463 18 6.75 18H1.50008C0.675225 18 0 17.3248 0 16.4999V11.25C0 10.4254 0.675225 9.75015 1.50008 9.75015H6.75C7.57463 9.75015 8.25008 10.4254 8.25008 11.25V16.4999Z" fill={fillColor}/>
			<Path d="M9.74992 0H13.5V1.50008H9.74992V0Z" fill={fillColor}/>
			<Path d="M9.74992 6.00006H15.0001V7.50014H9.74992V6.00006Z" fill={fillColor}/>
			<Path d="M9.74992 2.99994H18V4.50001H9.74992V2.99994Z" fill={fillColor}/>
			<Path d="M9.74992 9.75015H18V11.25H9.74992V9.75015Z" fill={fillColor}/>
			<Path d="M9.74992 15.75H15.0001V17.2501H9.74992V15.75Z" fill={fillColor}/>
			<Path d="M9.74992 12.7501H13.5V14.2499H9.74992V12.7501Z" fill={fillColor}/>
		</Svg>
	);
}
