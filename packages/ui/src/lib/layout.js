export const PANEL_EXPLORER = 'explorer'
export const PANEL_EDITOR = 'editor'
export const PANEL_INFO = 'info'
export const PANEL_CONSOLE = 'console'

export const computeLayout = currentPanels => {
    let columnsTemplate = []
    let rowsTemplate = ['50px']
    let panels = {
        [PANEL_EXPLORER]: {
            gridColumnStart: 1,
            gridRowStart: 2,
        },
        [PANEL_EDITOR]: {
            gridColumnStart: 1,
        },
        [PANEL_INFO]: {
            gridColumnStart: 1,
        },
        [PANEL_CONSOLE]: {
            gridColumnStart: 1,
        },
    }

    if (currentPanels.includes(PANEL_EXPLORER)) {
        columnsTemplate.push('260px')
    }

    if (currentPanels.includes(PANEL_EDITOR)) {
        columnsTemplate.push('1fr')
        if (currentPanels.includes(PANEL_EXPLORER)) {
            panels[PANEL_EDITOR].gridColumnStart += 1
        }
    }

    if (currentPanels.includes(PANEL_INFO)) {
        columnsTemplate.push('1fr')
        if (currentPanels.includes(PANEL_EXPLORER)) {
            panels[PANEL_INFO].gridColumnStart += 1
        }
        if (currentPanels.includes(PANEL_EDITOR)) {
            panels[PANEL_INFO].gridColumnStart += 1
        }
    }

    if (currentPanels.includes(PANEL_EDITOR) || currentPanels.includes(PANEL_INFO)) {
        rowsTemplate.push('1fr')
    }

    if (currentPanels.includes(PANEL_CONSOLE)) {
        if (
            (currentPanels.includes(PANEL_EXPLORER) && columnsTemplate.length === 1) ||
            columnsTemplate.length === 0
        ) {
            columnsTemplate.push('1fr')
        }
        rowsTemplate.push('1fr')
        if (currentPanels.includes(PANEL_EXPLORER)) {
            panels[PANEL_CONSOLE].gridColumnStart = 2
        }
        panels[PANEL_CONSOLE].gridColumnEnd = columnsTemplate.length + 1
    }

    if (rowsTemplate.length === 3) {
        panels[PANEL_EXPLORER].gridRowEnd = 4
    }

    return {
        panels,
        grid: {
            gridTemplateColumns: columnsTemplate.join(' '),
            gridTemplateRows: rowsTemplate.join(' '),
        },
    }
}
