import { ParsedNSO0, SourceNSO0 } from "./types.ts";

export function convertParsedNSO0ToSourceNSO0(parsedNSO0: ParsedNSO0): SourceNSO0 {
    const sourceNSO0: SourceNSO0 = { // @ts-ignore .
        flags: {},
        offsets: { // @ts-ignore .
            memory: {}
        }, // @ts-ignore .
        sections: {}, // @ts-ignore .
        sizes: {},
    }

    sourceNSO0.flags = parsedNSO0.flags;
    sourceNSO0.id = parsedNSO0.id;
    sourceNSO0.name = parsedNSO0.name;
    sourceNSO0.version = parsedNSO0.version;

    sourceNSO0.offsets.dynStr = parsedNSO0.offsets.extra.dynStr;
    sourceNSO0.offsets.dynSym = parsedNSO0.offsets.extra.dynSym;
    sourceNSO0.offsets.embedded = parsedNSO0.offsets.extra.embedded;

    sourceNSO0.offsets.memory.text = parsedNSO0.offsets.memory.text;
    sourceNSO0.offsets.memory.ro = parsedNSO0.offsets.memory.ro;
    sourceNSO0.offsets.memory.data = parsedNSO0.offsets.memory.data;

    sourceNSO0.sizes.bss = parsedNSO0.sizes.bss;
    sourceNSO0.sizes.dynStr = parsedNSO0.sizes.dynStr;
    sourceNSO0.sizes.dynSym = parsedNSO0.sizes.dynSym;
    sourceNSO0.sizes.embedded = parsedNSO0.sizes.embedded;

    sourceNSO0.sections.text = parsedNSO0.sections.text.decompressed;
    sourceNSO0.sections.ro = parsedNSO0.sections.ro.decompressed;
    sourceNSO0.sections.data = parsedNSO0.sections.data.decompressed;

    return sourceNSO0;
}