import {env} from "$env/dynamic/private"

export async function runCommand(command: string) {
    if (!env.SERVER_KEY) throw new Error("No SERVER_KEY in env");

    const res = await fetch(new URL("/v1/server/command", "https://api.erlc.gg"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "server-key": env.SERVER_KEY
        },
        body: JSON.stringify({
            command: command
        })
    })

    if (!res.ok) console.warn("Run command responded with ", res.status)
}