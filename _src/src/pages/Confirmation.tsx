import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { Button } from '../components/Buttons'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Confirmation() {
	const navigation = useNavigation()

	function handleSubmit() {
		navigation.navigate('Welcome')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.emoji}>
					😊
				</Text>

				<Text style={styles.title}>
					Prontinho
				</Text>

				<Text style={styles.subtitle}>
					Agora vamos começar a cuidar das suas plantinhas com muito cuidado
				</Text>
				
				<View style={styles.footer}>
					<Button 
						title='Começar'
						onPress={handleSubmit}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},

	content: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30
	},

	emoji: {
		marginBottom: 15,
		fontSize: 48,
	},

	title: {
		fontSize: 22,
		fontFamily: fonts.heading,
		textAlign: 'center',
		color: colors.heading,
		lineHeight: 38,
	},

	subtitle: {
		fontSize: 17,
		fontFamily: fonts.text,
		textAlign: 'center',
		color: colors.heading,
		paddingVertical: 10,
		marginBottom: 20
	},

	footer: {
		width: '100%',
		paddingHorizontal: 50
	},
})