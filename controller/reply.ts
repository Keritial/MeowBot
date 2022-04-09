import { Context, segment } from "koishi";
import { generateRandomNumber } from "../util/random";

export const name = "reply";

interface Dialogue {
	// 虽然这里是 string，但后面使用的时候会构造成正则表达式
	trigger: string[];
	answer: string[];
}

const dialogues: Dialogue[] = [
	{
		trigger: ["喵喵"],
		answer: ["喵喵在呢"],
	},
	{
		trigger: ["喵喵好啊?"],
		answer: ["你好啊", "{username}好啊"],
	},
	{
		trigger: ["喵喵喜欢(.+)吗"],
		answer: ["喵喵喜欢{1}呢"],
	},
	{
		trigger: ["(?:喵喵)?早啊?"],
		answer: [
			"早啊喵~",
			"{username}你昨天晚上好棒",
			"哦哈哟ﾉ",
			"{username}你昨天晚上有很卖力呢〃∀〃",
		],
	},
	{
		trigger: ["(?:喵喵)?晚安啊?"],
		answer: [
			"喵喵也要睡觉了(。´-ω-｀。).zZ",
			"{username}晚安~",
			"挤被窝(¦3ꇤ[▓▓] ヾ(≧▽≦ )3======",
			"今天晚上{username}可不能睡哦(๑>؂∂๑)♪",
		],
	},
	{
		trigger: ["喵喵一起睡"],
		answer: ["YEAH！挤被窝(¦3ꇤ[▓▓] ヾ(≧▽≦ )3======"],
	},
	{
		trigger: ["喵喵大笨蛋"],
		answer: ["哼，{username}才是大笨蛋呢  ╯^╰"],
	},
	{
		trigger: ["喵喵我爱你"],
		answer: [
			"{username}嗯嗯！喵喵也爱你哦owo",
			"喵喵也爱{username}哦",
			"讨厌啦{username}虽然人家也喜欢你~~",
		],
	},
	{
		trigger: ["来点涩图"],
		answer: [
			"没有那种东西，再吵就把{username}变成涩图喔\n" +
				segment("image", {
					url: "http://gchat.qpic.cn/gchatpic_new/1280056591/1021208966-2527407158-4B1863F2E0F48F9AFF14E08996B14146/0?term=2",
				}),
		],
	},
];

//function formatter(string: string, ...args: string[]): string
function formatter(
	string: string,
	args: { [x: string | number]: string | number }
): string {
	console.log(args);
	return string.replace(/{(.+?)}/g, function (match, id) {
		return typeof args[id] !== "undefined" ? String(args[id]) : match;
	});
}

export function apply(ctx: Context) {
	const logger = ctx.logger("Reply");

	// 我都不知道我在写什么
	// 能跑就行（（
	ctx.middleware(async (session) => {
		let result: string[] | undefined;
		let answer: string | undefined;
		let userDataToGet: string[] | undefined;
		for (let i of dialogues) {
			if (result) {
				break;
			}
			for (let t of i.trigger) {
				result =
					session.content?.match(new RegExp(`^${t}$`)) || undefined;
				if (result) {
					answer =
						i.answer?.[generateRandomNumber(0, i.answer?.length!)];
					userDataToGet = answer.match(/(?<={)[^\d]+(?=})/g) || [];
					break;
				}
			}
		}
		if (result && answer && typeof userDataToGet !== "undefined") {
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
