import React from "react"
import { group } from "d3-array"
import startOfDay from "date-fns/startOfDay"
import format from "date-fns/format"
import { Post, Gender } from "./shape"
import { scaleLinear } from "d3-scale"
import useComponentSize from "@rehooks/component-size"
import styles from "./StoryLine.module.css"
import { Tooltip } from "./Tooltip"

export interface StorylineProps {
    posts: Post[]
}

function getEmoji(age: number, gender: Gender) {
    if (age < 20 && gender === "m") {
        return "👦"
    } else if (age < 20 && gender === "f") {
        return "👧"
    } else if (age < 40 && gender === "m") {
        return "👨"
    } else if (age < 40 && gender === "f") {
        return "👩"
    } else if (age < 60 && gender === "m") {
        return "👨‍🦳"
    } else if (age < 60 && gender === "f") {
        return "👩‍🦳"
    } else if (gender === "f") {
        return "👵"
    } else if (gender === "m") {
        return "👴"
    } else {
        return "👽"
    }
}

interface Tooltip extends Post {
    top: number
    left: number
}

export const Storyline: React.FC<StorylineProps> = React.memo(({ posts }) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const containerSize = useComponentSize(containerRef)
    const [tooltip, setTooltip] = React.useState<Tooltip | null>(null)
    const daysMap = group(posts, p => startOfDay(p.createdUtc).valueOf())
    const days = Array.from(daysMap).sort(([a], [b]) => b - a)

    // For consistent sizes as the data is static anyway
    const commentsExtent = [0, 161]
    const scoreExtent = [0, 271]

    const verticalScale = scaleLinear()
        .domain(scoreExtent)
        .range([0, containerSize ? containerSize.height : 600])

    const sizeScale = scaleLinear()
        .domain(commentsExtent)
        .range([18, 60])

    return (
        <div className={styles.storyline}>
            <div className={styles.timeline}>
                {days.map(([date]) => {
                    return (
                        <div
                            className={styles.timelineTick}
                            key={date.toString()}
                        >
                            <div className={styles.timelineYear}>
                                {format(date, "y")}
                            </div>
                            <div>{format(date, "MMM")}</div>
                            <div>{format(date, "dd")}</div>
                        </div>
                    )
                })}
            </div>

            <div className={styles.columns} ref={containerRef}>
                {days.map(([date, posts]) => (
                    <div key={date.toString()} className={styles.column}>
                        {posts
                            .filter(p => p.age && p.fromGender)
                            .map(p => {
                                const postCn =
                                    tooltip && p.url === tooltip.url
                                        ? " " + styles.selected
                                        : ""

                                return (
                                    <div
                                        key={p.url}
                                        tabIndex={0}
                                        className={styles.post + postCn}
                                        style={{
                                            top: verticalScale(p.score),
                                            fontSize: sizeScale(p.comments),
                                        }}
                                        onFocus={e => {
                                            const r = e.target.getBoundingClientRect()
                                            setTooltip({
                                                top: r.top,
                                                left:
                                                    document.documentElement
                                                        .scrollLeft +
                                                    r.left +
                                                    r.width / 2 +
                                                    40,
                                                ...p,
                                            })
                                        }}
                                    >
                                        {getEmoji(
                                            p.age as number, // handled by filter
                                            p.fromGender as Gender,
                                        )}
                                    </div>
                                )
                            })}
                    </div>
                ))}
            </div>

            {tooltip && <Tooltip {...tooltip} />}
        </div>
    )
})
