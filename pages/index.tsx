import Head from "next/head"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { Button, buttonVariants } from "@/components/ui/button"
import FlexAPIResponse from "@/types/FlexAPI";
import { InferGetStaticPropsType } from "next";
import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent, AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader, AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { numToLocaleString } from "@/lib/localeNum";
import { bitToGB } from "@/lib/bitConversions";

export default function IndexPage( { flex }: InferGetStaticPropsType<typeof getStaticProps> ) {
	return (
		<Layout>
			<Head>
				<title>{siteConfig.name}</title>
				<meta
					name="description"
					content={siteConfig.description}
				/>

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://chromeos.exerra.xyz/" />
				<meta property="og:title" content={siteConfig.name} />
				<meta property="og:description" content={siteConfig.description} />

				<meta property="twitter:card" content="summary" />
				<meta property="twitter:url" content="https://chromeos.exerra.xyz/" />
				<meta property="twitter:title" content={siteConfig.name} />
				<meta property="twitter:description" content={siteConfig.description} />

				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="https://cdn.exerra.xyz/png/pfp.png"/>
			</Head>
			<section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
				<div className="flex max-w-[980px] flex-col items-start gap-5">
					<h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
						{siteConfig.name}
					</h1>
					<p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
						Download the latest <b>ChromeOS</b> BIN files without using the recovery utility. This website is not affiliated with Google.
					</p>
				</div>

				<div className={"my-5 flex flex-wrap gap-6"}>
					{flex.map(v => (
						<div key={v.channel} className={"flex w-full shrink-0 grow flex-col justify-between rounded-xl border-2 border-slate-200 p-5 dark:border-slate-800 lg:basis-1/3 xl:basis-1/4"}>
							<div className={"mb-10 p-0"}>
								<h2 className={"mb-3 text-2xl font-bold leading-tight tracking-tighter"}>
									{v.name} - {v.channel === "LTC" ? v.channel : v.channel.toLowerCase().charAt(0).toUpperCase() + v.channel.toLowerCase().slice(1)}
								</h2>

								<Accordion type="single" collapsible className={""}>
									<AccordionItem value="item-version">
										<AccordionTrigger>Version</AccordionTrigger>
										<AccordionContent>
											{v.version}
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-chromeversion">
										<AccordionTrigger>Chrome version</AccordionTrigger>
										<AccordionContent>
											{v.chrome_version}
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-filesize">
										<AccordionTrigger>Extracted BIN size</AccordionTrigger>
										<AccordionContent>
											{numToLocaleString(bitToGB(v.filesize))} GB
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-installsteps">
										<AccordionTrigger>Install steps</AccordionTrigger>
										<AccordionContent>
											Extract the zip file and install it using Rufus or BalenaEtcher.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-sha1">
										<AccordionTrigger>Hashes</AccordionTrigger>
										<AccordionContent className={"break-all"}>
											<b>SHA1</b> - {v.sha1}<br />
											<b>MD5</b> - {v.md5}
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>

							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant={"outline"}>
										Download {numToLocaleString(bitToGB(v.zipfilesize))} GB
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>You are about to download a file from Google&apos;s servers</AlertDialogTitle>
										<AlertDialogDescription>
											By downloading a file from Google&apos;s servers, you acknowledge that Exerra is not responsible for any downloads and it is your responsibility to ensure the file&apos;s safety and security.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<a href={v.url} className={"w-full"} download><AlertDialogAction className={"w-full grow sm:w-auto"}>Download {numToLocaleString(bitToGB(v.zipfilesize))} GB</AlertDialogAction></a>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					))}
				</div>

			</section>
		</Layout>
	)
}

export const getStaticProps = async () => {
	const flex = await (
		await fetch( "https://dl.google.com/dl/edgedl/chromeos/recovery/cloudready_recovery2.json" )
	).json() as FlexAPIResponse[]

	const parsed = {
		ltc: flex[flex.findIndex( p => p.channel == "LTC" )],
		stable: flex[flex.findIndex( p => p.channel == "STABLE" )],
		dev: flex[flex.findIndex( p => p.channel == "DEV" )]
	}

	return {
		props: {
			flex
		},
		revalidate: 3600
	}
}
