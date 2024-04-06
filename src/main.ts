import { registerCommands } from "./registry";
import { BlobsSettings, BlobsSettingTab, DEFAULT_SETTINGS } from "./settings";
import { AnonymousCredential, ContainerClient } from "@azure/storage-blob";
import { Plugin } from "obsidian";

export default class BlobsPlugin extends Plugin {
    // @ts-ignore
    // The `settings` field is initialized in the `onload` method, which is the constructor for `Plugin` classes.
    settings: BlobsSettings;

    async onload(): Promise<void> {
        await this.loadSettings();

        this.addSettingTab(new BlobsSettingTab(this.app, this));
        registerCommands(this);
    }

    async loadSettings(): Promise<void> {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            await this.loadData(),
        );
    }

    async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }

    getContainerClient(): ContainerClient {
        return new ContainerClient(
            `https://${this.settings.storageAccount}.blob.core.windows.net/${this.settings.storageContainer}?${this.settings.storageAccountSasToken}`,
            new AnonymousCredential(),
        );
    }
}
