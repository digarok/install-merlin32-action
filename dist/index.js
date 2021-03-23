"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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
