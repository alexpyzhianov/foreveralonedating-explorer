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

const ageRegex = /\d\d/
const metaRegex = /([M,F,f,m])4([M,F,f,m])/

export function filterGood(post: Post) {
    return post.fromGender && post.toGender && post.age
}

export function serverPostToClient(post: ServerPost): Post {
    const [titleInt] = ageRegex.exec(post.h) || [null]
    const [, fromGender, toGender] = metaRegex.exec(post.h) || [
        null,
        null,
        null,
    ]

    return {
        createdUtc: new Date(post.t * 1000),
        age:
            titleInt && parseInt(titleInt) >= 14 && parseInt(titleInt) < 150
                ? parseInt(titleInt)
                : undefined,
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
