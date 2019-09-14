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

export type Gender = "m" | "f" | "r"

export interface Post {
    createdUtc: Date
    score: number
    url: string
    textLength: number
    age?: number
    fromGender?: Gender
    toGender?: Gender
}

const metaRegex = /\[([m,f])4([m,f])]/gim

export function filterGood(post: Post) {
    return post.fromGender && post.toGender && post.age
}

export function serverPostToClient(post: ServerPost): Post {
    const titleInt = parseInt(post.title, 10)
    const [, fromGender, toGender] = metaRegex.exec(post.title) || [
        null,
        null,
        null,
    ]

    return {
        createdUtc: new Date(post.createdUtc * 1000),
        age: titleInt >= 14 && titleInt < 150 ? titleInt : undefined,
        score: post.score,
        url: post.url,
        fromGender: fromGender
            ? (fromGender.toLowerCase() as Gender)
            : undefined,
        toGender: toGender ? (toGender.toLowerCase() as Gender) : undefined,
        textLength: post.text,
    }
}
