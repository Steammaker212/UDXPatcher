import { lz4 } from "../deps.ts";

export function decompress(data: Uint8Array | number[]) {
    if (!(data instanceof Uint8Array)) data = new Uint8Array(data);

    return lz4.decompress(data);
}