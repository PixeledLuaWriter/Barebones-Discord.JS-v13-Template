const { prefix } = require("../../config.json");

export default async (client) => {

    client.manager.init(client.user.id);
    client.logger("internalOperations", `${client.user.username} online!`);
    client.logger("internalOperations", `Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    //Game
    let statuses = {
        name: [
            "/help",
            `Prefix: ${prefix}`,
            `with ${client.users.cache.size} users`,
            `on ${client.guilds.cache.size} servers`,
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