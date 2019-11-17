// @flow
import React, {Component} from 'react'
import {SectionList, StyleSheet} from 'react-native'
import {ListSeparator, ListSectionHeader} from '@frogpond/lists'
import {NoticeView} from '@frogpond/notice'
import {LicenseItem} from './item'
import {type NavigationScreenProp} from 'react-navigation'
import {type LicenseType} from './types'
import {type SortedLicenseType} from './types'

type Props = {
	licenses: SortedLicenseType,
	navigation: NavigationScreenProp<*>,
}

export class LicensesList extends Component<Props> {
	renderSeparator = () => <ListSeparator />

	renderItem = ({item}: {item: LicenseType}) => (
		<LicenseItem item={item} navigation={this.props.navigation} />
	)

	renderSectionHeader = ({section: {title}}: any) => (
		// the proper type is ({section: {title}}: {section: {title: string}})
		<ListSectionHeader spacing={{left: 10}} title={title} />
	)

	keyExtractor = (item: LicenseType, index: number) => index.toString()

	render() {
		return (
			<SectionList
				ItemSeparatorComponent={this.renderSeparator}
				ListEmptyComponent={<NoticeView text="No licenses." />}
				contentContainerStyle={styles.contentContainer}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
				renderSectionHeader={this.renderSectionHeader}
				sections={this.props.licenses}
				style={styles.list}
			/>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
	},
})
