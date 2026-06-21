export function parseFlags(flags: number) {
    return {
        TextCompress:       (flags & 0b00000001) !== 0,
        RoCompress:         (flags & 0b00000010) !== 0,
        DataCompress:       (flags & 0b00000100) !== 0,
        TextHash:           (flags & 0b00001000) !== 0,
        RoHash:             (flags & 0b00010000) !== 0,
        DataHash:           (flags & 0b00100000) !== 0,
        ExecuteOnlyMemory:  (flags & 0b01000000) !== 0,
        UseZbicCompression: (flags & 0b10000000) !== 0,
    }
}