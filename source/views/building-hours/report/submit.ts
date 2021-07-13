import jsYaml from 'js-yaml'
import type {BuildingType} from '../types'
import {sendEmail} from '../../../components/send-email'
import querystring from 'query-string'
import {GH_NEW_ISSUE_URL} from '../../../lib/constants'

export function submitReport(current: BuildingType, suggestion: BuildingType) {
	// calling trim() on these to remove the trailing newlines
	let before = stringifyBuilding(current).trim()
	let after = stringifyBuilding(suggestion).trim()

	let body = makeEmailBody(before, after, current.name)

	return sendEmail({
		to: ['allaboutolaf@stolaf.edu'],
		subject: `[building] Suggestion for ${current.name}`,
		body,
	})
}

function makeEmailBody(before: string, after: string, title: string): string {
	return `
Hi! Thanks for letting us know about a schedule change.

Please do not change anything below this line.

------------

Project maintainers: ${makeIssueLink(before, after, title)}

${makeHtmlBody(before, after)}
`
}

const makeMarkdownBody = (before, after) =>
	`
## Before:

\`\`\`yaml
${before}
\`\`\`

## After:

\`\`\`yaml
${after}
\`\`\`
`

const makeHtmlBody = (before, after) => `
<p>Before:</p>
<pre><code>${before}</code></pre>

<p>After:</p>
<pre><code>${after}</code></pre>
`

function makeIssueLink(before: string, after: string, title: string): string {
	let q = querystring.stringify({
		'labels[]': 'data/hours',
		title: `Building hours update for ${title}`,
		body: makeMarkdownBody(before, after),
	})
	return `${GH_NEW_ISSUE_URL}?${q}`
}

function stringifyBuilding(building: BuildingType): string {
	let res = ''
	let prev = null
	let data = jsYaml.dump(building, {flowLevel: 4}).split('\n')
	for (let line of data) {
		if (['schedule:', 'breakSchedule:'].includes(line)) {
			res += `\n\n${line}`
		} else if (line.startsWith('  - title:') && prev !== 'schedule:') {
			res += `\n\n${line}`
		} else {
			res += `\n${line}`
		}
		prev = line
	}
	return res
}
