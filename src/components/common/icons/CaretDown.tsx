import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface CaretDownProps {
	width?: number;
	height?:  number;
}

export default function CaretDown(props: CaretDownProps) {
	const { width = 12, height = 7 } = props;

	return (
		<Svg width={width} height={height} viewBox="0 0 12 7" fill="none">
			<Path d="M11.9997 0.723444C11.9945 0.905222 11.9222 1.07775 11.7979 1.20448L6.47273 6.79515C6.34771 6.92632 6.17817 7 6.0014 7C5.82463 7 5.6551 6.92632 5.53008 6.79515L0.20491 1.20448C0.140943 1.14 0.0898733 1.06278 0.0546942 0.977331C0.019515 0.891882 0.000932693 0.799924 3.43323e-05 0.706843C-0.000864029 0.613763 0.0159407 0.521429 0.0494642 0.435249C0.0829878 0.34907 0.132555 0.270778 0.195267 0.204956C0.257977 0.139134 0.332571 0.0871072 0.414678 0.0519204C0.496784 0.0167336 0.584753 -0.000906467 0.673435 3.52859e-05C0.762117 0.000977516 0.84973 0.0204816 0.931141 0.0574055C1.01255 0.0943289 1.08613 0.14793 1.14755 0.21507L6.0014 5.31105L10.8553 0.21507C10.9489 0.113962 11.0694 0.0449038 11.2011 0.0169444C11.3328 -0.0110154 11.4694 0.00342941 11.5931 0.0583844C11.7169 0.11334 11.8219 0.206242 11.8944 0.324917C11.967 0.443592 12.0037 0.582502 11.9997 0.723444Z" fill="#737373"/>
		</Svg>
	);
}