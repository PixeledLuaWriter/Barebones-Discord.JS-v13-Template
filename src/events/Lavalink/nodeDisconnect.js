export default async (client, node, reason) => {

	client.logger("internalOperations", `Node "${node.options.identifier}" disconnect because ${reason}.`);

}