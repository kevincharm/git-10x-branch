import { exec } from 'child_process'

export default function gitBranch(...args: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
        exec(`git branch ${args.join(' ')}`, (err, stdout, stderr) => {
            if (err) {
                reject(err.message)
                return
            }

            if (stderr) {
                reject(stderr)
                return
            }

            resolve(stdout.split('\n').filter(line => !!line))
        })
    })
}
