import { Context } from "koishi";
import { generateRandomNumber } from "../util/random";
import { dialogues } from "../config/dialogue";

export const name = "reply";

//function formatter(string: string, ...args: string[]): string
function formatter(
	string: string,
	args: { [x: string | number]: string | number }
): string {
	return string.replace(/{(.+?)}/g, function (match, id) {
		return typeof args[id] !== "undefined" ? String(args[id]) : match;
	});
}

export function apply(ctx: Context) {
	const logger = ctx.logger("Reply");

	// 我都不知道我在写什么
	// 能跑就行（（
	ctx.middleware(async (session) => {
		let result: string[] | null = null;
		let answer: string | null = null;
		let userDataToGet: string[] | null = null;
		for (const dialogue of dialogues) {
			const canTrigger = dialogue.canTrigger
				? dialogue.canTrigger()
				: true;
			if (canTrigger===false&&!dialogue.answersWhenCantTrigger) {
				continue;
			}
			if (result) {
				break;
			}
			for (const trigger of dialogue.triggers) {
				result = session.content?.match(new RegExp(trigger)) || null;
				if (result) {
					const answers =
						!canTrigger && dialogue.answersWhenCantTrigger
							? dialogue.answersWhenCantTrigger
							: dialogue.answers;
					answer = answers[generateRandomNumber(0, answers.length)];
					userDataToGet = answer.match(/(?<={)[^\d]+(?=})/g) || [];
					break;
				}
			}
		}
		if (result && answer && userDataToGet !== null) {
			logger.info(result, answer, userDataToGet);

			return formatter(answer!, {
				// 这是一个 warpper
				...((input: string[]) => {
					let output: { [x: number]: string } = {};
					for (let i in input) {
						output[i] = input[i];
					}
					return output;
				})(result || []),
				// 这是另一个 warpper
				//...(userDataToGet
				//	? await (async (
				//			userData,
				//			dataToGet: string[]
				//	  ): Promise<{ [x: string]: string | number }> => {
				//			let output: { [x: string]: string | number } = {};
				//			const keys = dataToGet;
				//			let data = await userData.getUser(session.userId);
				//			for (let key of keys) {
				//				output[key] = (data as { [x: string]: any })[
				//					key
				//				];
				//			}
				//			return output;
				//	  })(session, userDataToGet)
				//	: {}),
				username: session.username,
			});
		}
	});
}
