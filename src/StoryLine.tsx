import React from "react"
import { group, extent } from "d3-array"
import startOfDay from "date-fns/startOfDay"
import format from "date-fns/format"
import { Post, Gender } from "./shape"
import { scaleLinear, scaleTime } from "d3-scale"
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
        return "👨‍🦰"
    } else if (age < 40 && gender === "f") {
        return "👩"
    } else if (age < 60 && gender === "m") {
        return "👴"
    } else if (age < 60 && gender === "f") {
        return "🧓"
    } else if (gender === "f") {
        return "👵"
    } else if (gender === "m") {
        return "👴"
    } else {
        return "👽"
    }
}

export const Storyline: React.FC<StorylineProps> = ({ posts }) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const containerSize = useComponentSize(containerRef)
    const [tooltip, setTooltip] = React.useState<Post | null>(null)
    const daysMap = group(posts, p => startOfDay(p.createdUtc).valueOf())
    const days = Array.from(daysMap).sort(([a], [b]) => b - a)

    const commentsExtent = extent(posts, p => p.comments) as [number, number]
    const scoreExtent = extent(posts, p => p.score) as [number, number]

    const dayScale = scaleTime()
        .domain([days[0][0], days[days.length - 1][0]])
        .range([16, days.length * 40])

    const verticalScale = scaleLinear()
        .domain(scoreExtent)
        .range([60, containerSize ? containerSize.height - 60 : 600])

    const sizeScale = scaleLinear()
        .domain(commentsExtent)
        .range([18, 60])

    return (
        <div className={styles.storyline} ref={containerRef}>
            {days.map(([date]) => {
                return (
                    <div
                        className={styles.date}
                        style={{ left: dayScale(date) }}
                        key={date.toString()}
                    >
                        <div className={styles.year}>{format(date, "y")}</div>
                        <div>{format(date, "MMM")}</div>
                        <div>{format(date, "dd")}</div>
                    </div>
                )
            })}

            {days.map(([date, posts]) => {
                return (
                    <div
                        key={date.toString()}
                        className={styles.day}
                        style={{ left: dayScale(date) }}
                    >
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
                                        onFocus={() => setTooltip(p)}
                                    >
                                        {getEmoji(
                                            p.age as number, // handled by filter
                                            p.fromGender as Gender,
                                        )}
                                    </div>
                                )
                            })}
                    </div>
                )
            })}

            {tooltip && (
                <Tooltip
                    top={verticalScale(tooltip.score) + 48}
                    left={dayScale(tooltip.createdUtc) + 48}
                    comments={tooltip.comments}
                    score={tooltip.score}
                    title={tooltip.title}
                    url={tooltip.url}
                />
            )}
        </div>
    )
}
