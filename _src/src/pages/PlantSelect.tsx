import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { EnviromentButton } from '../components/EnviromentButton'
import { Header } from '../components/Header'
import { Load } from '../components/Load'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { PlantProps } from '../libs/storage'


import api from '../services/api'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentProps {
	key: string;
	title: string;
}


export function PlantSelect() {
	const [environments, setEnvironments] = useState<EnviromentProps[]>([])
	const [plants, setPlants] = useState<PlantProps[]>([])
	const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
	const [environmentSelected, setEnvironmentSelected] = useState('all')
	const [loading, setLoading] = useState(true)

	const [page, setPage] = useState(1)
	const [loadingMore, setLoadingMore] = useState(false)

	const navigation = useNavigation()

	function handleEnvironmentSelected(environment: string) {
		setEnvironmentSelected(environment)

		if(environment === 'all') {
			return setFilteredPlants(plants)
		}
		
		const filtered = plants.filter(plant => 
			plant.environments.includes(environment)
		)

		setFilteredPlants(filtered)
	}

	async function fetchPlants(){
		const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

		if(!data) {
			return setLoading(true)
		}

		if(page > 1) {
			setPlants(oldValue => [...oldValue, ...data])
			setFilteredPlants(oldValue => [...oldValue, ...data])
		} else {
			setPlants(data)
			setFilteredPlants(data)
		}

		setLoading(false)
		setLoadingMore(false)
	}

	function handleFetchMore(distance: number) {
		if(distance < 1) {
			return
		}

		setLoadingMore(true)
		setPage(oldValue => oldValue + 1)
		fetchPlants()
	}

	function handlePlantSelect(plant: PlantProps) {
		navigation.navigate('PlantSave', {plant})
	}

	useEffect(() => {
		async function fetchEnvioment(){
			const { data } = await api.get('plants_environments?_sort=title&_order=asc')
			setEnvironments([
				{
					key: 'all',
					title: 'Todos'
				},
				...data
			])
		}

		fetchEnvioment()
	}, [])

	useEffect(() => {
		fetchPlants()
	},[])

	if(loading){
		return <Load /> 
	}

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

			<View style={styles.selects}>
				<FlatList
					data={environments}
					keyExtractor={(item) => String(item.key)}
					renderItem={({item}) => (
						<EnviromentButton 
							title={item.title}
							active={item.key === environmentSelected}
							onPress={() => handleEnvironmentSelected(item.key)}
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.enviromentList}
				/>
			</View>

			<View style={styles.plants}>
				<FlatList
					data={filteredPlants}
					keyExtractor={(item) => String(item.id)}
					renderItem={({item}) => (
						<PlantCardPrimary 
							data={item} 
							onPress={() => handlePlantSelect(item)}
						/>
					)}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					onEndReachedThreshold={0.1}
					onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
					ListFooterComponent={
						loadingMore ? <ActivityIndicator color={colors.green}/> : <></>
					}
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
		paddingHorizontal: 30,
		paddingTop: 30,
		paddingBottom: 15
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
		marginLeft: 10,
		marginVertical: 20
	},

	selects: {
		paddingHorizontal: 10,
	},

	plants: {
		flex: 1,
		paddingHorizontal: 15,
		justifyContent: 'center'
	}
})