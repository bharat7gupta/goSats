import * as React from 'react';
import Svg, { Path, Defs, Pattern, Use, Image } from 'react-native-svg';

export default function GoogleIcon() {
	return (
		<Svg width={50} height={47} viewBox="0 0 50 47" fill="none">
			<Path fill="url(#pattern0)" d="M0 0H50V47H0z" />
			<Defs>
				<Pattern
					id="pattern0"
					patternContentUnits="objectBoundingBox"
					width={1}
					height={1}
				>
					<Use xlinkHref="#image0" transform="matrix(.01 0 0 .01064 0 -.043)" />
				</Pattern>
				<Image
				id="image0"
				width={100}
				height={102}
				xlinkHref="data:image/png;base64,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"
				/>
			</Defs>
		</Svg>
	);
}
