import { Context } from "koishi";
import { generateRandomNumber } from "../util/random";
import { dialogues } from "../config/dialogue";
import { User } from "koishi";

export const name = "reply";

//function formatter(string: string, ...args: string[]): string
function formatter(
	string: string,
	args: { [x: string | number]: string | number }
): string {
	console.log(string, args);
	return string.replace(/{(.+?)}/g, function (match, id) {
		return typeof args[id] !== "undefined" ? String(args[id]) : match;
	});
}

export function apply(ctx: Context) {
	const logger = ctx.logger(name);

	// 我都不知道我在写什么
	// 能跑就行（（
	ctx.middleware(async (session) => {
		let result: string[] | null = null;
		let answer: string | null = null;
		let userDataToGet: (keyof User)[] | null = null;
		for (const dialogue of dialogues) {
			if (result) {
				break;
			}
			for (const trigger of dialogue.triggers) {
				result = session.content?.match(trigger) || null;
				if (result) {
					const answers = dialogue.answers || dialogue.answer?.();
					if (!answers) {
						break;
					}
					answer = answers[generateRandomNumber(0, answers.length)];
					userDataToGet = (answer.match(/(?<={)[^\d]+(?=})/g) ||
						[]) as (keyof User)[];
					break;
				}
			}
		}
		if (result && answer && userDataToGet !== null) {
			logger.info(
				result,
				answer,
				session.username,
				session.userId,
				session.channelName,
				session.channelId
			);

			return formatter(answer, {
				// 这是一个 warpper
				...(result as { [x: number]: string }),
				// 这是另一个 warpper
				...(userDataToGet
					? await session.getUser(
							session.userId || "",
							userDataToGet.filter(
								(item) => !["username"].includes(item)
							)
					  )
					: {}),
				username: session.username,
			});
		}
	});
}
