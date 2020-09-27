import React from 'react';
import { Svg, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

interface CupProps {
	width?: number;
	height?: number;
}

export default function Cup(props: CupProps) {
	const { width = 69, height = 57 } = props;

	return (
		<Svg width={width} height={height} viewBox="0 0 69 57" fill="none">
			<Path d="M57.3006 43.8869V45.9453C57.3006 47.2747 55.1421 48.3991 52.1475 48.7923C51.3639 48.8956 50.5744 48.9465 49.7841 48.9447C47.4589 48.9447 45.3815 48.5254 44.0044 47.8631C42.9181 47.3438 42.2677 46.6767 42.2677 45.9453V44.0298H42.332L43.9234 44.0132H44.0378C44.1545 43.9584 44.2784 43.9036 44.4047 43.8535C44.631 43.7582 44.874 43.6725 45.1289 43.5915C45.3076 43.5343 45.4934 43.4819 45.684 43.4342C47.0247 43.0992 48.4023 42.9351 49.7841 42.9458C49.9056 42.9458 50.0271 42.9458 50.1486 42.9482C51.4099 42.9647 52.665 43.127 53.889 43.4318C54.0796 43.4819 54.2606 43.5343 54.4369 43.5891C54.4679 43.5986 54.4965 43.6081 54.5251 43.6177C54.749 43.6915 54.9634 43.7701 55.1659 43.8535C55.2088 43.8702 55.2517 43.8893 55.2922 43.9059L55.6329 43.9036L57.2744 43.8869L57.3006 43.8869Z" fill="#F4AC37"/>
			<Path d="M57.3006 44.0703C57.3006 45.6022 54.4298 46.8625 50.718 47.0459C50.4131 47.0626 50.101 47.0698 49.7841 47.0698C47.4589 47.0698 45.3814 46.6505 44.0044 45.9882C42.9181 45.4688 42.2676 44.7993 42.2676 44.0703C42.2672 44.0568 42.268 44.0432 42.27 44.0298C42.2705 43.9682 42.2769 43.9068 42.2891 43.8464C42.3716 43.4847 42.5668 43.1585 42.8466 42.9149C42.9455 42.8216 43.0497 42.7341 43.1587 42.6528C43.4248 42.4606 43.7079 42.2932 44.0044 42.1525C44.37 41.9798 44.7473 41.8333 45.1337 41.7141C45.391 41.6331 45.6626 41.5593 45.9484 41.4902C46.1795 41.4354 46.4178 41.3854 46.6655 41.3401C47.6951 41.1584 48.7387 41.0683 49.7841 41.0709C50.1653 41.0709 50.5393 41.0828 50.9038 41.1042C51.5736 41.1425 52.2403 41.2221 52.9003 41.3425C53.1457 41.3854 53.3839 41.4354 53.615 41.4902C53.9009 41.5569 54.1749 41.6331 54.4345 41.7141C54.4655 41.7237 54.4965 41.7332 54.5251 41.7427C54.8806 41.8576 55.2283 41.9953 55.5662 42.1549C55.8631 42.2924 56.1457 42.4592 56.4095 42.6528C56.5188 42.7347 56.6238 42.8222 56.724 42.9149C57.0043 43.162 57.1994 43.4914 57.2815 43.8559C57.2839 43.8654 57.2839 43.875 57.2863 43.8869C57.2959 43.9475 57.3006 44.0089 57.3006 44.0703Z" fill="#F4C43A"/>
			<Path d="M49.7848 46.4109C53.0236 46.4109 55.6493 45.3631 55.6493 44.0706C55.6493 42.778 53.0236 41.7302 49.7848 41.7302C46.5459 41.7302 43.9203 42.778 43.9203 44.0706C43.9203 45.3631 46.5459 46.4109 49.7848 46.4109Z" fill="#F4AC37"/>
			<Path d="M57.3006 41.5783V43.6367C57.3001 43.7102 57.2938 43.7835 57.2815 43.8559C57.2791 43.8655 57.2767 43.875 57.2744 43.8869C56.9766 45.3306 54.1153 46.4837 50.5084 46.6219C50.2701 46.6314 50.0271 46.6362 49.7841 46.6362C47.4589 46.6362 45.3815 46.2145 44.0044 45.5546C43.1158 45.1281 42.5202 44.604 42.332 44.0298C42.3118 43.9702 42.2975 43.9088 42.2891 43.8464C42.2748 43.7774 42.2676 43.7072 42.2677 43.6367V41.7189H42.3654L43.9234 41.7022H44.0378C44.1903 41.6308 44.3499 41.5617 44.5166 41.4974C44.7168 41.4164 44.9288 41.3425 45.1504 41.2734C45.3648 41.2067 45.5911 41.1424 45.8246 41.0852C47.1216 40.7772 48.451 40.626 49.7841 40.6349C50.263 40.6349 50.7323 40.654 51.185 40.6873C52.0474 40.7486 52.9033 40.8816 53.7437 41.0852C53.9748 41.1447 54.1987 41.2067 54.4107 41.2734L54.5251 41.3091C54.7085 41.3687 54.8848 41.433 55.0516 41.4997C55.135 41.5307 55.2136 41.5641 55.2922 41.5974L55.6329 41.595L57.2505 41.5784L57.3006 41.5783Z" fill="#F4AC37"/>
			<Path d="M57.3006 41.7594C57.2888 41.9812 57.2315 42.1982 57.1323 42.397C57.0331 42.5958 56.8942 42.772 56.7241 42.9149C56.3792 43.2271 55.9887 43.4849 55.5662 43.6796C55.4376 43.7392 55.3042 43.7987 55.166 43.8535C53.8557 44.3919 52.045 44.7326 50.0319 44.7588C49.9509 44.7612 49.8675 44.7612 49.7841 44.7612C47.6733 44.7612 45.7674 44.4134 44.4047 43.8535C44.2665 43.7987 44.1331 43.7392 44.0045 43.6772C43.5811 43.4851 43.1904 43.2278 42.8466 42.9149C42.6756 42.7726 42.5359 42.5966 42.4362 42.3977C42.3366 42.1988 42.2792 41.9815 42.2677 41.7594C42.2672 41.7459 42.268 41.7323 42.2701 41.7189C42.2705 41.6427 42.2793 41.5668 42.2963 41.4926C42.3957 41.127 42.6053 40.8009 42.8966 40.5587C42.9834 40.4786 43.0748 40.4038 43.1706 40.3347C43.4428 40.1375 43.7331 39.9668 44.0378 39.8249C44.3991 39.6571 44.7717 39.5146 45.1527 39.3985C45.5981 39.2603 46.0506 39.1465 46.5083 39.0578C46.5703 39.0482 46.6322 39.0363 46.6965 39.0244C48.739 38.6718 50.8268 38.6718 52.8693 39.0244C52.9289 39.0363 52.9884 39.0458 53.0456 39.0578C53.0504 39.0578 53.0528 39.0578 53.0552 39.0601C53.5126 39.1459 53.9644 39.2589 54.4084 39.3985C54.4489 39.408 54.487 39.4223 54.5251 39.4342C54.8679 39.5446 55.2036 39.6759 55.5305 39.8273C55.8359 39.9692 56.127 40.1399 56.4 40.3371C56.4963 40.4054 56.5879 40.4803 56.674 40.5611C56.9661 40.8032 57.1752 41.1305 57.272 41.4973C57.2791 41.5239 57.2839 41.551 57.2863 41.5783C57.2959 41.6382 57.3007 41.6988 57.3006 41.7594Z" fill="#F4C43A"/>
			<Path d="M49.7848 44.1009C53.0236 44.1009 55.6493 43.0531 55.6493 41.7606C55.6493 40.468 53.0236 39.4202 49.7848 39.4202C46.5459 39.4202 43.9203 40.468 43.9203 41.7606C43.9203 43.0531 46.5459 44.1009 49.7848 44.1009Z" fill="#F4AC37"/>
			<Path d="M57.3006 39.1769V41.2329C57.3005 41.3218 57.2909 41.4105 57.272 41.4973C57.2648 41.5235 57.2601 41.5497 57.2505 41.5783C57.0945 42.0184 56.7993 42.3957 56.4095 42.6528C56.0644 42.9011 55.6919 43.109 55.2994 43.2722C55.0179 43.3935 54.73 43.4993 54.4369 43.5891C52.9993 44.0158 51.5076 44.2324 50.0081 44.2323C49.9342 44.2347 49.8604 44.2347 49.7841 44.2347C48.2091 44.2525 46.6401 44.0357 45.1289 43.5915C44.8379 43.4995 44.5516 43.3929 44.2713 43.2722C44.1784 43.2317 44.0902 43.1912 44.0044 43.1507C43.7077 43.0114 43.4245 42.8447 43.1587 42.6528C42.8153 42.4183 42.5413 42.0957 42.3654 41.7189C42.3344 41.6461 42.3113 41.5702 42.2963 41.4926C42.2772 41.4073 42.2676 41.3202 42.2677 41.2329V39.3174H42.3368L43.9234 39.3008H44.0378C44.1593 39.2436 44.2856 39.1864 44.419 39.134C44.7404 39.0038 45.0689 38.8916 45.4029 38.7981C45.5006 38.7671 45.603 38.7409 45.7055 38.7147C47.0396 38.3848 48.4098 38.2231 49.7841 38.2335C51.1386 38.2243 52.4892 38.3811 53.8056 38.7004C53.827 38.7052 53.8461 38.7099 53.8652 38.7147C53.9652 38.7433 54.0653 38.7695 54.1606 38.7957C54.2845 38.8314 54.406 38.8696 54.5251 38.9077C54.7419 38.9792 54.9492 39.053 55.1469 39.1364C55.1969 39.1554 55.2446 39.1745 55.2922 39.1959L55.6329 39.1936L57.272 39.1769L57.3006 39.1769Z" fill="#F4AC37"/>
			<Path d="M57.3006 39.3579C57.2865 39.5913 57.2235 39.819 57.1155 40.0263C57.0076 40.2336 56.8571 40.4158 56.674 40.5611C56.3314 40.8593 55.9469 41.1058 55.5328 41.2925C55.3804 41.3639 55.2207 41.433 55.0516 41.4997C54.8562 41.576 54.6513 41.6474 54.4345 41.7141C53.9306 41.8708 53.4174 41.9957 52.8979 42.0882C52.045 42.2409 51.1816 42.3277 50.3154 42.3479C50.1415 42.355 49.9628 42.3574 49.7841 42.3574C48.741 42.3612 47.6996 42.2711 46.6727 42.0882C46.152 41.9977 45.6378 41.8728 45.1337 41.7141C44.9193 41.6474 44.712 41.576 44.5166 41.4973C44.3499 41.433 44.1902 41.3639 44.0402 41.2925C44.0282 41.2877 44.0163 41.2805 44.0044 41.2758C43.6016 41.0931 43.2282 40.8514 42.8966 40.5587C42.7127 40.4145 42.5615 40.2329 42.4531 40.0259C42.3446 39.8189 42.2814 39.5912 42.2676 39.3579C42.2672 39.3444 42.268 39.3308 42.27 39.3174C42.2705 39.2535 42.2769 39.1897 42.2891 39.1269C42.3745 38.7647 42.5721 38.4387 42.8537 38.1954C42.9848 38.0719 43.1258 37.9596 43.2754 37.8594C43.5081 37.699 43.7535 37.558 44.0092 37.4377C44.4592 37.2265 44.9262 37.0535 45.4053 36.9208C45.9553 36.7649 46.5147 36.6439 47.0801 36.5586C48.8721 36.2918 50.6937 36.2918 52.4857 36.5586C53.0526 36.6442 53.6136 36.7651 54.1653 36.9208C54.2892 36.9565 54.4083 36.9922 54.5251 37.0304C54.879 37.1444 55.2252 37.2813 55.5614 37.4401C55.817 37.5596 56.0624 37.6998 56.2952 37.8594C56.4438 37.9609 56.5847 38.0732 56.7169 38.1954C56.7788 38.2573 56.836 38.3168 56.8908 38.3788C57.086 38.5918 57.2202 38.8535 57.2791 39.1364V39.1412C57.2838 39.1525 57.2862 39.1646 57.2863 39.1769C57.2959 39.2368 57.3006 39.2973 57.3006 39.3579Z" fill="#F4C43A"/>
			<Path d="M49.7848 41.6991C53.0236 41.6991 55.6493 40.6513 55.6493 39.3587C55.6493 38.0662 53.0236 37.0183 49.7848 37.0183C46.5459 37.0183 43.9203 38.0662 43.9203 39.3587C43.9203 40.6513 46.5459 41.6991 49.7848 41.6991Z" fill="#F4AC37"/>
			<Path d="M57.3006 36.8517V38.9101C57.3006 38.986 57.2935 39.0618 57.2791 39.1364V39.1412L57.272 39.1769C57.129 39.6552 56.8198 40.0667 56.4 40.3371C56.0553 40.5847 55.6827 40.791 55.2898 40.9518C55.0028 41.0746 54.7093 41.182 54.4107 41.2734C54.1582 41.3544 53.8937 41.4259 53.615 41.4902C52.9132 41.654 52.2007 41.7679 51.4828 41.8309C51.1588 41.8618 50.8276 41.8833 50.4893 41.8952C50.2558 41.9047 50.0224 41.9095 49.7841 41.9095C49.1981 41.9095 48.6263 41.8833 48.0783 41.8309C47.3612 41.7677 46.6495 41.6538 45.9485 41.4902C45.6697 41.4235 45.4053 41.352 45.1504 41.2734C44.8407 41.1757 44.5476 41.0685 44.2808 40.9541C44.1855 40.9113 44.0926 40.8708 44.0044 40.8279C43.7117 40.69 43.4325 40.5249 43.1706 40.3347C42.7954 40.0886 42.5044 39.7337 42.3368 39.3175C42.315 39.2555 42.2991 39.1917 42.2891 39.1269C42.2748 39.0555 42.2676 38.9829 42.2677 38.9101V36.9946H42.27L42.4368 36.9922L43.9234 36.9779H44.0378C44.2474 36.8779 44.4761 36.785 44.7168 36.6968C45.1657 36.534 45.6249 36.4011 46.0914 36.299C46.8787 36.1232 47.6784 36.0085 48.4833 35.9559C48.5429 35.9511 48.6048 35.9464 48.6668 35.944C48.8764 35.9321 49.0908 35.9226 49.3076 35.9178C49.3696 35.9154 49.4315 35.913 49.4935 35.913C49.5697 35.9107 49.6483 35.9107 49.7269 35.9107H49.9104C50.1272 35.913 50.3416 35.9178 50.5536 35.9273C50.6156 35.9297 50.6775 35.9321 50.7395 35.9345C51.6614 35.9775 52.578 36.0994 53.4792 36.299C53.8485 36.3823 54.1987 36.4776 54.5251 36.5825C54.637 36.6206 54.7466 36.6587 54.8515 36.6992C55.0039 36.7516 55.1516 36.8112 55.2922 36.8707L55.6329 36.8683L57.2005 36.8517L57.3006 36.8517Z" fill="#F4AC37"/>
			<Path d="M57.3016 37.0349C57.3016 38.6923 53.9357 40.0348 49.7842 40.0348C47.4594 40.0348 45.3808 39.614 44.0033 38.9526C42.9189 38.4328 42.2668 37.7646 42.2668 37.0349C42.2668 35.3782 45.6327 34.035 49.7842 34.035C51.3892 34.0156 52.9877 34.2424 54.5239 34.7078C56.2191 35.2567 57.3016 36.0952 57.3016 37.0349Z" fill="#F4C43A"/>
			<Path d="M49.7848 39.3756C53.0236 39.3756 55.6493 38.3278 55.6493 37.0352C55.6493 35.7427 53.0236 34.6949 49.7848 34.6949C46.5459 34.6949 43.9203 35.7427 43.9203 37.0352C43.9203 38.3278 46.5459 39.3756 49.7848 39.3756Z" fill="#F4AC37"/>
			<Path d="M55.2923 34.3195C55.0528 34.2167 54.7973 34.1199 54.5239 34.0314C52.9877 33.5661 51.3892 33.3392 49.7842 33.3587C47.4791 33.3587 45.4174 33.7732 44.0384 34.4251L42.2668 34.4417V36.3586C42.2668 37.0883 42.9189 37.7565 44.0033 38.2762C45.3808 38.9377 47.4594 39.3584 49.7842 39.3584C53.9357 39.3584 57.3016 38.016 57.3016 36.3586V34.3007L55.2923 34.3195Z" fill="#F4AC37"/>
			<Path d="M57.3016 34.483C57.3016 36.1404 53.9357 37.4828 49.7842 37.4828C47.4594 37.4828 45.3808 37.0621 44.0033 36.4006C42.9189 35.8809 42.2668 35.2127 42.2668 34.483C42.2668 32.8263 45.6327 31.4831 49.7842 31.4831C51.3892 31.4636 52.9877 31.6905 54.5239 32.1558C56.2191 32.7048 57.3016 33.5433 57.3016 34.483Z" fill="#F4C43A"/>
			<Path d="M49.7848 36.8238C53.0236 36.8238 55.6493 35.776 55.6493 34.4834C55.6493 33.1909 53.0236 32.1431 49.7848 32.1431C46.5459 32.1431 43.9203 33.1909 43.9203 34.4834C43.9203 35.776 46.5459 36.8238 49.7848 36.8238Z" fill="#F4AC37"/>
			<Path d="M52.4905 34.6289C52.3511 34.5604 52.2039 34.5092 52.0521 34.4764C51.9067 34.4435 51.7596 34.4188 51.6114 34.4026C51.8259 34.3657 52.0338 34.2975 52.2284 34.2001C52.2451 34.1905 52.2594 34.181 52.2737 34.1715C52.3329 34.1438 52.3841 34.1015 52.4224 34.0485C52.4607 33.9956 52.485 33.9338 52.4929 33.8689C52.4929 33.7546 52.4095 33.6426 52.2451 33.5378C52.2356 33.533 52.2261 33.5259 52.2165 33.5211C52.0128 33.41 51.791 33.3358 51.5614 33.3019C51.2894 33.259 51.0147 33.2351 50.7394 33.2304V32.9183H49.9104V33.2257H49.4935V32.9183H48.6668V33.2257H47.3922V33.5211H48.0426V35.4413H47.3922V35.7391H48.6668V36.0488H49.4935V35.7391H49.9104V36.0488H50.7394V35.7367C51.0134 35.732 51.2541 35.7177 51.4613 35.6962C51.6942 35.6769 51.9248 35.6354 52.1498 35.5723C52.3167 35.5248 52.4728 35.4455 52.6096 35.3389C52.6622 35.3041 52.7063 35.258 52.7389 35.204C52.7715 35.15 52.7916 35.0895 52.7978 35.0268V35.0101C52.7978 34.8648 52.6954 34.7385 52.4905 34.6289ZM48.8764 33.5235H50.1343C50.454 33.5177 50.7737 33.5297 51.092 33.5592C51.2428 33.5697 51.3893 33.6136 51.5209 33.6879C51.5632 33.7085 51.5996 33.7397 51.6263 33.7786C51.653 33.8174 51.6692 33.8625 51.6734 33.9094C51.6704 33.9542 51.6553 33.9974 51.6297 34.0343C51.6041 34.0713 51.5689 34.1005 51.528 34.1191C51.5233 34.1214 51.5161 34.1262 51.5113 34.1286C51.3605 34.1985 51.1983 34.2404 51.0325 34.2525C50.8307 34.2729 50.6278 34.2817 50.425 34.2787C50.3154 34.2811 50.1915 34.2811 50.0533 34.2811H48.8764L48.8764 33.5235ZM48.8764 35.4413V34.5789H50.3321C50.6399 34.5748 50.9477 34.5883 51.2541 34.6194C51.3671 34.6347 51.4786 34.6594 51.5876 34.6932C51.6457 34.7117 51.7016 34.7364 51.7543 34.7671C51.7931 34.7898 51.8291 34.817 51.8616 34.8481C51.8844 34.8685 51.9027 34.8935 51.9154 34.9214C51.9281 34.9492 51.9349 34.9794 51.9354 35.0101C51.9333 35.0531 51.9207 35.0948 51.8987 35.1318C51.8766 35.1688 51.8459 35.1998 51.8091 35.2221C51.7138 35.2894 51.6061 35.3372 51.4923 35.3627C51.3339 35.3983 51.173 35.4214 51.011 35.4318C50.9348 35.4365 50.8228 35.4389 50.6704 35.4389C50.5655 35.4413 50.4297 35.4413 50.2606 35.4413L48.8764 35.4413Z" fill="#CC903A"/>
			<Path d="M52.612 34.9863C52.6025 34.8505 52.4977 34.7337 52.3071 34.6289C52.1675 34.5608 52.0204 34.5096 51.8687 34.4764C51.7233 34.4435 51.5762 34.4188 51.428 34.4026C51.6562 34.3668 51.8764 34.291 52.0784 34.1786C52.0831 34.1762 52.0855 34.1739 52.0903 34.1715C52.1492 34.1437 52.2001 34.1014 52.238 34.0484C52.276 33.9954 52.2997 33.9337 52.3071 33.8689C52.3071 33.7546 52.2261 33.6426 52.0617 33.5378C52.0347 33.5205 52.0069 33.5046 51.9783 33.4901C51.7883 33.3987 51.5861 33.3353 51.3779 33.3019C51.1052 33.2589 50.8297 33.2351 50.5536 33.2304V32.9183H49.7269V33.2257H49.3076V32.9183H48.4833V33.2257H47.2064V33.5211H47.8591V35.4413H47.2064V35.7391H48.4833V36.0488H49.3076V35.7391H49.7269V36.0488H50.5536V35.7367C50.83 35.732 51.0706 35.7177 51.2755 35.6962C51.5085 35.6774 51.7391 35.6359 51.964 35.5723C52.1318 35.5253 52.2888 35.446 52.4262 35.3389C52.4807 35.3022 52.526 35.2534 52.5587 35.1964C52.5913 35.1394 52.6104 35.0757 52.6144 35.0101C52.6148 35.0021 52.614 34.994 52.612 34.9863ZM48.693 33.5235H49.9509C50.2697 33.5177 50.5887 33.5296 50.9062 33.5592C51.0578 33.5693 51.2051 33.6133 51.3374 33.6879C51.3795 33.7086 51.4155 33.7399 51.4419 33.7787C51.4682 33.8176 51.4839 33.8626 51.4875 33.9094C51.4866 33.9493 51.475 33.9881 51.4541 34.022C51.4332 34.0559 51.4036 34.0837 51.3684 34.1024C51.3558 34.1125 51.3423 34.1213 51.3279 34.1286C51.177 34.1982 51.0148 34.2401 50.849 34.2525C50.7082 34.2686 50.5667 34.2774 50.425 34.2787C50.3154 34.2811 50.1915 34.2811 50.0533 34.2811H48.693V33.5235ZM50.2606 35.4413H48.693V34.5789H50.1486C50.4565 34.5748 50.7643 34.5883 51.0706 34.6194C51.1835 34.6352 51.2951 34.6599 51.4041 34.6932C51.4619 34.7126 51.5177 34.7373 51.5709 34.7671C51.596 34.7818 51.6199 34.7985 51.6424 34.8171C51.6743 34.8386 51.7009 34.8672 51.7199 34.9007C51.7389 34.9342 51.7499 34.9716 51.752 35.0101C51.7493 35.0529 51.7365 35.0945 51.7145 35.1314C51.6926 35.1683 51.6621 35.1994 51.6257 35.2221C51.5295 35.2894 51.421 35.3371 51.3065 35.3627C51.1489 35.3983 50.9888 35.4214 50.8276 35.4318C50.7871 35.4342 50.7347 35.4365 50.6704 35.4389C50.5655 35.4413 50.4297 35.4413 50.2606 35.4413Z" fill="#FFD660"/>
			<Path opacity="0.25" d="M57.2791 39.1364V39.1412C57.2838 39.1525 57.2862 39.1646 57.2863 39.1769H57.3006V41.2329C57.3005 41.3218 57.2909 41.4105 57.272 41.4973C57.279 41.5239 57.2838 41.551 57.2863 41.5783H57.3006V43.6367C57.3001 43.7102 57.2938 43.7835 57.2815 43.8559C57.2839 43.8655 57.2839 43.875 57.2863 43.8869H57.3006V45.9453C57.3006 47.2747 55.1421 48.3991 52.1474 48.7923C51.8666 48.5622 51.6088 48.3053 51.3779 48.0251C51.1246 47.7225 50.9034 47.3944 50.718 47.046C50.6418 46.9078 50.5727 46.7672 50.5084 46.6219C50.475 46.548 50.444 46.4718 50.4154 46.3956C50.2093 45.8713 50.0802 45.3201 50.0319 44.7589C50.0152 44.5873 50.008 44.411 50.008 44.2347V44.2324C50.008 44.1871 50.008 44.1418 50.0104 44.0989C50.0174 43.7117 50.0637 43.3261 50.1486 42.9482C50.1929 42.7452 50.2486 42.5447 50.3154 42.3479C50.3654 42.193 50.4249 42.0429 50.4893 41.8952C50.5083 41.8457 50.5297 41.7972 50.5536 41.7499C50.5631 41.7261 50.575 41.7023 50.5869 41.6784C50.6799 41.4803 50.7857 41.2885 50.9038 41.1043C50.9896 40.9613 51.0849 40.8231 51.1849 40.6874C51.3921 40.4103 51.6233 40.152 51.8758 39.9155C51.9806 39.813 52.0902 39.7201 52.2022 39.6272C52.463 39.4155 52.742 39.2273 53.036 39.0649C53.0384 39.0602 53.0408 39.0578 53.0456 39.0578C53.1575 38.9935 53.2695 38.9339 53.3862 38.8815C53.5227 38.8139 53.6627 38.7534 53.8055 38.7005C53.958 38.6409 54.1129 38.5861 54.2725 38.5408C54.5416 38.4613 54.8164 38.4024 55.0944 38.3645C55.2159 38.3455 55.3374 38.3312 55.4637 38.324C55.6209 38.3097 55.7806 38.3026 55.9402 38.3026C56.1471 38.3029 56.3538 38.314 56.5596 38.3359C56.6716 38.3455 56.7812 38.3598 56.8907 38.3788C57.0289 38.4003 57.1647 38.4265 57.3005 38.4598V38.9101C57.3006 38.986 57.2934 39.0618 57.2791 39.1364Z" fill="#4D5C7D"/>
			<Path d="M62.7333 44.2339C62.7344 45.5814 62.2771 46.8892 61.4364 47.9424C60.5958 48.9955 59.4219 49.7314 58.1076 50.029C56.7934 50.3266 55.417 50.1682 54.2046 49.5799C52.9923 48.9916 52.0162 48.0083 51.4368 46.7918C50.8573 45.5752 50.7089 44.1977 51.0161 42.8856C51.3232 41.5736 52.0676 40.4051 53.1269 39.5721C54.1861 38.7392 55.4972 38.2914 56.8447 38.3023C58.1922 38.3133 59.4959 38.7823 60.5415 39.6323C61.2259 40.1882 61.7777 40.8896 62.1569 41.6856C62.536 42.4817 62.7329 43.3522 62.7333 44.2339Z" fill="#F4C43A"/>
			<Path d="M57.5433 48.8022C60.066 48.3928 61.7791 46.016 61.3698 43.4933C60.9604 40.9707 58.5836 39.2575 56.061 39.6669C53.5383 40.0762 51.8252 42.4531 52.2345 44.9757C52.6439 47.4984 55.0207 49.2115 57.5433 48.8022Z" fill="#F4AC37"/>
			<Path d="M58.9369 44.5241C58.843 44.4016 58.7257 44.299 58.5917 44.2223C58.4825 44.158 58.3654 44.108 58.2434 44.0736C58.4576 43.9755 58.6391 43.8182 58.7666 43.6201C58.8792 43.44 58.9387 43.2319 58.9385 43.0195C58.937 42.7871 58.8694 42.56 58.7434 42.3647C58.6161 42.1581 58.4279 41.9958 58.2047 41.9003C57.9978 41.8159 57.7779 41.7677 57.5546 41.7579V41.1387H56.9013V41.7486H56.5716V41.1387H55.92V41.7486H55.6429V41.7471H54.9138V42.3322H55.4277V46.1309H54.9138V46.716H55.4277V46.7175H55.92V47.329H56.5716V46.7175H56.9013V47.329H57.5546V46.7129C57.7466 46.7056 57.9374 46.6792 58.1242 46.634C58.3198 46.5895 58.5046 46.5064 58.6676 46.3894C58.8238 46.2661 58.9484 46.1075 59.0313 45.9266C59.1308 45.7249 59.1817 45.5028 59.1799 45.278C59.1852 45.0066 59.0997 44.7413 58.9369 44.5241ZM56.0856 42.3353H57.0778C57.3316 42.3243 57.5857 42.3477 57.8332 42.405C57.9738 42.4463 58.0945 42.5377 58.1722 42.6619C58.253 42.793 58.2944 42.9445 58.2914 43.0984C58.2973 43.2529 58.2527 43.405 58.1645 43.5319C58.0693 43.6538 57.9366 43.7409 57.7868 43.7795C57.5812 43.8262 57.3704 43.8454 57.1599 43.8368H56.0856V42.3353ZM58.3998 45.6959C58.3425 45.8087 58.2559 45.9039 58.149 45.9714C58.0322 46.0402 57.9036 46.0864 57.7698 46.1077C57.6214 46.1269 57.4719 46.1346 57.3224 46.1309H56.0856V44.4235H57.2342C57.4794 44.415 57.7245 44.4427 57.9617 44.5055C58.0574 44.5372 58.1466 44.586 58.2248 44.6495C58.275 44.692 58.3192 44.7409 58.3564 44.795C58.4529 44.9373 58.5027 45.1061 58.4988 45.278C58.5013 45.4234 58.4673 45.5671 58.3998 45.6959V45.6959Z" fill="#CC903A"/>
			<Path d="M58.7914 44.5241C58.6975 44.4016 58.5802 44.299 58.4462 44.2223C58.337 44.158 58.22 44.108 58.098 44.0736C58.3121 43.9755 58.4937 43.8182 58.6212 43.6201C58.7337 43.44 58.7933 43.2319 58.793 43.0195C58.7916 42.7871 58.7239 42.56 58.5979 42.3647C58.4706 42.1581 58.2824 41.9958 58.0593 41.9003C57.8523 41.8159 57.6324 41.7677 57.4091 41.7579V41.1387H56.7559V41.7486H56.4262V41.1387H55.7745V41.7486H55.4974V41.7471H54.7683V42.3322H55.2822V46.1309H54.7683V46.716H55.2822V46.7175H55.7745V47.329H56.4262V46.7175H56.7559V47.329H57.4091V46.7129C57.6011 46.7056 57.792 46.6792 57.9788 46.634C58.1744 46.5895 58.3591 46.5064 58.5221 46.3894C58.6783 46.2661 58.803 46.1075 58.8859 45.9266C58.9853 45.7249 59.0362 45.5028 59.0345 45.278C59.0397 45.0066 58.9542 44.7413 58.7914 44.5241ZM55.9401 42.3353H56.9323C57.1861 42.3243 57.4402 42.3477 57.6877 42.405C57.8284 42.4463 57.949 42.5377 58.0267 42.6619C58.1075 42.793 58.1489 42.9445 58.1459 43.0984C58.1518 43.2529 58.1072 43.405 58.019 43.5319C57.9239 43.6538 57.7911 43.7409 57.6413 43.7795C57.4358 43.8262 57.225 43.8454 57.0144 43.8368H55.9401V42.3353ZM58.2543 45.6959C58.1971 45.8087 58.1104 45.9039 58.0035 45.9714C57.8868 46.0402 57.7581 46.0864 57.6243 46.1077C57.476 46.1269 57.3264 46.1346 57.1769 46.1309H55.9401V44.4235H57.0887C57.3339 44.415 57.579 44.4427 57.8162 44.5055C57.9119 44.5372 58.0011 44.586 58.0794 44.6495C58.1295 44.692 58.1737 44.7409 58.211 44.795C58.3075 44.9373 58.3572 45.1061 58.3534 45.278C58.3559 45.4234 58.3218 45.5671 58.2543 45.6959V45.6959Z" fill="#FFD660"/>
			<G clipPath="url(#clip0)">
				<Path fill-rule="evenodd" clip-rule="evenodd" d="M42.4219 5.56639H44.4433C47.1582 5.56639 49.3652 7.77342 49.375 10.4883V19.5703C49.375 24.0625 45.7226 27.7051 41.2402 27.7051H41.2207C39.1992 32.7246 34.834 36.4453 29.5801 37.3047L30.5664 42.4707H32.8125C35.3516 42.4707 37.4121 44.5312 37.4121 47.0703V49.414H12.5879V47.0703C12.5879 44.5312 14.6484 42.4707 17.1875 42.4707H19.4336L20.4297 37.3047C15.166 36.4355 10.8008 32.7246 8.78906 27.7051H8.76953C4.27734 27.7051 0.634766 24.0527 0.634766 19.5703V10.4883C0.634766 7.77342 2.8418 5.56639 5.55664 5.56639H7.57812V4.96092C7.57812 2.54881 9.46289 0.585917 11.7871 0.585917H38.2129C40.5371 0.585917 42.4219 2.54881 42.4219 4.96092V5.56639ZM7.57812 24.6777V21.5039V8.47654H5.55664C4.43359 8.47654 3.52539 9.38474 3.52539 10.498V19.5801C3.52539 22.0605 5.26367 24.1406 7.57812 24.6777ZM42.4219 24.6679C44.7461 24.1308 46.4746 22.0508 46.4746 19.5703V10.4883C46.4746 9.37498 45.5566 8.46678 44.4433 8.46678H42.4219V21.4941V24.6679Z" fill="#8B5E9D"/>
				<Path d="M25 28.75C30.5228 28.75 35 24.2728 35 18.75C35 13.2271 30.5228 8.74998 25 8.74998C19.4772 8.74998 15 13.2271 15 18.75C15 24.2728 19.4772 28.75 25 28.75Z" fill="#F4C43A"/>
				<Path d="M25 27.2115C29.6732 27.2115 33.4615 23.4232 33.4615 18.75C33.4615 14.0768 29.6732 10.2884 25 10.2884C20.3268 10.2884 16.5385 14.0768 16.5385 18.75C16.5385 23.4232 20.3268 27.2115 25 27.2115Z" fill="#F4AC37"/>
				<Path d="M18.8461 17.9808H17.3077V19.5192H18.8461V17.9808Z" fill="#FCD462"/>
				<Path d="M32.6923 17.9808H31.1538V19.5192H32.6923V17.9808Z" fill="#FCD462"/>
				<Path d="M26.9531 19.5312H23.4375C23.2303 19.5312 23.0316 19.4489 22.8851 19.3024C22.7386 19.1559 22.6562 18.9572 22.6562 18.75V15.625C22.6562 15.4178 22.7386 15.2191 22.8851 15.0726C23.0316 14.926 23.2303 14.8437 23.4375 14.8437H26.9531C27.2355 14.8686 27.5103 14.9491 27.7615 15.0806C28.0127 15.212 28.2354 15.3918 28.4169 15.6096C28.5984 15.8274 28.7351 16.0789 28.8191 16.3497C28.903 16.6205 28.9327 16.9052 28.9063 17.1875C28.9327 17.4698 28.903 17.7545 28.8191 18.0253C28.7351 18.2961 28.5984 18.5476 28.4169 18.7654C28.2354 18.9832 28.0127 19.163 27.7615 19.2944C27.5103 19.4258 27.2355 19.5063 26.9531 19.5312ZM24.2188 17.9687H26.9531C27.0906 17.9687 27.3438 17.6719 27.3438 17.1875C27.3438 16.7031 27.0906 16.4062 26.9531 16.4062H24.2188V17.9687Z" fill="#FFD660"/>
				<Path d="M26.9469 22.668H26.9289L23.4133 22.6328C23.3107 22.6318 23.2093 22.6106 23.1149 22.5704C23.0205 22.5302 22.935 22.4718 22.8632 22.3985C22.7913 22.3252 22.7347 22.2385 22.6963 22.1433C22.658 22.0482 22.6388 21.9464 22.6399 21.8438L22.6711 18.7188C22.6752 18.5122 22.7601 18.3155 22.9077 18.1709C23.0552 18.0263 23.2536 17.9453 23.4602 17.9453L26.9758 17.9805C27.258 18.0082 27.532 18.0914 27.7819 18.2254C28.0318 18.3593 28.2528 18.5413 28.4322 18.7609C28.6116 18.9805 28.7459 19.2334 28.8272 19.505C28.9086 19.7767 28.9354 20.0617 28.9063 20.3438C28.9072 20.9085 28.7265 21.4585 28.3907 21.9125C28.2247 22.1414 28.008 22.3288 27.7575 22.4598C27.507 22.5909 27.2296 22.6622 26.9469 22.668ZM24.2125 21.0774L26.9469 21.1055C26.9887 21.0968 27.0283 21.0796 27.0633 21.0551C27.0982 21.0305 27.1277 20.999 27.15 20.9625C27.2799 20.7771 27.3477 20.5553 27.3438 20.3289C27.3485 19.843 27.0985 19.5477 26.9602 19.543L24.2258 19.5149L24.2125 21.0774Z" fill="#FFD660"/>
				<Path d="M24.2188 13.2812H22.6562V15.625H24.2188V13.2812Z" fill="#FFD660"/>
				<Path d="M26.5625 13.2812H25V15.625H26.5625V13.2812Z" fill="#FFD660"/>
				<Path d="M24.2188 21.875H22.6562V24.2187H24.2188V21.875Z" fill="#FFD660"/>
				<Path d="M26.5625 21.875H25V24.2187H26.5625V21.875Z" fill="#FFD660"/>
				<Path d="M23.4375 14.8437H21.0938V16.4062H23.4375V14.8437Z" fill="#FFD660"/>
				<Path d="M21.0973 21.0884L21.0902 22.6509L23.4339 22.6616L23.441 21.0991L21.0973 21.0884Z" fill="#FFD660"/>
			</G>

			<Defs>
				<ClipPath id="clip0">
					<Rect width="50" height="50" fill="white"/>
				</ClipPath>
			</Defs>
		</Svg>
	);
}
