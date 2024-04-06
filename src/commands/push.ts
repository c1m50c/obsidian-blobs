import BlobsPlugin from "../main";

export const pushCommand = async (plugin: BlobsPlugin) => {
    const containerClient = plugin.getContainerClient();
    const vaultFiles = plugin.app.vault.getFiles();

    if (containerClient === undefined) {
        throw "Attempted to execute `pushCommand` without loading a defined `ContainerClient`";
    }

    for (const vaultFile of vaultFiles) {
        const vaultFileBytes = await plugin.app.vault.readBinary(vaultFile);

        await containerClient
            .getBlockBlobClient(vaultFile.path)
            .uploadData(vaultFileBytes);
    }
};
