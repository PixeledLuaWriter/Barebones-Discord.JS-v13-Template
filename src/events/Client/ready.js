const { prefix } = require("../../config.json");

module.exports = async (client) => {

    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

    //Game
    let statuses = {
        name: [
            "/help",
            `Prefix: ${prefix}`,
            "digesting time",
            "scouraging the universe for improbabilities"
        ],
        type: [
            "WATCHING",
            "PLAYING",
            "STREAMING"
        ]
    }
    setInterval(function() {
  		let activity_name = statuses.name[Math.floor(Math.random() * statuses.name.length)];
        let activity_type = statuses.type[Math.floor(Math.random() * statuses.type.length)];
  		client.user.setPresence({
              status: "online",
              activities: [{
                name: activity_name,
                type: activity_type
              }]
          });
  	}, 10000)

}