import React from 'react';
import { View, StyleSheet } from 'react-native';

import HotDeals from './HotDeals';
import HomePageActions from './HomePageActions';

export default function Home() {

	return (
		<React.Fragment>
			<HomePageActions />
			<HotDeals />
		</React.Fragment>
	);
}
