import * as blessed from 'blessed'
import frame from './lib/frame'
import createBody from './lib/body'
import BranchSelector from './lib/branch-selector'
import gitBranch from './lib/git-branch'
import gitCheckout from './lib/git-checkout'

export default async function branchSelectionScreen() {
    const screen = blessed.screen({ smartCSR: true })
    try {
        let done = false
        const body = createBody(screen)
        const gitBranches = await gitBranch()
        const branchSelector = new BranchSelector(body, gitBranches)

        screen.key(['up', 'k'], () => branchSelector.up())
        screen.key(['down', 'j'], () => branchSelector.down())
        screen.key('enter', async () => {
            done = await handleEnter(screen, branchSelector)
        })

        const input = blessed.textbox({ left: 0, bottom: 0, height: 1 })
        screen.append(input)
        screen.key(':', () => {
            input.setValue(':')
            input.readInput(async (err, value) => {
                input.setValue('')
                done = await handleInput(screen, branchSelector, value)
            })
        })

        screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

        for (;;) {
            if (done) {
                break
            }

            branchSelector.update()
            screen.render()
            await frame()
        }
    } catch (err) {
        exitWithError(screen, err)
    }
}

async function handleEnter(screen: blessed.Widgets.Screen, branchSelector: BranchSelector) {
    try {
        const branch = branchSelector.getSelection()
        const result = await gitCheckout(branch.name)
        exitWithMessage(screen, result)
        return true
    } catch (err) {
        exitWithError(screen, err)
    }
    return false
}

async function handleInput(screen: blessed.Widgets.Screen, branchSelector: BranchSelector, value: string) {
    const force = value.match(/!$/)
    const val = value.replace(/^:|!$/g, '')
    try {
        switch (val) {
            case 'de':
                const branch = branchSelector.getSelection()
                const delOpt = force ? '-D' : '-d'
                const result = await gitBranch(delOpt, branch.name)
                return true
            case 'q':
            case 'quit':
                process.exit(0)
                return true
        }
    } catch (err) {
        exitWithError(screen, err)
    }

    return false
}

function exitWithMessage(screen: blessed.Widgets.Screen, message: string) {
    screen.destroy()
    process.stdout.write(message)
    process.exit(0)
}

function exitWithError(screen: blessed.Widgets.Screen, message: string) {
    screen.destroy()
    process.stderr.write(message)
    process.exit(1)
}
