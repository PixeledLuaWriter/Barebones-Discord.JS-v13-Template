const { MessageEmbed, Client } = require("discord.js");

module.exports = async (client, interaction) => {
	 let prefix = await client.db.get(`prefix_${interaction.guild.id}`);
      if (prefix === null) prefix = client.prefix;
      
 let color = client.embedColor;
     
     if(interaction.isCommand()) {

        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
        
        if (SlashCommands.owner && interaction.author.id !== `${client.owner}`) {
          await interaction.editReply({
          content: `Only <@${client.owner}> can use this command!`
        }).catch(() => {});
        }
        const player = interaction.client.manager.get(interaction.guildId);

        if (SlashCommands.player && !player) {
          await interaction.editReply({
                    content: `There is no player for this guild.`
                }).catch(() => {});
        }
        if (SlashCommands.inVoiceChannel && !interaction.member.voice.channel) { 
          await interaction.editReply({
          content: `You must be in a voice channel!`
        }).catch(() => {});
        }
        if (SlashCommands.sameVoiceChannel && interaction.member.voice.channel !== interaction.guild.me.voice.channel) { 
           await interaction.editReply({
                    content: `You must be in the same channel as ${interaction.client.user}`
                }).catch(() => {}); 
         }
                
        try {
            await SlashCommands.run(client, interaction, prefix);
        } catch (error) {
            interaction.reply({
                ephemeral: true,
                content: `An unexpected error occured`
            })
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
        
}

