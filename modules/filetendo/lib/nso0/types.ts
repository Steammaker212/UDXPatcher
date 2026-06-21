import { hashy } from "../../deps.ts";

export interface SourceNSO0 {
    version: number,

    flags: {
        TextCompress: boolean,
        RoCompress: boolean,
        DataCompress: boolean,
        TextHash: boolean,
        RoHash: boolean,
        DataHash: boolean,
        ExecuteOnlyMemory: boolean,
        UseZbicCompression: boolean,
    },

    offsets: {
        embedded: number,
        dynStr: number,
        dynSym: number,

        memory: {
            text: number,
            ro: number,
            data: number
        }
    }
    
    sizes: {
        bss: number,
        embedded: number,
        dynStr: number,
        dynSym: number,
    }

    name: string,
    id: number[],

    sections: {
        text: Uint8Array,
        ro: Uint8Array,
        data: Uint8Array
    }
}

export interface ParsedNSO0 {
    version: number,

    offsets: {
        file: {
            text: number,
            ro: number,
            data: number,
        },

        memory: {
            text: number,
            ro: number,
            data: number
        }

        extra: {
            embedded: number,
            dynStr: number,
            dynSym: number,
        }
    }

    sizes: {
        text: number,
        ro: number,
        data: number,
        bss: number,
        embedded: number,
        dynStr: number,
        dynSym: number,
    }

    hash: {
        text: hashy.SHA256,
        ro: hashy.SHA256,
        data: hashy.SHA256
    }

    name: string,
    id: number[],

    flags: {
        TextCompress: boolean,
        RoCompress: boolean,
        DataCompress: boolean,
        TextHash: boolean,
        RoHash: boolean,
        DataHash: boolean,
        ExecuteOnlyMemory: boolean,
        UseZbicCompression: boolean,
    },

    sections: {
        text: { raw: Uint8Array, decompressed: Uint8Array },
        ro: { raw: Uint8Array, decompressed: Uint8Array },
        data: { raw: Uint8Array, decompressed: Uint8Array },
    }
}