import React from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>
					Olá,
				</Text>
				<Text style={styles.userName}>
					Vitor
				</Text>
			</View>
			<Image 
				style={styles.image}
				source={{uri: 'https://i.pravatar.cc/300'}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({	
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 20,
		backgroundColor: colors.red,
		marginTop: getStatusBarHeight(),
	},

	greeting: {
		fontSize: 32,
		color: colors.heading,
		fontFamily: fonts.text
	},

	userName: {
		fontSize: 32,
		lineHeight: 40,
		color: colors.heading,
		fontFamily: fonts.heading
	},

	image: {
		width: 70,
		height: 70,
		borderRadius: 35
	},
})