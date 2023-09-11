

async function addUserRole(member, roleId) {
	const role = member.guild.roles.cache.get(roleId);
	await member.roles.add(role);
	await discord.send('1114959988008435793', `**Add role ${role.name} for ${member.nickname}**`)
}

async function removeUserRole(member, roleId) {
	const role = member.guild.roles.cache.get(roleId);
	await member.roles.add(role);
	await discord.send('1114959988008435793', `**Remove role ${role.name} for ${member.nickname}**`)
}

module.exports = async (user, member, serverRoles) => {

	const hasOpenProjects = user.products.filter(e => e.status === 'In progress').length > 0 || false;
	const hasActiveRole = member._roles.includes('1143248679180972053');
	const hasInHoliday = false; // Feature

	const hasActiveAccount = hasOpenProjects && user.active && !hasInHoliday; 

	const cohortDuringFoundations = user.curriculum_cohort || user.cohort;
	const cohortRoleName = `C#${cohortDuringFoundations.number}`;


	if (hasActiveAccount && !hasActiveRole) 
		await addUserRole(member, '1143248679180972053');
	if (!hasActiveAccount && hasActiveRole) 
		await removeUserRole(member, '1143248679180972053');

	for (const [roleId, role] of serverRoles)
	{
		const isMyCohort = cohortRoleName === role.name;
		const hasThisRole = member._roles.includes(role.id);

		if (isMyCohort && !hasThisRole)
			await addUserRole(member, role.id);
		else if (!isMyCohort && hasThisRole)
			await removeUserRole(member, role.id);

	}
}