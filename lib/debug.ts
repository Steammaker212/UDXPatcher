export function log(message: string): void {
    console.log(`\x1b[36m📝 LOG: ${message}\x1b[0m`);
}

export function error(message: string): void {
    console.error(`\x1b[31m❌ ERROR: ${message}\x1b[0m`);
}

export function warning(message: string): void {
    console.warn(`\x1b[33m⚠️ WARNING: ${message}\x1b[0m`);
}

export function ok(message: string): void {
    console.log(`\x1b[32m✅ OK: ${message}\x1b[0m`);
}