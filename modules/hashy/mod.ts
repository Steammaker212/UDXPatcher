export interface SHA256 {
    raw: Uint8Array,
    array: number[],
    hex: string 
}

function stringifySHA256(hashArray: number[] | Uint8Array) {
    if (hashArray instanceof Uint8Array) hashArray = Array.from(hashArray);
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toLowerCase();
}

export async function calculateSHA256(data: Uint8Array | number[]): Promise<SHA256> {
    if (!(data instanceof Uint8Array)) data = new Uint8Array(data);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data as Uint8Array<ArrayBuffer>);
    const hashUint8Array = new Uint8Array(hashBuffer);
    const hashArray = Array.from(hashUint8Array);
    const hashHex = stringifySHA256(hashArray);
    
    return {
        raw: hashUint8Array,
        array: hashArray,
        hex: hashHex
    }
}

export function parseSHA256(source: Uint8Array | number[] | string): SHA256 {
    switch (true) {
        case source instanceof Uint8Array: {
            const array = Array.from(source);

            return {
                raw: source,
                array: array,
                hex: stringifySHA256(array)
            }
        }

        case Array.isArray(source): {
            return {
                raw: new Uint8Array(source),
                array: source,
                hex: stringifySHA256(source)
            }
        }
    }

    const array: number[] = [];

    source = source.replace(/[^0-9a-f]/g, "0");
    source = source.slice(0, 64).padEnd(64, "0").toLowerCase();

    for (let i = 0; i < source.length; i += 2) {
        const byteStr = source.slice(i, i + 2);
        
        array.push(parseInt(byteStr, 16));
    }

    return {
        raw: new Uint8Array(array),
        array,
        hex: stringifySHA256(array)
    }
}