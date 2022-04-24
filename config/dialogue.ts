import { segment } from "koishi";
import moment from "moment";

export interface Dialogue {
	// 虽然这里是 string，但后面使用的时候会构造成正则表达式
	triggers: RegExp[];
	answers?: string[];
	answer?: () => string[];
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
		answer: () => {
			const nowHour = moment().hour();
			if (nowHour < 12 && nowHour > 4) {
				return [
					"早啊喵~",
					"{username}你昨天晚上好棒",
					"哦哈哟ﾉ",
					"{username}你昨天晚上有很卖力呢〃∀〃",
				];
			} else {
				return ["早你🐎呢"];
			}
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
		triggers: [/^(?:喵喵)?(?:现在几点了?|(?:现在)?什么时候了?)/],
		answer() {
			return [`现在${moment().format("YYYY年M月D日，H时m分s秒")}哦！`];
		},
	},
	{
		triggers: [/^我的(?:信息|数据|统计)$/],
		answers: [
			`    【用户数据】    
用户名　　: {username}
称呼　　　: {nickname}
好感度　　: {favorability}
Ｈ值　　　: {hValue}
点数　　　: 
综合评比　: Keritial 已经咕咕咕了${Math.trunc(
				(new Date().getTime() - 1649408769035) / 864e5
			)}天了
（欲查看所持有道具可发送"我的道具"查看）`,
		],
	},
];
