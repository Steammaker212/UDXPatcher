import { way } from "../deps.ts";

export async function isFile(path: string) {
    path = way.normalize(path);

    if (way.isRelative(path)) {
        path = way.join(Deno.cwd(), path);
    }

    try {
        return (await Deno.stat(path)).isFile;
    } catch {
        return false;
    }
}