const colors = {
    none: '#48ceee',
    undefined: '#b99945',
    passed: '#cddc39',
    failed: '#ff4c3f',
}

export const getColorForStatus = (status, fallback = colors.none) => {
    if (status === undefined || status === null) {
        return fallback
    }

    return colors[status]
}
