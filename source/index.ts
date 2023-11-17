// builtin
import { readFile as _readFile } from 'fs'

// external
import accessible, { R_OK } from '@bevry/fs-accessible'
import Errlop from 'errlop'

/** Read the contents of a file. */
export default async function read(path: string): Promise<string> {
	// check accessible
	try {
		await accessible(path)
	} catch (err: any) {
		throw new Errlop(`unable to read the non-accessible file: ${path}`, err)
	}

	// check readable
	try {
		await accessible(path, R_OK)
	} catch (err: any) {
		throw new Errlop(`unable to read the non-readable file: ${path}`, err)
	}

	// attempt read
	return new Promise(function (resolve, reject) {
		_readFile(path, { encoding: 'utf8' }, function (err, contents) {
			if (err) {
				return reject(
					new Errlop(
						`failed to read the accessible and readable file: ${path}`,
						err
					)
				)
			}
			return resolve(contents)
		})
	})
}
