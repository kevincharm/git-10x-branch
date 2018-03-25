import * as blessed from 'blessed'

export interface GitBranch {
    name: string
    node: blessed.Widgets.TextElement
    isCurrent: boolean
}

export type OnSelectCallbackFunction = (result: string) => void

export default class BranchSelector {
    private selected: number = 0
    private body: blessed.Widgets.BoxElement
    private branches: GitBranch[] = []

    constructor(body: blessed.Widgets.BoxElement, gitBranches: string[]) {
        this.body = body
        this.parseBranches(gitBranches)
    }

    private parseBranches(gitBranches: string[]) {
        gitBranches.forEach((rawBranch, index) => {
            const isCurrent = rawBranch.charAt(0) === '*'
            if (isCurrent) {
                this.selected = index
            }

            const name = rawBranch.trim().replace(/^\*\s/, '')
            const node = blessed.text({ content: name, top: index })
            const branch = { name, node, isCurrent }
            this.branches.push(branch)

            this.body.append(node)
        })
    }

    public up() {
        this.selected = Math.max(0, this.selected - 1)
    }

    public down() {
        this.selected = Math.min(this.branches.length - 1, this.selected + 1)
    }

    public getSelection() {
        return this.branches[this.selected]
    }

    public update() {
        this.branches.forEach((branch, index) => {
            const content = []
            let fg = 'white'

            if (branch.isCurrent) {
                content.push('*')
            } else {
                content.push(' ')
            }

            if (this.selected === index) {
                content.push('\u25cf')
                fg = 'green'
            } else {
                content.push(' ')
            }

            content.push(branch.name)

            branch.node.content = content.join(' ')
            branch.node.style.fg = fg
        })
    }
}
