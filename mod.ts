let TARGET_NSO = Deno.args[0];

if (!TARGET_NSO) {
    TARGET_NSO = "NULL";
} else if (way.isRelative(TARGET_NSO)) {
    if (way.isRelative(TARGET_NSO)) TARGET_NSO = way.join(way.cwd(), TARGET_NSO);
}

if (Deno.build.standalone) {
    Deno.chdir(way.dirpath(way.execPath()));
} else {
    Deno.chdir(way.dirpath(import.meta.url));
}

if (TARGET_NSO === "NULL") TARGET_NSO = "./source/exefs/main";

import { ParsedNSO0, SourceNSO0 } from "./modules/filetendo/lib/nso0/types.ts";
import { isFile } from "./lib/is-file.ts";
import { way } from "./deps.ts"

import * as filetendo from "./modules/filetendo/mod.ts";
import * as debug from "./lib/debug.ts";
import * as cody from "./modules/cody/mod.ts"

const DEBUG = Deno.env.get("DEBUG");

if (DEBUG) {
    debug.log("RUNNING IN DEBUG MODE");
}

const PATCH_SOURCE = {
    section: {
        text: (Deno.args[1] || "NULL") === "NULL" ? "./patch/patch.sectext" : way.normalize(Deno.args[1]),
        ro: (Deno.args[2] || "NULL") === "NULL" ? "./patch/patch.secro" : way.normalize(Deno.args[2]),
        data: (Deno.args[3] || "NULL") === "NULL" ? "./patch/patch.secdata" : way.normalize(Deno.args[3]),
    },

    static: {
        text: (Deno.args[4] || "NULL") === "NULL" ? "./patch/patch.nsotext" : way.normalize(Deno.args[4]),
        ro: (Deno.args[5] || "NULL") === "NULL" ? "./patch/patch.nsoro" : way.normalize(Deno.args[5]),
        data: (Deno.args[6] || "NULL") === "NULL" ? "./patch/patch.nsodata" : way.normalize(Deno.args[6]),
    }
}

try {
    await Deno.mkdir("./NSMBUDXMOD/exefs/", { recursive: true });

    if (DEBUG) {
        await Deno.mkdir("./extracted/", { recursive: true });
        await Deno.mkdir("./debug/", { recursive: true });
    }
} catch(e) {
    debug.error(`[main]: Failed to setup enviroment due to ${(e as Error).message}`);
    Deno.exit(0x01)
}

let data: Uint8Array<ArrayBuffer> = new Uint8Array();   // @ts-ignore .
let parsedNSO0: ParsedNSO0 = {};                        // @ts-ignore .
let sourceNSO0: SourceNSO0 = {};
let encodedNSO0: Uint8Array = new Uint8Array();

debug.log(`[main]: Target NSO0: ${TARGET_NSO}`)

try {
    data = await Deno.readFile(TARGET_NSO);
} catch {
    debug.error("[main]: NSO0 file doesn't exists");
    Deno.exit(0x02);
}

try {
    debug.log(`[main]: Parsing NSO0...`);
    parsedNSO0 = await filetendo.parseNSO0(data);
    sourceNSO0 = filetendo.convertParsedNSO0ToSourceNSO0(parsedNSO0);
} catch(e) {
    debug.error((e as Error).message);
    Deno.exit(0x03);
}

try {
    if (DEBUG) {
        debug.log(`[main]: Saving debug info of unpatched NSO0...`);
        const debugSource = Deno.inspect(parsedNSO0, { colors: false });
        await Deno.writeTextFile("./debug/unpatched.nsoinfo", debugSource);
    }
} catch(e) {
    debug.error((e as Error).message);
    Deno.exit(0x04);
}

try {
    if (DEBUG) {
        debug.log("[main]: Writing extracted sections to ./extracted");

        await Deno.writeFile("./extracted/text.bin", parsedNSO0.sections.text.decompressed);
        await Deno.writeFile("./extracted/ro.bin", parsedNSO0.sections.ro.decompressed);
        await Deno.writeFile("./extracted/data.bin", parsedNSO0.sections.data.decompressed);
    }
} catch(e) {
    debug.error((e as Error).message);
    Deno.exit(0x05);
};

try {
    console.log(PATCH_SOURCE)
    if (await isFile(PATCH_SOURCE.static.text)) {
        const patch = await Deno.readTextFile(PATCH_SOURCE.static.text);
        debug.log(`[main]: Loaded static text patch`);

        cody.patchNSO0(sourceNSO0, patch, ".text");
    }
    
    if (await isFile(PATCH_SOURCE.static.ro)) {
        const patch = await Deno.readTextFile(PATCH_SOURCE.static.ro);
        debug.log(`[main]: Loaded static ro patch`);

        cody.patchNSO0(sourceNSO0, patch, ".ro");
    }
    
    if ((await isFile(PATCH_SOURCE.static.data))) {
        const patch = await Deno.readTextFile(PATCH_SOURCE.static.data);
        debug.log(`[main]: Loaded static data patch`);

        cody.patchNSO0(sourceNSO0, patch, ".data");
    }
} catch(e) {
    console.log(e)
    debug.error("[main]: Failed to parse/apply patches, syntax error?");
    Deno.exit(0x06);
}

try {
    if (await isFile(PATCH_SOURCE.section.text)) {
        const patch = await Deno.readFile(PATCH_SOURCE.section.text);
        debug.log(`[main]: Loaded extension text patch`);

        cody.extpatchNSO0(sourceNSO0, patch, ".text");
    }
    
    if (await isFile(PATCH_SOURCE.section.ro)) {
        const patch = await Deno.readFile(PATCH_SOURCE.section.ro);
        debug.log(`[main]: Loaded extension ro patch`);

        cody.extpatchNSO0(sourceNSO0, patch, ".ro");
    }
    
    if (await isFile(PATCH_SOURCE.section.data)) {
        const patch = await Deno.readFile(PATCH_SOURCE.section.data);
        debug.log(`[main]: Loaded extension data patch`);

        cody.extpatchNSO0(sourceNSO0, patch, ".data");
    }
} catch {
    debug.error("[main]: Failed to parse/apply section extension, syntax error?");
    Deno.exit(0x07);
}

try {
    if (DEBUG) {
        debug.log("[main]: Writing patched sections to ./extracted");

        await Deno.writeFile("./extracted/patched-text.bin", sourceNSO0.sections.text);
        await Deno.writeFile("./extracted/patched-ro.bin", sourceNSO0.sections.ro);
        await Deno.writeFile("./extracted/patched-data.bin", sourceNSO0.sections.data);
    }
} catch(e) {
    debug.error((e as Error).message);
    Deno.exit(0x08);
}

try {
    encodedNSO0 = await filetendo.craftNSO0(sourceNSO0);
} catch(e) {
    debug.error((e as Error).message);
    Deno.exit(0x09);
}

try {
    if (DEBUG) {
        debug.log(`[main]: Saving debug info of patched NSO0...`);
        const debugSource = Deno.inspect((await filetendo.parseNSO0(encodedNSO0)), { colors: false });
        await Deno.writeTextFile("./debug/patched.nsoinfo", debugSource);
    }
} catch(e) {
    debug.error((e as Error).message);
    Deno.exit(0x0A);
}

try {
    debug.log("[main]: Writing new NSO to ./NSMBUDXMOD/exefs/main");
    await Deno.writeFile("./NSMBUDXMOD/exefs/main", encodedNSO0);
} catch(e) {
    debug.error((e as Error).message);
    Deno.exit(0x0B);
}