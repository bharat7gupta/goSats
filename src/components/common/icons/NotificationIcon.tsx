import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface NotificationIconProps {
	size?: number;
	dotRadius?: number;
}

export default function NotificationIcon(props: NotificationIconProps) {
	const { size = 16, dotRadius = 2.61111  } = props;

	return (
		<Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
			<Path d="M14.2353 10.6141C13.6603 10.3035 13.3018 9.70213 13.3018 9.04803V8.00823V5.55546C13.3018 3.07874 11.5999 0.755822 9.30648 0.171943C9.30648 0.171943 8.80002 0 8 0C7.20312 0 6.69819 0.171943 6.69819 0.171943C4.40712 0.758157 2.66667 3.08107 2.66667 5.55779V8.00823V9.05509C2.66667 9.70664 2.31093 10.3062 1.73931 10.6178L0 11.5663V13.347H16V11.5674L14.2353 10.6141ZM6.22222 14.4332C6.22222 15.2983 7.0172 16 8 16C8.9828 16 9.77778 15.2995 9.77778 14.4332V14.2368H6.22222V14.4332Z" fill="#D0D0D0"/>
			<Circle cx="12.8889" cy="3.11111" r={dotRadius} fill="#C2622D" stroke="#151515"/>
		</Svg>
	);
}
