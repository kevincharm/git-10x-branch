import { spawnSync } from 'child_process'
import branchSelectionScreen from './screens/branch-selection'

export default async function main() {
    const args = process.argv.slice(2)
    if (args.length) {
        spawnSync('git', ['branch', ...args], {
            stdio: 'inherit'
        })
        return
    }

    await branchSelectionScreen()
}
