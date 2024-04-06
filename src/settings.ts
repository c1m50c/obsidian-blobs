import BlobsPlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export type BlobsSettings = {
    storageAccount: string;
    storageAccountSasToken: string;
    storageContainer: string;
};

export const DEFAULT_SETTINGS: BlobsSettings = {
    storageAccount: "",
    storageAccountSasToken: "",
    storageContainer: "",
};

export class BlobsSettingTab extends PluginSettingTab {
    plugin: BlobsPlugin;

    constructor(app: App, plugin: BlobsPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName("Storage Account")
            .setDesc(
                "Name of the storage account to use when syncing with Azure Blob Storage",
            )
            .addText((text) =>
                text
                    .setPlaceholder("Account Name")
                    .setValue(this.plugin.settings!.storageAccount)
                    .onChange(async (x) => {
                        this.plugin.settings!.storageAccount = x;
                        await this.plugin.saveSettings();
                    }),
            );

        new Setting(containerEl)
            .setName("Storage Account SAS Token")
            .setDesc(
                "SAS Token to use when authenticating with Azure Blob Storage",
            )
            .addText((text) =>
                text
                    .setPlaceholder("SAS Token")
                    .setValue(this.plugin.settings!.storageAccountSasToken)
                    .onChange(async (x) => {
                        this.plugin.settings!.storageAccountSasToken = x;
                        await this.plugin.saveSettings();
                    }),
            );

        new Setting(containerEl)
            .setName("Storage Container")
            .setDesc(
                "Container to push and pull changes from when syncing with Azure Blob Storage",
            )
            .addText((text) =>
                text
                    .setPlaceholder("Container Name")
                    .setValue(this.plugin.settings!.storageContainer)
                    .onChange(async (x) => {
                        this.plugin.settings!.storageContainer = x;
                        await this.plugin.saveSettings();
                    }),
            );
    }
}
