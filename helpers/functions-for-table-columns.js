export function prepareDuration (duration) {

    duration = Math.round(duration)

    let seconds = duration % 60
    let minutes = (duration - seconds) / 60

    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
}