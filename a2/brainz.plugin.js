 state.plugins.add({
    format: 1,
    version: "0.0.1",
    namespace: "a2",
    id: "brainz",
    entrypoint: `(state) => {
        console.log('[my-plugin] Plugin init!');
        if (localStorage.getItem("brainz-user") == null) {
            console.log("Please set your 'brainz-user' in localStorage!")
            console.log("ie: localStorage.setItem('brainz-user', 'USERNAME_HERE')")
        } else {
        try {
            setInterval(()=>{
            return fetch(
                "https://api.listenbrainz.org/1/user/" + localStorage.getItem("brainz-user") + "/playing-now"
            ).then((res) => res.json()).then(async (json) => {
                const presence = "Focus"
                const statusText = '🎶 | ' + ((json.payload?.listens[0]?.track_metadata?.track_name) || "") + '- ' + (json.payload?.listens[0]?.track_metadata?.artist_name || "")
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

                            return console.log("Setting Brainz As Status!")
                        }
                    )
            })
        }, 61000)
        } catch (err) {
            console.log(err)
        }
    }
        return {
            onClient: c => console.log("[BRAINZ] Hello!"),
            onUnload: () => console.log('[BRAINZ] bye!'),
            onMessage: msg => {
                console.log(msg)
            }
        }
    }`
})
