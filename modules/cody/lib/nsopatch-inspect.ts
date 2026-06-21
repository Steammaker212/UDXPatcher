export function nsopatchInspect(patch: { code: number[], address: number }) {
    const address = "0x" + patch.address.toString(16).toUpperCase().padStart(8, "0");
    const bytes = patch.code.map(byte => byte.toString(16).toUpperCase().padStart(2, "0")).join(" ");

    return `Replacing code at ${address} => ${bytes}`;
}