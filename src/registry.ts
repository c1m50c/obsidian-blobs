import { pullCommand } from "./commands/pull";
import { pushCommand } from "./commands/push";
import BlobsPlugin from "./main";
import { Command } from "obsidian";

export const registerCommands = (plugin: BlobsPlugin) => {
    const COMMANDS: Command[] = [
        {
            id: "blobs-pull",
            name: "Pull Changes",
            callback: () => pullCommand(plugin),
        },
        {
            id: "blobs-push",
            name: "Push Changes",
            callback: () => pushCommand(plugin),
        },
    ];

    for (const command of COMMANDS) {
        plugin.addCommand(command);
    }
};
