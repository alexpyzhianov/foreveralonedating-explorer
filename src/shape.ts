export interface ServerPost {
    c: number // comments
    t: number // time
    s: number // score
    h: string // title
    u: string // url
}

export type Gender = "m" | "f" | "r"

export interface Post {
    createdUtc: Date
    score: number
    url: string
    age?: number
    fromGender?: Gender
    toGender?: Gender
    title: string
    comments: number
}

const metaRegex = /\[([m,f])4([m,f])]/gim

const blackList = [
    "https://www.reddit.com/r/GBr4r/comments/bavsby/18_m4f_watchet_just_a_guy_looking_for_a_girl/",
]

export function filterGood(post: Post) {
    return (
        !blackList.includes(post.url) &&
        post.fromGender &&
        post.toGender &&
        post.age
    )
}

export function serverPostToClient(post: ServerPost): Post {
    const titleInt = parseInt(post.h, 10)
    const [, fromGender, toGender] = metaRegex.exec(post.h) || [
        null,
        null,
        null,
    ]

    return {
        createdUtc: new Date(post.t * 1000),
        age: titleInt >= 14 && titleInt < 150 ? titleInt : undefined,
        score: post.s,
        url: post.u,
        fromGender: fromGender
            ? (fromGender.toLowerCase() as Gender)
            : undefined,
        toGender: toGender ? (toGender.toLowerCase() as Gender) : undefined,
        title: post.h,
        comments: post.c,
    }
}
