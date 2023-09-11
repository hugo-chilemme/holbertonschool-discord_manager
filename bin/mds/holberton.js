const holberton = require('./libs/holberton.lib');
const StudentController= require('./functs/StudentController');

async function scanMembers() {
	const users = await holberton.get('users?campus=TLS');
	// const message = await sendMessage('1114959988008435793', 'Scanning updated members roles');
	const server = client.guilds.cache.get('976357520895528960');
	const members = await server.members.fetch(true);
	const roles = server.roles.cache.filter(role => role.name.match(/^C#\d+$/));
	const serverRoles = new Map(roles); 

	for (const student of users)
	{
		const user = await holberton.get('users/' + student.id);
		if (!user.discord_tag) continue;
		const member = members.find(u => 
			u.user.username.toLowerCase() === user.discord_tag.split('#')[0].toLowerCase()
		);
		if (!member) continue;


		StudentController(user, member, serverRoles);
	}
}

client.on('ready', () => {
	scanMembers();
});