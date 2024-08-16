// @ts-nocheck
export const maskDate = (e: Event, ref, delimiter = '.') => {

    if (
        e.key === 'Esc' ||
        e.key.match(/F[1-9]|F1[0-2]/) ||
        e.key === 'Tab' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        (e.ctrlKey === true && e.key === 'a')
    ) {
        return
    }

    e.preventDefault()

    if (e.key === 'Backspace') {
        handleBackspace(e, ref, delimiter)
    }

    if (e.key === ' ' || e.key === 'Spacebar') {
        return
    }

    if (Number(e.key) >= 0 && Number(e.key) <= 9) {
        handleNumbers(e, ref, delimiter)
    }
}

export const maskDateTime = (e: Event, ref, delimiterDate = '.', delimiterTime = ':') => {

    if (
        e.key === 'Esc' ||
        e.key.match(/F[1-9]|F1[0-2]/) ||
        e.key === 'Tab' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        (e.ctrlKey === true && e.key === 'a')
    ) {
        return
    }

    e.preventDefault()

    if (e.key === 'Backspace') {
        handleBackspaceDateTime(e, ref, delimiterDate)
    }

    if (e.key === ' ' || e.key === 'Spacebar') {
        return
    }

    if (Number(e.key) >= 0 && Number(e.key) <= 9) {
        handleNumbersDateTime(e, ref, delimiterDate)
    }
}

const handleBackspace = (e, ref, delimiter) => {
    if (e.target.selectionStart !== e.target.selectionEnd) {
        ref.value = ref.value.substring(0, e.target.selectionStart) + ref.value.substring(e.target.selectionEnd)

        return
    }

    if (ref.value !== null && ref.value[ref.value.length - 2] === delimiter) {
        ref.value = ref.value.slice(0, -2)
        return
    }

    ref.value = ref.value === null ? ref.value : ref.value.slice(0, -1)
}

const handleBackspaceDateTime = (e, ref, delimiter) => {
    if (e.target.selectionStart !== e.target.selectionEnd) {
        ref.value = ref.value.substring(0, e.target.selectionStart) + ref.value.substring(e.target.selectionEnd)

        return
    }

    if (ref.value !== null && ref.value[ref.value.length - 2] === delimiter) {
        ref.value = ref.value.slice(0, -2)
        return
    }

    ref.value = ref.value === null ? ref.value : ref.value.slice(0, -1)
}

const handleNumbers = (e, ref, delimiter) => {
    if (
        ref.value?.length === 2 ||
        ref.value?.length === 5
    ) {
        if (ref.value.length === 2 && e.key.match(/[2-9]/)) {
            ref.value = ref.value + delimiter + '0' + e.key
            return
        }

        ref.value = ref.value + delimiter + e.key

        return
    }

    if ((ref.value?.length === 1) && ref.value === '3' && e.key.match(/[2-9]/)) {
        ref.value = ref.value + '1'
        return;
    }

    if ((ref.value?.length === 4) && ref.value[ref.value.length - 1] === '1' && e.key.match(/[3-9]/)) {
        ref.value = ref.value + '2'
        return;
    }

    if ((ref.value === null || ref.value === '') && e.key.match(/[4-9]/)) {
        ref.value = '0' + e.key

        return
    }

    if (ref.value?.length === 10) {
        return
    }

    ref.value = (ref.value !== null ? ref.value : '') + e.key
}

const handleNumbersDateTime = (e, ref, delimiter) => {
    if (
        ref.value?.length === 2 ||
        ref.value?.length === 5
    ) {
        if (ref.value.length === 2 && e.key.match(/[2-9]/)) {
            ref.value = ref.value + delimiter + '0' + e.key
            return
        }

        ref.value = ref.value + delimiter + e.key

        return
    }

    if ((ref.value?.length === 1) && ref.value === '3' && e.key.match(/[2-9]/)) {
        ref.value = ref.value + '1'
        return;
    }

    if ((ref.value?.length === 4) && ref.value[ref.value.length - 1] === '1' && e.key.match(/[3-9]/)) {
        ref.value = ref.value + '2'
        return;
    }

    if ((ref.value === null || ref.value === '') && e.key.match(/[4-9]/)) {
        ref.value = '0' + e.key

        return
    }

    if (ref.value?.length === 10) {

        ref.value = ref.value + ' ' + e.key
        return
    }

    ref.value = (ref.value !== null ? ref.value : '') + e.key
}