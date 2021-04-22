import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
	const [userName, setUserName] = useState<string>()
	
	useEffect(() => {
		async function loadStorageUserName() {
			const user = await AsyncStorage.getItem('@plantmanager:user')
			setUserName(user || '')
		}

		loadStorageUserName()
	}, [])

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>
					Olá,
				</Text>
				<Text style={styles.userName}>
					{userName}
				</Text>
			</View>
			<Image 
				style={styles.image}
				source={{uri: 'https://avatars.githubusercontent.com/u/37670851?v=4'}}
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