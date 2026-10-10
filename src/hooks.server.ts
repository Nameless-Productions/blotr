import {Cron} from "croner"
import { getServerInfo } from "./lib/erlc/getServerInfo";
import { db } from "./lib/db";

new Cron("*/5 * * * * *", async () => {
    const logs = await getServerInfo({CommandLogs: true, ModCalls: true});

    if (!logs.CommandLogs || !logs.ModCalls) return console.warn("API returned no command or mod call logs");

    for (const commandLog of logs.CommandLogs) {
        const commandDB = await db.orm.public.CommandLog.where((l) => l.timestamp.eq(commandLog.Timestamp)).all();
        if (commandDB.length == 1) return;

        const robloxId = commandLog.Player.split(":")[1];

        let userId: number | null = null;

        const user = await db.orm.public.User.where((u) => u.robloxID.eq(robloxId)).first();

        if (user) userId = user.id;

        await db.orm.public.CommandLog.create({
            robloxUserId: robloxId,
            timestamp: commandLog.Timestamp,
            command: commandLog.Command,
            userId
        })
    }
})