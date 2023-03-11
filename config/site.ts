import { NavItem } from "@/types/nav"

interface SiteConfig {
	name: string
	description: string
	mainNav: NavItem[]
	links: {
		twitter: string
		github: string
		mastodon: string
	}
}

export const siteConfig: SiteConfig = {
	name: "ChromeOS releases",
	description: "Download the latest ChromeOS BIN files without using the recovery utility.",
	mainNav: [
		{
			title: "Home",
			href: "/",
		},
	],
	links: {
		twitter: "https://twitter.com/Exerra",
		github: "https://github.com/Exerra/chromeos-download",
		mastodon: "https://mastodon.world/@exerra"
	},
}
