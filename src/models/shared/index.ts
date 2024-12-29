export interface GitHubProfile {
	id: string
	username: string
	displayName?: string
	profileUrl?: string
	photos?: { value: string }[]
	emails?: { value: string; verified?: boolean }[]
	provider: string
}
