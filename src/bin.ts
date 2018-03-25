#!/usr/bin/env node
import { spawn } from 'child_process'
import main from './index'

const args = process.argv.slice(2)
if (!args.length) {
    main()
} else {
    spawn('git', ['branch', ...args], {
        detached: true,
        stdio: 'inherit'
    }).unref()
}
