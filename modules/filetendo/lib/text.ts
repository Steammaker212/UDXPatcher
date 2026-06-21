export function decode(data: Uint8Array | number[]) {
    data = new Uint8Array(data);
    return new TextDecoder().decode(data);
}

export function encode(text: string) {
    return new TextEncoder().encode(text);
}