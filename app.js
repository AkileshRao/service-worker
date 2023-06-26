const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("./sw.js")
            registration.addEventListener("updatefound", () => {
                console.log("New worker being installed => ", registration.installing)
            })
            if (registration.installing) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active!");
            }
        } catch (err) {
            console.error("Registration failed")
        }
    }
}

registerServiceWorker()