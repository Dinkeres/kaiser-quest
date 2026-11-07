
define(['text!../config/config_build.json'],
function(build) {
    var isSecure = window.location.protocol === "https:",
        defaultPort = window.location.port || (isSecure ? 443 : 80);
    var config = {
        // Use the page origin by default so a deployed server works for every
        // player, rather than attempting to connect to each player's localhost.
        dev: { host: window.location.hostname || "localhost", port: defaultPort, dispatcher: false },
        build: JSON.parse(build)
    };
    
    //>>excludeStart("prodHost", pragmas.prodHost);
    require(['text!../config/config_local.json'], function(local) {
        try {
            config.local = JSON.parse(local);
        } catch(e) {
            // Exception triggered when config_local.json does not exist. Nothing to do here.
        }
    });
    //>>excludeEnd("prodHost");
    
    return config;
});
