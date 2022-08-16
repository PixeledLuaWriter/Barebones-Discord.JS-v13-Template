export default async (client, player, payload) => {

	if (payload.byRemote == true) {
        player.destroy();
    }

    client.logger.log("errorEmitted", `Socket has been closed because ${payload.reason} in [${player.guild}]`);

}