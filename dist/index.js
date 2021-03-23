"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(require("os"));
const util = __importStar(require("util"));
const toolCache = __importStar(require("@actions/tool-cache"));
const core = __importStar(require("@actions/core"));
function getDownloadURL(version) {
    switch (os.type()) {
        case 'Linux':
            return util.format('https://github.com/digarok/merlin32/releases/download/%s/merlin32-ubuntu-latest-%s.zip', version, version);
        case 'Darwin':
            return util.format('https://github.com/digarok/merlin32/releases/download/%s/merlin32-macos-latest-%s.zip', version, version);
        case 'Windows_NT':
        default:
            return util.format('https://github.com/digarok/merlin32/releases/download/%s/merlin32-windows-latest-%s.zip', version, version);
    }
}
function downloadMerlin32(version) {
    return __awaiter(this, void 0, void 0, function* () {
        let cachedToolpath = toolCache.find('merlin32', version);
        if (!cachedToolpath) {
            let downloadPath;
            try {
                downloadPath = yield toolCache.downloadTool(getDownloadURL(version));
            }
            catch (exception) {
                console.log(exception);
                throw new Error(util.format("Failed to download Merlin32 from location ", getDownloadURL(version)));
            }
            const extractedPath = yield toolCache.extractZip(downloadPath);
            cachedToolpath = yield toolCache.cacheDir(extractedPath, 'merlin32', version);
        }
        core.addPath(cachedToolpath);
        return cachedToolpath;
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let version = core.getInput('version');
        if (!version) {
            version = 'v1.1.8d';
        }
        console.log(`INPUTS - version '${version}'`);
        yield downloadMerlin32(version);
        console.log(`Merlin32 version: '${version}' has been downloaded and added to path`);
    });
}
run().catch(core.setFailed);
