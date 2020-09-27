import React from 'react';
import { Svg, Path, Defs, G, Circle, ClipPath, Rect } from 'react-native-svg';

interface WheelBoundaryProps {
	size?: number;
}

export default function WheelBoundary(props: WheelBoundaryProps) {
	const { size = 139 } = props;

	return (
		<Svg width="139" height="139" viewBox="0 0 139 139" fill="none">
			<G clipPath="url(#clip0)">
				<Path fillRule="evenodd" clipRule="evenodd" d="M33.3027 98.1562L29.2808 101.173L29.1887 101.617C16.9332 86.1844 14.107 64.363 23.7557 45.7655C36.8475 20.5315 68.0171 10.6565 93.2511 23.7484C118.485 36.8402 128.36 68.0098 115.268 93.2438C113.685 96.2957 111.83 99.1462 109.729 101.772L109.719 101.675L105.354 97.795C107.121 95.5496 108.687 93.1211 110.033 90.5276C121.631 68.173 112.89 40.5816 90.5349 28.9836C68.1803 17.3857 40.5889 26.127 28.9909 48.4816C20.3995 65.0412 22.9691 84.4745 33.9656 98.1515L33.3027 98.1562Z" fill="#C15812"/>
				<Circle cx="107.12" cy="100.379" r="3" fill="#C15812"/>
				<Circle cx="32.07" cy="100.329" r="2.95" fill="#C15812"/>
			</G>
			<G clipPath="url(#clip1)">
				<Path fillRule="evenodd" clipRule="evenodd" d="M109.417 102.157C111.647 99.4259 113.607 96.4457 115.268 93.2438C128.36 68.0098 118.485 36.8402 93.2511 23.7484C71.0598 12.2352 44.2781 18.484 29.238 37.3206L33.8844 40.9536C47.2113 24.3043 70.8943 18.7938 90.5349 28.9837C112.89 40.5816 121.631 68.173 110.033 90.5276C108.798 92.9088 107.376 95.1509 105.784 97.2398L109.179 100.028L109.417 102.157Z" fill="#F48634"/>
				<Circle cx="107.12" cy="100.379" r="3" fill="#F48634"/>
			</G>
			<G clipPath="url(#clip2)">
				<Path fillRule="evenodd" clipRule="evenodd" d="M109.418 102.157C111.647 99.4259 113.607 96.4457 115.268 93.2438C124.811 74.8506 122.151 53.3039 110.236 37.9032L106.185 42.3194C116.221 55.8959 118.323 74.5495 110.033 90.5276C108.798 92.9087 107.376 95.1508 105.784 97.2397L109.179 100.028L109.418 102.157Z" fill="#FFD3B6"/>
				<Circle cx="107.12" cy="100.379" r="3" fill="#FFD3B6"/>
			</G>
			<Defs>
				<ClipPath id="clip0">
					<Rect width="103.096" height="103.096" fill="white" transform="translate(91.5217 139) rotate(-152.579)"/>
				</ClipPath>
				<ClipPath id="clip1">
					<Rect width="103.096" height="103.096" fill="white" transform="translate(91.5217 139) rotate(-152.579)"/>
				</ClipPath>
				<ClipPath id="clip2">
					<Rect width="103.096" height="103.096" fill="white" transform="translate(91.5217 139) rotate(-152.579)"/>
				</ClipPath>
			</Defs>
		</Svg>

	);
}
