// external
import { equal } from 'assert-helpers'
import kava from 'kava'
import promiseErrback from 'promise-errback'

// local
import read from './index.js'

kava.suite('@bevry/fs-read', function (suite, test) {
	test('works as expected', function (done) {
		promiseErrback(
			Promise.resolve().then(async function () {
				// just read the first line so we don't have to keep updating the test
				const actual = (await read('.github/FUNDING.yml')).split('\n')[0]
				const expected = 'github: [balupton]'
				equal(actual, expected, 'read data was as expected')
			}),
			done
		)
	})
})
