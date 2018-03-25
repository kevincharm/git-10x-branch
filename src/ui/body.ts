import * as blessed from 'blessed'

export default function createBody(screen: blessed.Widgets.Screen) {
    const box = blessed.box({
        top: 0,
        left: 0,
        width: '50%',
        height: '50%',
        tags: true,
        border: {
            type: 'bg'
        }
    })
    screen.append(box)
    return box
}
