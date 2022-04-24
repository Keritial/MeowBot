import { segment } from "koishi";

export interface Dialogue {
	// 虽然这里是 string，但后面使用的时候会构造成正则表达式
	triggers: RegExp[];
	answers: string[];
	answersWhenCantTrigger?: string[];
	canTrigger?: () => boolean;
}

export const dialogues: Dialogue[] = [
	{
		triggers: [/^喵喵$/],
		answers: ["喵喵在呢"],
	},
	{
		triggers: [/^喵喵好啊?$/],
		answers: ["你好啊", "{username}好啊"],
	},
	{
		triggers: [/^喵喵喜欢(.+)吗$/],
		answers: ["喵喵喜欢{1}呢"],
	},
	{
		triggers: [/^(?:喵喵)?早啊?$/],
		answers: [
			"早啊喵~",
			"{username}你昨天晚上好棒",
			"哦哈哟ﾉ",
			"{username}你昨天晚上有很卖力呢〃∀〃",
		],
		answersWhenCantTrigger: ["早你🐎呢"],
		canTrigger: () => {
			const nowHour = new Date().getHours();
			return nowHour < 12 && nowHour > 4;
		},
	},
	{
		triggers: [/^(?:喵喵)?晚安啊?$/],
		answers: [
			"喵喵也要睡觉了(。´-ω-｀。).zZ",
			"{username}晚安~",
			"挤被窝(¦3ꇤ[▓▓] ヾ(≧▽≦ )3======",
			"今天晚上{username}可不能睡哦(๑>؂∂๑)♪",
		],
	},
	{
		triggers: [/^喵喵一起睡$/],
		answers: ["YEAH！挤被窝(¦3ꇤ[▓▓] ヾ(≧▽≦ )3======"],
	},
	{
		triggers: [/^喵喵大笨蛋$/],
		answers: ["哼，{username}才是大笨蛋呢  ╯^╰"],
	},
	{
		triggers: [/^喵喵我爱你$/],
		answers: [
			"{username}嗯嗯！喵喵也爱你哦owo",
			"喵喵也爱{username}哦",
			"讨厌啦{username}虽然人家也喜欢你~~",
		],
	},
	{
		triggers: [/^来点涩图$/],
		answers: [
			"没有那种东西，再吵就把{username}变成涩图喔\n" +
				segment("image", {
					url: "file:///D:\\Server\\bot\\MeowBot\\asset\\image\\jru5gbyf.bmp",
				}),
		],
	},
	{
		triggers: [/^你好$/],
		answers: ["你好啊，{username}！"]
	}
	// 学会了吗
];
