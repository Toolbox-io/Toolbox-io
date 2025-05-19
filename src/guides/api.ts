export type GuideHeader = {
    "DisplayName": string,
    "Icon": string
}

export type GuideJSON = GuideEntry[]

export type GuideEntry = {
    type: "file" | "dir",
    name: string,
    download_url: string
}