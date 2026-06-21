import { deeplevel } from "../deps.ts";

export const NSO0_HEADER = new deeplevel.Struct({
    endianness: deeplevel.types.Endianness.Little, // switch is LE
    align: deeplevel.types.Alignment.Packed, // no padding
    fields: [
        { name: "Signature", type: new deeplevel.NativeArray({ length: 0x04, type: deeplevel.constants.DenoPrimitiveTypes.u8 }) }, // NSO0
        { name: "Version", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "Reserved", type: new deeplevel.NativeArray({ length: 0x04, type: deeplevel.constants.DenoPrimitiveTypes.u8 }) },
        { name: "Flags", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "TextFileOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "TextMemoryOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "TextSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "ModuleNameOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 }, // 0x100
        { name: "RoFileOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "RoMemoryOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "RoSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "ModuleNameSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "DataFileOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "DataMemoryOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "DataSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "BssSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "ModuleId", type: new deeplevel.NativeArray({ length: 0x20, type: deeplevel.constants.DenoPrimitiveTypes.u8 }) },
        { name: "TextFileSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "RoFileSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "DataFileSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "Reserved2", type: new deeplevel.NativeArray({ length: 0x1C, type: deeplevel.constants.DenoPrimitiveTypes.u8 }) },
        { name: "EmbeddedOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "EmbeddedSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "DynStrOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "DynStrSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "DynSymOffset", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "DynSymSize", type: deeplevel.constants.DenoPrimitiveTypes.u32 },
        { name: "TextHash", type: new deeplevel.NativeArray({ length: 0x20, type: deeplevel.constants.DenoPrimitiveTypes.u8 }) },
        { name: "RoHash", type: new deeplevel.NativeArray({ length: 0x20, type: deeplevel.constants.DenoPrimitiveTypes.u8 }) },
        { name: "DataHash", type: new deeplevel.NativeArray({ length: 0x20, type: deeplevel.constants.DenoPrimitiveTypes.u8 }) },
    ]
})