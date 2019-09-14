import React from "react"
import {
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    MarkSeries,
} from "react-vis"
import { Post } from "./shape"

export interface ReactVisProps {
    posts: Post[]
}

export interface VizData {
    x: number
    y: number
    url: string
}

export const ReactVis: React.FC<ReactVisProps> = ({ posts }) => {
    const data: VizData[] = posts
        .filter(p => p.age !== undefined)
        .map(p => ({
            x: p.age as number,
            y: p.score,
            url: p.url,
        }))

    return (
        <XYPlot height={800} width={800}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <MarkSeries
                data={data}
                onValueClick={(d: VizData) => window.open(d.url, "_blank")}
            />
        </XYPlot>
    )
}
