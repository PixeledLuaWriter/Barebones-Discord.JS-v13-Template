module.exports = async (client, node, error) => {

	client.logger("errorEmitted", `Node "${node.options.identifier}" encountered an error: ${error.message}.`);

}