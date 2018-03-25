import { exec } from 'child_process'

export default function gitCheckout(...args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`git checkout ${args.join(' ')}`, (err, stdout, stderr) => {
            if (err) {
                reject(err.message)
                return
            }

            if (stderr) {
                resolve(stderr)
                return
            }

            resolve(stdout)
        })
    })
}
