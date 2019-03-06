module.exports.logError = function logError(err) {
    console.log(`[${+new Date()}] Error encountered`);
    console.error(err);
}