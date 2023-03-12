/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		fontLoaders: [
			{
				loader: "@next/font/google",
				options: { subsets: [ "latin" ] },
			},
		],
	},
	images: {
		domains: [
			"cdn.exerra.xyz"
		]
	}
}

export default nextConfig
