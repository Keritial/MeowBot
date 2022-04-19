import { Context } from "koishi";
import { generateRandomNumber } from "../util/random";

function timeVerifier(lastTime?: number): boolean {
	if (!lastTime) {
		return true;
	}
	const now = new Date();
	const last = new Date(lastTime);
	return !(
		now.getFullYear() === last.getFullYear() &&
		now.getMonth() === last.getMonth() &&
		now.getDate() === last.getDate()
	);
}

export const name = "command";

export function apply(ctx: Context) {
	ctx.plugin
	ctx.command("签到")
		.userFields(["favorability", "lastSignTime"])
		.action(({ session }) => {
			if (timeVerifier(session?.user?.lastSignTime)) {
				const gain = generateRandomNumber(8, 11);
				session!.user!.lastSignTime = Date.now();
				session!.user!.favorability += gain;
				return `签到成功！+${gain}点数`;
			} else {
				return "你今天已经签到过了，请明天再来吧！人(￣ω￣;)";
			}
		});
	ctx.command("喝妹汁")
		.userFields(["favorability", "lastAiekiTime", "hValue"])
		.action(({ session }) => {
			if (timeVerifier(session?.user?.lastAiekiTime)) {
				// 好感度
				const gainF = generateRandomNumber(2, 6);
				// H值
				const gainH = generateRandomNumber(1, 4);
				session!.user!.lastAiekiTime = Date.now();
				session!.user!.favorability += gainF;
				session!.user!.hValue += gainH;
				session?.send("妹汁真好喝！咕嘟咕嘟");
				session?.send(`H值+${gainH}
好感度+${gainF}`);
				return;
			} else {
				return "今天的妹汁已经喝过了吧！那就等明天再来啦！(。·ˇ_ˇ·。)";
			}
		});
	ctx.command("最喜欢喵喵了")
		.userFields(["favorability", "lastLoveDeclarationTime"])
		.action(({ session }) => {
			if (timeVerifier(session?.user?.lastLoveDeclarationTime)) {
				let gain = generateRandomNumber(-3, 4);
				if (gain >= 0) {
					gain++;
				}
				session!.user!.lastLoveDeclarationTime = Date.now();
				session!.user!.favorability += gain;
				if (gain >= 0) {
					return `突然间告白什么的......喵喵会害羞啦！(／≧ω＼)+${gain}好感度`;
				} else {
					return `哼！只有随便的人才会随便把喜欢挂在嘴边(╯⊙ ω ⊙╰ )${gain}好感度`;
				}
			} else {
				// 原版好像是直接 throw DoNone()，我照做（
				return;
			}
		});

	ctx.command("我的数据")
		.alias("我的统计")
		.userFields(["favorability", "nickname", "hValue"])
		.action(({ session }) => {
			return `    【用户数据】    
用户名　　: ${session?.username}
称呼　　　: ${session?.user?.nickname}
好感度　　: ${session?.user?.favorability}
Ｈ值　　　: ${session?.user?.hValue}
点数　　　: ${"欸嘿，还没做呢"}
综合评比　: ${"欸嘿，还没做呢"}
（欲查看所持有道具可发送"我的道具"查看）`;
		});
}
