export const lib = Deno.dlopen("./assets/dll/lz4y-native.dll", {
    LZ4_Compress: {
        parameters: ["pointer", "i32", "pointer", "i32"],
        result: "i32",
    },
    LZ4_MaxCompressedSize: {
        parameters: ["i32"],
        result: "i32",
    },
});