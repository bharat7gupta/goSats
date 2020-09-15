import React from 'react';
import { View } from 'react-native';

import HotDeals from './HotDeals';
import HomePageActions from './HomePageActions';
import BottomMenu from './common/BottomMenu';

export default function Home() {

	return (
		<View style={{ flex: 1 }}>
			<HomePageActions />
			<HotDeals />
			<BottomMenu />
		</View>
	);
}
