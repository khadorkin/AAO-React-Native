import * as React from 'react'
import {Platform, StyleSheet} from 'react-native'
import {Separator} from '@frogpond/separator'

const styles = StyleSheet.create({
	separator: {
		marginLeft: 15,
	},
})

type PropsType = {
	styles?: any
	fullWidth?: boolean
	spacing?: {left?: number; right?: number}
	force?: boolean
}

export function ListSeparator(props: PropsType) {
	if (Platform.OS === 'android' && !props.force) {
		return null
	}

	const {
		fullWidth,
		spacing: {left: leftSpacing = 15, right: rightSpacing} = {},
	} = props

	const spacing = {marginLeft: leftSpacing, marginRight: rightSpacing}

	if (fullWidth) {
		spacing.marginLeft = 0
		spacing.marginRight = 0
	}

	return <Separator style={[styles.separator, spacing, props.styles]} />
}
