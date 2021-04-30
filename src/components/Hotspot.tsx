import { Component, ReactNode, createElement } from "react"

export interface HotspotProps {
    x: number;
    y: number;
    width: number;
    height: number;
    text: string | undefined;   // Attribute is optional (so possibly undefined)
    availability?: boolean;     // Different way of defining a optional attibute
    onClick(event: React.MouseEvent<HTMLElement>):void
}

// Instead of a Class Component we will use a Functional Component for the Hotspot
// This is just to show the difference, we could just as wel have created a class component

export const Hotspot = (props:HotspotProps) => {
    const renderCross=()=>{
        const {x, y, width, height, availability} = props
        const strokeWidth = 10;
        // There probably is some mathematical way to determine the exact offset for the lines based on the strokewidth
        // for now just make a broad assumption
        const correction = strokeWidth/3;
        if (!availability) return null
        return(
            <g>
                <line x1={x+correction} y1={y+correction} x2={x+width-correction} y2={y+height-correction} stroke="red" stroke-width={strokeWidth} />
                <line x1={x+width-correction} y1={y+correction} x2={x+correction} y2={y+height-correction} stroke="red" stroke-width={strokeWidth} />
            </g>
        )
    }
    const renderText=()=>{
        const {x, y, width, height, text} = props
        if (!text) return null
        return (
            <g>
                <circle cx={x+(width/2)} cy={y+(height/2)} r="20" fill="white"/>                     
                <text x={x+(width/2)} y={y+(height/2)+yCorrect} dominant-baseline="middle" text-anchor="middle">{text}</text>
            </g>
        )
    }
    const renderOutline=()=>{
        const {x, y, width, height} = props
        return(<rect x={x} y={y} width={width} height={height} />)
    }
    
    // The font-size defined in the CSS will influence the actual rendering, below corrections are for 30px
    // If you change the size you must also update the y coordinate of the <text> element
    const yCorrect:number = 3
    const {onClick}= props
    return(
        <a onClick={onClick}>
            <g>
                {renderOutline()}
                {renderCross()}
                {renderText()}
            </g>
        </a>        
    )
}
 