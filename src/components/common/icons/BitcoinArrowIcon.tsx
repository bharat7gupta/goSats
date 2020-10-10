import React from 'react';
import { Svg, Path, G, LinearGradient, Defs, Stop } from 'react-native-svg';
import { ViewStyle } from 'react-native';

interface BitcoinArrowIconProps {
	size?: number;
	style?: ViewStyle;
}

export default function BitcoinArrowIcon(props: BitcoinArrowIconProps) {
	const { size = 22, style } = props;

	return (
		<Svg width={56} height={73} viewBox="0 0 56 73" fill="none" {...props} style={style}>
		  <G filter="url(#filter0_d)">
			<Path
			  d="M49.657 40.851c0 11.961-9.696 21.657-21.657 21.657-11.96 0-21.657-9.696-21.657-21.657C6.343 28.891 28 2.35 28 2.35S49.657 28.89 49.657 40.85z"
			  fill="url(#paint0_linear)"
			/>
		  </G>
		  <Path
			d="M28 55.4c7.419 0 13.433-6.014 13.433-13.433 0-7.42-6.014-13.434-13.433-13.434s-13.433 6.015-13.433 13.434S20.58 55.4 28 55.4z"
			fill="#FFCB15"
		  />
		  <Path
			d="M28 53.334c6.278 0 11.367-5.09 11.367-11.367 0-6.277-5.09-11.366-11.367-11.366-6.277 0-11.367 5.089-11.367 11.366 0 6.278 5.09 11.367 11.367 11.367z"
			fill="#CA8D03"
		  />
		  <Path
			d="M19.733 40.934h-2.066V43h2.066v-2.066zM38.334 40.934h-2.066V43h2.066v-2.066zM30.624 43.017H25.9a1.05 1.05 0 01-1.05-1.05V37.77a1.05 1.05 0 011.05-1.05h4.723a2.89 2.89 0 012.624 3.15 2.89 2.89 0 01-2.624 3.148zm-3.673-2.1h3.673c.184 0 .525-.398.525-1.049 0-.65-.34-1.05-.525-1.05H26.95v2.1z"
			fill="#FFCB15"
		  />
		  <Path
			d="M30.615 47.23h-.024l-4.723-.047a1.05 1.05 0 01-1.039-1.06l.042-4.198a1.06 1.06 0 011.06-1.039l4.723.047a2.891 2.891 0 012.593 3.175 3.534 3.534 0 01-.693 2.107 2.457 2.457 0 01-1.939 1.015zm-3.673-2.136l3.673.037a.419.419 0 00.273-.192 1.44 1.44 0 00.26-.85c.006-.654-.33-1.05-.515-1.057l-3.673-.037-.018 2.099zM26.95 34.62h-2.098v3.149h2.099V34.62zM30.1 34.62H28v3.149h2.1V34.62z"
			fill="#FFCB15"
		  />
		  <Path
			d="M26.95 46.165h-2.098v3.148h2.099v-3.148zM30.1 46.165H28v3.148h2.1v-3.148zM25.901 36.72h-3.148v2.099H25.9v-2.1z"
			fill="#FFCB15"
		  />
		  <Path
			d="M22.757 45.109l-.01 2.099 3.15.014.008-2.099-3.148-.014z"
			fill="#FFCB15"
		  />
		  <Defs>
			<LinearGradient
			  id="paint0_linear"
			  x1={38.7816}
			  y1={59.6376}
			  x2={11.2796}
			  y2={12.0027}
			  gradientUnits="userSpaceOnUse"
			>
			  <Stop stopColor="#FF961B" />
			  <Stop offset={0.5625} stopColor="#FFBE16" />
			  <Stop offset={1} stopColor="#F29100" />
			</LinearGradient>
		  </Defs>
		</Svg>
	  );
}
