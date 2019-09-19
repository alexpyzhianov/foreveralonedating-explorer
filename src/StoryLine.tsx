import React from "react"
import axios from "axios"
import startOfDay from "date-fns/startOfDay"
import { FixedSizeList as List } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import { scaleLinear } from "d3-scale"
import useComponentSize from "@rehooks/component-size"
import { Tooltip } from "./Tooltip"
import { Face } from "./Face"
import {
    Post,
    ServerPost,
    serverPostToClient,
    filterGood,
    TooltipState,
} from "./shape"
import styles from "./StoryLine.module.css"
import { group } from "d3-array"

const commentsExtent = [0, 100]
const scoreExtent = [0, 400]

const sizeScale = scaleLinear()
    .domain(commentsExtent)
    .range([18, 60])

const fileList = Array(55)
    .fill(0)
    .map((_, i) => `./data/data${i}.json`)

type Day = [number, Post[]]

const postsCache: Post[] = []

export const Storyline: React.FC = () => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const containerSize = useComponentSize(containerRef)

    const [tooltip, setTooltip] = React.useState<TooltipState | null>(null)
    const [days, setDays] = React.useState<Day[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const loadMoreItems = React.useCallback((start: number, stop: number) => {
        console.log(start, stop)
        const nextFile = fileList.shift()
        if (!nextFile) {
            return Promise.resolve()
        }

        setIsLoading(true)
        return axios.get<any, { data: ServerPost[] }>(nextFile).then(result => {
            Array.prototype.push.apply(
                postsCache,
                result.data.map(serverPostToClient).filter(filterGood),
            )
            const days = Array.from(
                group(postsCache, p => startOfDay(p.createdUtc).valueOf()),
            )
            setDays(days)
            setIsLoading(false)
        })
    }, [])

    React.useEffect(() => {
        loadMoreItems(0, 1)
    }, [])

    const verticalScale = scaleLinear()
        .domain(scoreExtent)
        .range([0, containerSize ? containerSize.height : 600])

    const isItemLoaded = (index: number) =>
        fileList.length === 0 || index < days.length
    const itemCount = fileList.length > 0 ? days.length + 1 : days.length

    return (
        <div className={styles.storyline} ref={containerRef}>
            {containerSize.height && (
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    loadMoreItems={
                        // isLoading
                        //     ? (a: number, b: number) => Promise.resolve()
                        loadMoreItems
                    }
                >
                    {({ onItemsRendered, ref }) => (
                        <List
                            className={styles.columns}
                            height={containerSize.height}
                            width={containerSize.width}
                            itemCount={itemCount}
                            itemSize={40}
                            layout="horizontal"
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                        >
                            {({ index, style, isScrolling }) =>
                                isItemLoaded(index) && !isScrolling ? (
                                    <div
                                        className={styles.column}
                                        style={style}
                                    >
                                        {days[index][1].map(p => (
                                            <Face
                                                key={p.url}
                                                isSelected={Boolean(
                                                    tooltip &&
                                                        p.url === tooltip.url,
                                                )}
                                                top={verticalScale(p.score)}
                                                fontSize={sizeScale(p.comments)}
                                                post={p}
                                                setTooltip={setTooltip}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div
                                        className={styles.column}
                                        style={style}
                                    >
                                        "Loading..."
                                    </div>
                                )
                            }
                        </List>
                    )}
                </InfiniteLoader>
            )}

            {tooltip && <Tooltip {...tooltip} />}
        </div>
    )
}
