import * as os from 'os';
import * as util from 'util';

import * as toolCache from '@actions/tool-cache';
import * as core from '@actions/core';

function getDownloadURL(version: string): string {
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

async function downloadMerlin(version: string) {
    let cachedToolpath = toolCache.find('merlin32', version);
    if (!cachedToolpath) {
        let downloadPath;
        try {
            downloadPath = await toolCache.downloadTool(getDownloadURL(version));
        } catch (exception) {
            console.log(exception)
            throw new Error(util.format("Failed to download Merlin32 from location ", getDownloadURL(version)));
        }
        const extractedPath = await toolCache.extractZip(downloadPath);
        cachedToolpath = await toolCache.cacheDir(extractedPath, 'merlin32', version);
    }
    core.addPath(cachedToolpath)
    return cachedToolpath
}

async function run() {
    let version = core.getInput('version');
    if (!version) {
        version = 'v1.1.8d';  // default
    }
    
    console.log(`INPUTS - version '${version}'`);

    await downloadMerlin32(version);
    console.log(`Merlin32 version: '${version}' has been downloaded and added to path`);
}

run().catch(core.setFailed);