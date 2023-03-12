import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button";
import Image from "next/image";


interface LayoutProps {
	children: React.ReactNode
}

export function Layout( { children }: LayoutProps ) {
	return (
		<>
			<SiteHeader/>
			<main>{children}</main>
			<footer className={"p-10 text-center"}>
				Made by <a href={"https://exerra.xyz"} className={"inline-flex gap-1 align-middle font-bold"} target={"_blank"} rel={"noreferrer"}>Exerra <Image alt={"Exerra's profile picture"} height={24} width={24} className={"inline-flex h-6 w-6"} src={"https://cdn.exerra.xyz/png/pfp.png"} /></a><br />
				ChromeOS is a trademark owned by Google.
			</footer>
		</>
	)
}
