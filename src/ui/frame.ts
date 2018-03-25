export default async function frame() {
    return new Promise(resolve => {
        setTimeout(resolve, 1000 / 60)
    })
}
