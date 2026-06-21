import { filetendo } from "../deps.ts";

export function extpatchNSO0(nso0: filetendo.SourceNSO0, code: Uint8Array, section: ".ro" | ".text" | ".data") {
    switch (section) {
        case ".ro": {
            nso0.sections.ro = new Uint8Array([ ...nso0.sections.ro, ...code ]);
            break;
        }

        case ".text": {
            nso0.sections.text = new Uint8Array([ ...nso0.sections.text, ...code ]);
            break;
        }
        
        case ".data": {
            nso0.sections.data = new Uint8Array([ ...nso0.sections.data, ...code ]);
            break;
        }
        
    }
}