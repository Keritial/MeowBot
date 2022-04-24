import { Context } from "koishi";

export const name = "command/debug";

export function apply(ctx: Context) {
	const logger = ctx.logger(name);
	ctx.command("say <content:text>", { authority: 3 }).action(
		({ session }, content) => {
			logger.info(
				`Said in ${session?.guildId || session?.userId} by ${
					session?.userId
				}: `,
				content
			);
			return content;
		}
	);

	ctx.command("tell <target:string> <content:text>", {
		authority: 3,
	}).action(({ session }, target, content) => {
		const type = target.charAt(0);
		const bot = ctx.bots[0];
		if (type === "g") {
			bot.sendMessage(target.slice(1), content);
		} else {
			if (isNaN(Number(type))) {
				target = target.slice(1);
			}
			bot.sendPrivateMessage(target, content);
		}
		logger.info(`Told to ${target} by ${session?.userId}: `, content);
	});
}
