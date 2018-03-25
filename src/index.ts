import { spawn } from 'child_process'
import branchSelectionScreen from './screens/branch-selection'

export default async function main() {
    const args = process.argv.slice(2)
    if (args.length) {
        spawn('git', ['branch', ...args], {
            detached: true,
            stdio: 'inherit'
        }).unref()
        return
    }

    await branchSelectionScreen()
}
