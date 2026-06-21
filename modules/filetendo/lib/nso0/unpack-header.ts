import { NSO0_HEADER } from "../structures.ts";
import * as text from "../text.ts";

export function unpackNSO0Header(data: Uint8Array) {
    if (data.length < NSO0_HEADER.size) throw new Error("[parseNSO0Header]: Header is too small, corrupted NSO?");

    const unpacked = NSO0_HEADER.unpack(data.buffer as ArrayBuffer);
    const signature = text.decode(unpacked.Signature);

    if (signature !== "NSO0") throw new Error("[parseNSO0Header]: Header doesn't contains NSO0 signature, corrupted NSO?");

    return unpacked;
}