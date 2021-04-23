import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications'

import Routes from './src/routes';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
import { PlantProps } from './src/libs/storage';


export default function App() {

	const [fontsLoaded] = useFonts({
		Jost_400Regular,
		Jost_600SemiBold
	})

	useEffect(() => {
		// Escutar todas as notificacoes
		const subscription = Notifications.addNotificationReceivedListener(
			async notification => {
				const data = notification.request.content.data.plant as PlantProps
				console.log(data)
			}
		)
		return () => subscription.remove()

		// Ver todas as notificacoes agendadas
		// async function notifications() {
		// 	const data = await Notifications.getAllScheduledNotificationsAsync()
		// }

		// notifications()
	}, [])

	if(!fontsLoaded)
		return <AppLoading />

	return (
		<Routes />
	);
}
