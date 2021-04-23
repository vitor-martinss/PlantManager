
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { Header } from '../components/Header'
import waterdrop from '../assets/waterdrop.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { FlatList } from 'react-native-gesture-handler'
import { loadPlant, PlantProps } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import { PlantCardSecondary } from '../components/PlantCardSecondary'


export function MyPlants() {

	const [myPlants, setMyPlants] = useState<PlantProps[]>([])
	const [loading, setLoading] = useState(true)
	const [nextWatered, setNextWatered] = useState<string>()
	
	useEffect(() => {
		async function loadStorageData() {
			const plantsStoraged = await loadPlant()

			const nextTime = formatDistance(
				new Date(plantsStoraged[0].dateTimeNotification).getTime(),
				new Date().getTime(),
				{locale: pt}
			)

			setNextWatered(
				`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`
			)

			setMyPlants(plantsStoraged)
			setLoading(false)
		}

		loadStorageData()
	},[])

	return (
		<View style={styles.container}>
			<Header />

			<View style={styles.spotLight}>
				<Image 
					source={waterdrop}
					style={styles.spotLightImage}
				/>

				<Text style={styles.spotLightText}>
					{nextWatered}
				</Text>
			</View>

			<View style={styles.plants}>

				<Text style={styles.plantsTitle}>
					Próximas regadas
				</Text>

				<FlatList
					data={myPlants}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<PlantCardSecondary data={item}/>
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{flex: 11}}
				/>
			</View>
		</View>
	)
} 

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 30,
		paddingTop: 50,
		backgroundColor: colors.background
	},

	spotLight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		borderRadius: 20,
		height: 110,
		backgroundColor: colors.blue_light
	},

	spotLightImage: {
		width: 60,
		height: 60
	},

	spotLightText: {
		flex: 1,
		color: colors.blue,
		paddingHorizontal: 10,
	},

	plants: {
		flex: 1,
		width: '100%'
	},

	plantsTitle: {
		fontSize: 24,
		fontFamily: fonts.heading,
		color: colors.heading,
		marginVertical: 20
	}
})