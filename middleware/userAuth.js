const options = {
    excluded: [
        'register___en'
    ]
}

export default function ({ app, route }) {
    const notExcluded = !options.excluded.includes(route.name)
    const notLoggedIn = !app.$cookies.get('loggedIn')
    // If the user is not authenticated
    if (notExcluded && notLoggedIn) {
        return app.$auth.redirect("login")     
    }
}