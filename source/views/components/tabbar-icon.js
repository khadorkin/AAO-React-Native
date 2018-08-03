// @flow
import * as React from 'react'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
	icon: {
		fontSize: 30,
	},
})

export const TabBarIcon = (icon: string) => ({
	tintColor,
}: {
	tintColor: string,
	focused: boolean,
}) => <Icon name={`ios-${icon}`} style={[styles.icon, {color: tintColor}]} />
