export function save(key, value) {
    try {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    } catch (error) {
        console.error(`Failed to save key "${key}" to localStorage:`, error);
    }
}

export function load(key) {
    const value = localStorage.getItem(key);
    if (value === null || value === undefined || value === "undefined") {
        return null;
    }
    try {
        return JSON.parse(value);
    } catch (error) {
        console.error('Failed to parse key "' + key + '" from localStorage:', error);
        return null;
    }
}

export function remove(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Failed to remove key "${key}" from localStorage:`, error);
    }
}
