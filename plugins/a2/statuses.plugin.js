state.plugins.add({
    format: 1,
    version: "0.0.2",
    namespace: "a2",
    id: "statuses",
    entrypoint: `(state) => {
        console.log('[ A2 | STATUS ] Plugin init!');
        try {
          // Status text to loop through (in order, yes);
            let xstatus = ["❤️‍🔥 넌 내가 저지른 유일한 실수였어", "❤️‍🔥 Þú varst einu mistökin sem ég gerði", "❤️‍🔥 Fuiste el único error que cometí", "❤️‍🔥 You were the only mistake I made"];
            let i = 0;
            setInterval(async () => {
                const presence = "Focus"
                if (i >= xstatus.length) i = 0;
                const statusText = xstatus[i];

                await fetch(
                    "https://api.revolt.chat/users/@me",
                    {
                        method: "PATCH"
                        , body: JSON.stringify({
                            status: { text: statusText, presence: presence }
                        }),
                        headers: {
                            'x-session-token': window.controllers.client.getReadyClient().api.authentication.revolt.token,
                        }
                    }).then(res2 => res2.json()).then(
                        json2 => {
                            return console.log("[A2/STATUS] Setting Status!")
                        }
                    )
                i++;
            }, 31000)
        } catch (err) {
            console.log(err)
        }
        return {
            onClient: c => console.log("[A2/STATUS] Hello!"),
            onUnload: () => console.log('[A2/STATUS] bye!'),
            onMessage: msg => {
                console.log(msg)
            }
        }
    }`
})
