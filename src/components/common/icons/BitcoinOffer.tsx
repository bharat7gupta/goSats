import React from 'react';
import Svg, { G, Path, Defs, Rect } from 'react-native-svg';

interface BitcoinOfferProps {
	size?: number;
}

export default function BitcoinOffer(props: BitcoinOfferProps) {
	const { size = 12 } = props;

	return (
		<Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
			<Path d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#FFCB15"/>
			<Path d="M6.00002 11.0769C8.80393 11.0769 11.0769 8.8039 11.0769 5.99999C11.0769 3.19608 8.80393 0.923065 6.00002 0.923065C3.19611 0.923065 0.923096 3.19608 0.923096 5.99999C0.923096 8.8039 3.19611 11.0769 6.00002 11.0769Z" fill="#CA8D03"/>
			<Path d="M2.30769 5.53848H1.38461V6.46156H2.30769V5.53848Z" fill="#FFCB15"/>
			<Path d="M10.6154 5.53848H9.69229V6.46156H10.6154V5.53848Z" fill="#FFCB15"/>
		</Svg>
	);
}
