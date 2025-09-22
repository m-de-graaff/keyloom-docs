import { source } from "@/lib/source";
import type { InferPageType } from "fumadocs-core/source";

export async function getLLMText(page: InferPageType<typeof source>) {
	// Fallback for older fumadocs versions without page.data.getText("processed")
	let processed = "" as string;
	if (
		"getText" in (page.data as any) &&
		typeof (page.data as any).getText === "function"
	) {
		processed = await (page.data as any).getText("processed");
	}

	return `# ${page.data.title}
URL: ${page.url}

${processed}`;
}
