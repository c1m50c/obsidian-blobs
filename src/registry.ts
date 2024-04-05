import { pullCommand } from "./commands/pull";
import { pushCommand } from "./commands/push";
import { Command } from "obsidian";

/**
 * An array of `Command`s to be added to the `BlobsPlugin` when it's loaded into Obsidian.
 */
export const COMMANDS: Command[] = [
    {
        id: "blobs-pull",
        name: "Blobs: Pull",
        callback: pullCommand,
    },
    {
        id: "blobs-push",
        name: "Blobs: Push",
        callback: pushCommand,
    },
];
