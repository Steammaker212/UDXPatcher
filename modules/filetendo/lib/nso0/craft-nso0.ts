import { NSO0_HEADER } from "../structures.ts";
import { SourceNSO0 } from "./types.ts";
import { encode } from "../text.ts";
import { hashy, lz4y } from "../../deps.ts";

const ModuleNameOffset = 0x100

function craftFlags(source: SourceNSO0) {
    let flags = 0;

    flags |= source.flags.TextCompress       ? 0b00000001 : 0;
    flags |= source.flags.RoCompress         ? 0b00000010 : 0;
    flags |= source.flags.DataCompress       ? 0b00000100 : 0;
    flags |= source.flags.TextHash           ? 0b00001000 : 0;
    flags |= source.flags.RoHash             ? 0b00010000 : 0;
    flags |= source.flags.DataHash           ? 0b00100000 : 0;
    flags |= source.flags.ExecuteOnlyMemory  ? 0b01000000 : 0;
    flags |= source.flags.UseZbicCompression ? 0b10000000 : 0;

    return flags;
}

function createEmptyArray(length: number) {
    return new Array(length).fill(0) as number[]
}

export async function craftNSO0(source: SourceNSO0) {
    if (source.flags.UseZbicCompression) throw new Error("[craftNSO0]: Unsupported compressing algorithm, zstd-based");
   
    const ModuleName = encode(source.name);
    const ModuleNameSize = ModuleName.length;
    const StartOffset = ModuleNameOffset + ModuleNameSize;

    const text = source.flags.TextCompress ? lz4y.compress(source.sections.text) : source.sections.text;
    const ro = source.flags.RoCompress ? lz4y.compress(source.sections.ro) : source.sections.ro;
    const data = source.flags.DataCompress ? lz4y.compress(source.sections.data) : source.sections.data;

    const TextFileOffset = StartOffset;
    const RoFileOffset = TextFileOffset + text.length;
    const DataFileOffset = RoFileOffset + ro.length;
    const NSOSize = DataFileOffset + data.length;

    const buffer = new ArrayBuffer(NSOSize);

    NSO0_HEADER.pack({
        Signature: [ 0x4e, 0x53, 0x4F, 0x30 ], // NSO0
        Version: source.version,
        Reserved: createEmptyArray(0x04),
        Flags: craftFlags(source),
        TextFileOffset,
        TextMemoryOffset: source.offsets.memory.text,
        TextSize: source.sections.text.length,
        ModuleNameOffset,
        RoFileOffset,
        RoMemoryOffset: source.offsets.memory.ro,
        RoSize: source.sections.ro.length,
        ModuleNameSize,
        DataFileOffset,
        DataMemoryOffset: source.offsets.memory.data,
        DataSize: source.sections.data.length,
        BssSize: source.sizes.bss,
        ModuleId: source.id,
        TextFileSize: text.length,
        RoFileSize: ro.length,
        DataFileSize: data.length,
        Reserved2: createEmptyArray(0x1C),
        EmbeddedOffset: source.offsets.embedded,
        EmbeddedSize: source.sizes.embedded,
        DynStrOffset: source.offsets.dynStr,
        DynStrSize: source.sizes.dynStr,
        DynSymOffset: source.offsets.dynSym,
        DynSymSize: source.sizes.dynSym,
        TextHash: (await hashy.calculateSHA256(source.sections.text)).array,
        RoHash: (await hashy.calculateSHA256(source.sections.ro)).array,
        DataHash: (await hashy.calculateSHA256(source.sections.data)).array
    }, buffer);

    const array = new Uint8Array(buffer);

    array.set(ModuleName, ModuleNameOffset),
    array.set(text, TextFileOffset);
    array.set(ro, RoFileOffset);
    array.set(data, DataFileOffset);

    return array;
}