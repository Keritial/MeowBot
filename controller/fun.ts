import { Context } from "koishi";
import { 银灰语音 } from "../asset/银灰";

export const name = "command/fun";

export function apply(ctx: Context) {
	ctx.command("银灰 [是哪条语音的分别器:text]")
		.alias("银老板")
		.action((_, 是哪条语音的分别器) => {
			let 钥匙: string[];
			if (是哪条语音的分别器) {
				const 语音 = 银灰语音.find((语音) =>
					语音.join().match(new RegExp(是哪条语音的分别器, ""))
				);
				if (语音?.[1]) {
					钥匙 = 语音!;
				} else {
					return "银灰没有该条语音。";
				}
			} else {
				钥匙 = 银灰语音[Math.floor(Math.random() * 银灰语音.length)];
			}
			return `(${钥匙[0]}) ${钥匙[1]}`;
		});
}
