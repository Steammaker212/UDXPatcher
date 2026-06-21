import { lib } from "./bindings.ts";

export function compress(data: Uint8Array | number[]) {
    const input = new Uint8Array(data);

    const maxSize =
        lib.symbols.LZ4_MaxCompressedSize(input.length);

    const output = new Uint8Array(maxSize);

    const written = lib.symbols.LZ4_Compress(
        Deno.UnsafePointer.of(input),
        input.length,
        Deno.UnsafePointer.of(output),
        output.length,
    );

    const compressed = output.subarray(0, written);
    return compressed;
}
