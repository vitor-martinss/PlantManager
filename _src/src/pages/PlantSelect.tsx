import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { EnviromentButton } from '../components/EnviromentButton'
import { Header } from '../components/Header'
import api from '../services/api'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentProps {
	key: string;
	title: string;
}

export function PlantSelect() {
	const [enviroments, setEnviroments] = useState<EnviromentProps[]>([])

	useEffect(() => {
		async function fetchEnvioment(){
			const { data } = await api.get('plants_enviroments')
			setEnviroments([
				{
					key: 'all',
					title: 'Todos'
				},
				...data
			])
		}

		fetchEnvioment()
	}, [])


	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header />

				<Text style={styles.title}>
					Em qual ambiente
				</Text>

				<Text style={styles.subTitle}>
					você quer colocar sua planta?
				</Text>
			</View>

			<View>
				<FlatList
					data={enviroments}
					renderItem={({item}) => (
						<EnviromentButton 
							title={item.title}
					
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.enviromentList}
				/>
			</View>

			
			
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},

	header: {
		padding: 30
	},

	title: {
		fontSize: 17,
		lineHeight: 20,
		color: colors.heading,
		fontFamily: fonts.heading,
		marginTop: 15
	},

	subTitle: {
		fontSize: 17,
		lineHeight: 20,
		color: colors.heading,
		fontFamily: fonts.text,
	},

	enviromentList: {
		height: 40,
		justifyContent: 'center',
		paddingBottom: 5,
		marginLeft: 32,
		marginVertical: 32
	}
})