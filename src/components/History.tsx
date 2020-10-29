import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, AppState } from 'react-native';
import colorConstants from '../constants/color';
import PageHeader from './PageHeader';
import * as ApiHelper from '../helpers/ApiHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DEFAULT_TOUCHABLE_OPACITY } from '../constants/config';
import HistoryItem from './HistoryItem';
import ShadowButton from './common/ShadowButton';
import { HistoryItemModel } from '../types/HistoryItemModel';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';

interface HistoryProps {
	navigation?: any;
	route?: any;
}

const CATEGORY_ALL = 'All Type';
const HISTORY_PAGE_FETCH_TIMESTAMP_KEY = 'historyDataFetchTimestamp';

export default function History(props: HistoryProps) {
	const authDispatch = useContext(AuthDispatchContext);

	const { params } = props.route;

	const [ historyMap, setHistoryMap ] = useState({});
	const [ historyCategories, setHistoryCategories ] = useState([]);
	const [ currentHistoryItems, setCurrentHistoryItems ] = useState([]);
	const [ currentCategory, setCurrentCategory ] = useState('');
	const [ allHistoryItems, setAllHistoryItems ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	let scrollViewRef;

	useEffect(() => {
		fetchHistory();

		AppState.addEventListener('change', fetchPageDataOnResume);

		const removeNavigationListener = props.navigation.addListener('focus', e => {
			fetchPageDataOnResume('active');
			scrollToTop();
		});

		return () => {
			AppState.removeEventListener('change', fetchPageDataOnResume);
			removeNavigationListener();
		};
	}, []);

	useEffect(() => {
		setHistoryItemsToShow();
		scrollToTop();
	}, [currentCategory]);

	const setHistoryItemsToShow = () => {
		if (currentCategory === CATEGORY_ALL) {
			setCurrentHistoryItems(allHistoryItems || []);
		} else {
			setCurrentHistoryItems(historyMap[currentCategory] || []);
		}
	};

	const fetchPageDataOnResume = async (nextAppState: string) => {
		const shouldRefresh = await UtilityHelper.shouldRefreshPageData(HISTORY_PAGE_FETCH_TIMESTAMP_KEY);

		if (nextAppState === 'active' && shouldRefresh) {
			fetchHistory();
		}
	};

	const fetchHistory = async () => {
		try {
			setLoading(true);

			const history = await ApiHelper.fetchHistory();

			await StorageHelper.setItem(HISTORY_PAGE_FETCH_TIMESTAMP_KEY, UtilityHelper.getTimestampString());
			setLoading(false);

			if (history.error) {
				return;
			}

			processHistoryData(history);
		} catch (e) {
			authDispatch({
				type: AuthActions.UPDATE_LOGIN_STATUS,
				isLoggedIn: false,
			});
		}
	};

	const processHistoryData = (historyResponse) => {
		const historyData = historyResponse.data || [];
		const types = [CATEGORY_ALL];

		const transformedHistoryData = historyData.reduce((acc, current) => {
			const { type } = current;

			if (types.indexOf(type) === -1) {
				types.push(type);
			}

			if (acc[type]) {
				acc[type].push(current);
			} else {
				acc[type] = [ current ];
			}

			return acc;
		}, {});

		setAllHistoryItems(historyData);
		setHistoryCategories(types);
		setHistoryMap(transformedHistoryData);

		if (currentCategory) {
			setCurrentHistoryItems(transformedHistoryData[currentCategory]);
		} else if (params && params.category && types.indexOf(params.category) > -1) {
			setCurrentCategory(params.category);
			setCurrentHistoryItems(transformedHistoryData[params.category]);
		} else {
			setCurrentCategory(CATEGORY_ALL);
			setCurrentHistoryItems(historyData);
		}
	};

	const scrollToTop = () => {
		setTimeout(() => {
			if (scrollViewRef) {
				scrollViewRef.scrollTo({ x: 0, y: 0, animated: true });
			}
		}, 10);
	};

	const handleStartShopping = () => {
		props.navigation.navigate('Categories');
	};

	const renderCategoryTypes = () => {
		return (
			<View style={{ marginVertical: 10 }}>
				<ScrollView
					contentContainerStyle={styles.categoryContainer}
					horizontal={true}
					showsHorizontalScrollIndicator={true}
					alwaysBounceHorizontal={true}
				>
					{historyCategories.map((category: string, index: number) => (
						<View key={category} style={styles.categoryItemContainer}>
							{category === currentCategory ? (
								<NeomorphFlex
									style={styles.selectedHistoryCategory} inner={true}
									darkShadowColor={colorConstants.SHADOW_DARK}
									lightShadowColor={colorConstants.SHADOW_LIGHT}
									>
									<Text style={styles.selectedHistoryCategoryText}>{category}</Text>
								</NeomorphFlex>
							) : (
								<TouchableOpacity
									activeOpacity={DEFAULT_TOUCHABLE_OPACITY}
									containerStyle={styles.historyCategory}
									onPress={() => setCurrentCategory(category)}
								>
									<Text style={styles.historyCategoryText}>{category}</Text>
								</TouchableOpacity>
							)}
						</View>
					))}
				</ScrollView>
			</View>
		);
	};

	if (!loading && allHistoryItems && allHistoryItems.length === 0) {
		return (
			<View style={styles.root}>
				<View style={styles.topSection}>
					<PageHeader title="History" />
				</View>

				<Text style={styles.emptyHistory}>Your History is clean!</Text>

				<ShadowButton
					buttonText="Start Shopping"
					disabled={false}
					onClick={handleStartShopping}
					style={styles.keepShopping}
				/>
			</View>
		);
	}

	return (
		<View style={styles.root}>
			<View style={styles.topSection}>
				<PageHeader title="History" />
			</View>

			{renderCategoryTypes()}

			<ScrollView
				contentContainerStyle={styles.containerStyle}
				ref={(ref) => scrollViewRef = ref}
			>
				{currentHistoryItems.map((historyItem: HistoryItemModel) => (
					<HistoryItem key={historyItem.createdOn + currentCategory} historyItem={historyItem} />
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
	topSection: {
		minHeight: 80,
		paddingTop: UtilityHelper.StatusBarHeight,
	},
	categoryContainer: {
		flexDirection: 'row',
		paddingHorizontal: 18,
	},
	categoryItemContainer: {
		justifyContent: 'center',
	},
	selectedHistoryCategory: {
		shadowRadius: 4,
		shadowOpacity: 0.8,
		flexDirection: 'row',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		backgroundColor: colorConstants.PRIMARY_LIGHT,
	},
	selectedHistoryCategoryText: {
		paddingHorizontal: 20,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 22,
		color: colorConstants.FONT_COLOR,
	},
	historyCategory: {
		height: 50,
		justifyContent: 'center',
	},
	historyCategoryText: {
		paddingHorizontal: 20,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 22,
		color: '#737373',
	},
	containerStyle: {
		flexGrow: 1,
		paddingBottom: 30,
	},
	emptyHistory: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		padding: 20,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 22,
		color: '#737373',
	},
	keepShopping: {
		paddingHorizontal: 20,
		paddingTop: 22,
		paddingBottom: 20,
	},
});
