//contains functions that are too small and particular to merit their own module, so instead they are grouped here, inside the helpers
//module. The functions are meant to be of use (hence, the name “helpers”) throughout the entire project.

module.exports = {
    setupRoutes: setupRoutes
};

function setupRoutes(server, lib) {
    for (controller in lib.controllers) {
        cont = lib.controllers[controller]();
        cont.setUpActions(server)
    }
}