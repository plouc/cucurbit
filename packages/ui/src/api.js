const API_URL = 'http://localhost:5000'

export const getFeaturesDir = () =>
    fetch(`${API_URL}/features`, {
        method: 'GET',
    }).then(r => r.json())

export const loadFeature = path =>
    fetch(`${API_URL}/features/${encodeURIComponent(path)}`, {
        method: 'GET',
    }).then(r => r.json())

export const runTests = () =>
    fetch(`${API_URL}/run`, {
        method: 'POST',
    }).then(r => r.json())
