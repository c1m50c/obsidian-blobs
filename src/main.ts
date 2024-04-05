import { Plugin } from "obsidian";

type BlobsSettings = {};

const DEFAULT_SETTINGS: BlobsSettings = {};

export default class BlobsPlugin extends Plugin {
    settings: BlobsSettings | undefined;

    async onload(): Promise<void> {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            await this.loadData(),
        );
    }
}
