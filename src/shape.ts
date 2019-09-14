export interface ServerPost {
    award: number
    comments: number
    createdUtc: number
    over18: boolean
    pinned: boolean
    pwls: number
    score: number
    subs: number
    text: number
    thumbnail: string
    title: string
    url: string
    wls: number
}

export interface Post {
    createdUtc: Date
    score: number
    url: string
    age?: number
    gender?: "male" | "female" | "other"
}

export function serverPostToClient(post: ServerPost): Post {
    const titleInt = parseInt(post.title, 10)

    return {
        createdUtc: new Date(post.createdUtc * 1000),
        age: titleInt >= 14 && titleInt < 150 ? titleInt : undefined,
        score: post.score,
        url: post.url,
    }
}
