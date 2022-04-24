import { Context } from "koishi";

export const name = "command/manage";

export function apply(ctx: Context) {
	const logger = ctx.logger(name);

	ctx.command("getauthority [id:string]")
		.alias("getauth", "查询权限")
		.userFields(["authority"])
		.action(async (argv, id) => {
			const userAuthority = argv.session?.user?.authority || -1;
			if (id && userAuthority < 2) {
				return "You don't have permission to get other's authority.";
			}
			const targetId = id || argv.session?.userId;
			const resultAuthority = id
				? (await (
						await argv.session?.getUser(targetId, ["authority"])
				  )?.authority) || -1
				: userAuthority;
			logger.info(
				"User %s with authority %d requested %s's authority level %d.",
				argv.session?.userId,
				userAuthority,
				targetId,
				resultAuthority
			);
			return `${targetId} authority is ${resultAuthority}`;
		});
	ctx.command("authtest1", { authority: 1 }).action(
		() => "auth1 test has passed"
	);
	ctx.command("authtest2", { authority: 2 }).action(
		() => "auth2 test has passed"
	);
	ctx.command("authtest3", { authority: 3 }).action(
		() => "auth3 test has passed"
	);
	ctx.command("authtest4", { authority: 4 }).action(
		() => "auth4 test has passed"
	);

	ctx.command("setauthority <level:number> [user:string]", {
		authority: 1,
	})
		.alias("setauth", "设置权限")
		.userFields(["authority"])
		.action(async (argv, level, id) => {
			if (!level && level !== 0) {
				return "You must 指定 a level to set";
			}
			const userAuthority = argv.session?.user?.authority || -1;
			const targetId = id || argv.session?.userId || "";
			logger.info(
				"User %s with authority %d edit user %d's authority to %d",
				argv.session?.userId,
				userAuthority,
				id,
				level
			);
			if (userAuthority < level) {
				logger.warn(
					"User %s tried to set authority but failed.",
					argv.session?.userId
				);
				return "You don't have permission to set a authority level higher than yourself.";
			} else {
				argv.session?.app.database.set(
					"user",
					{
						id: (
							await argv.session?.app.database.getUser(
								"onebot",
								targetId
							)
						)?.id,
					},
					{ authority: level }
				);
				
				return "Authority successfully set.";
			}
		});
}
