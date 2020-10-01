import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SpinWheelIconProps {
	width?: number;
	height?: number;
}

export default function SpinWheelIcon(props: SpinWheelIconProps) {
	const { width = 22, height = 23 } = props;

	return (
		<Svg width={width} height={height} viewBox="0 0 22 23" fill="none">
			<Path d="M0 8.18871L3.19668 10.2238L0 12.2588V8.18871ZM10.274 10.9499L7.33621 18.0433C5.51169 17.1824 4.04316 15.7139 3.18214 13.8891L10.274 10.9499ZM11 11.2505L13.9409 18.3525C12.0416 19.0429 9.95951 19.0404 8.06182 18.3455L11 11.2505ZM14.6661 18.0484L11.726 10.9499L18.8245 13.8907C17.9633 15.718 16.493 17.1885 14.6661 18.05V18.0484ZM19.127 13.1653L12.0265 10.2238L19.127 7.2822C19.8147 9.18292 19.8147 11.2646 19.127 13.1653ZM11.726 9.4976L14.6661 2.39754C16.493 3.259 17.9633 4.72953 18.8245 6.55683L11.726 9.4976ZM11 9.197L8.06182 2.10205C9.95951 1.40713 12.0416 1.40462 13.9409 2.09498L11 9.197ZM7.33621 2.40422L10.274 9.49799L3.18214 6.5584C4.04286 4.73343 5.51148 3.26478 7.33621 2.40422ZM2.87846 7.28416L9.97346 10.2238L2.87846 13.1633C2.69587 12.6606 2.56079 12.1419 2.475 11.614L4.13836 10.5554C4.19417 10.5199 4.24013 10.4709 4.27197 10.4129C4.30381 10.355 4.32051 10.2899 4.32051 10.2238C4.32051 10.1576 4.30381 10.0925 4.27197 10.0346C4.24013 9.97658 4.19417 9.92759 4.13836 9.89211L2.475 8.83353C2.56079 8.3056 2.69587 7.78687 2.87846 7.28416ZM15.0786 22.012H6.92136L7.59118 20.6721C9.8052 21.4077 12.1972 21.4109 14.4131 20.6811L15.0786 22.012ZM11 20.4402C8.69205 20.4349 6.45363 19.6496 4.64799 18.2119C2.84234 16.7741 1.57543 14.7682 1.05286 12.5197L1.76 12.0694C2.21798 14.3647 3.51298 16.4077 5.39323 17.8011C7.27348 19.1945 9.6046 19.8388 11.9334 19.6086C14.2621 19.3785 16.4221 18.2904 17.9933 16.5559C19.5646 14.8213 20.4348 12.5644 20.4348 10.2238C20.4348 7.88315 19.5646 5.62618 17.9933 3.89166C16.4221 2.15713 14.2621 1.06902 11.9334 0.838865C9.6046 0.608711 7.27348 1.25297 5.39323 2.64638C3.51298 4.03979 2.21798 6.08276 1.76 8.37811L1.05286 7.9274C1.48524 6.05505 2.43692 4.34267 3.79857 2.987C5.16022 1.63133 6.8766 0.687349 8.75053 0.263521C10.6245 -0.160308 12.5799 -0.0467956 14.3922 0.591016C16.2046 1.22883 17.8002 2.36506 18.996 3.86919C20.1917 5.37332 20.9389 7.18432 21.1518 9.09413C21.3648 11.0039 21.0347 12.9351 20.1996 14.6657C19.3646 16.3964 18.0583 17.8563 16.431 18.8777C14.8037 19.8992 12.9212 20.4408 11 20.4402Z" fill="#D9B158"/>
		</Svg>
	);
}
