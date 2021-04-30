import { Component, ReactNode, createElement } from "react";

export interface HotspotProps {
    x: number;
    y: number;
    width: number;
    height: number;
    text: string | undefined;    
    onClick(event: React.MouseEvent<HTMLElement>):void
}

// Instead of a Class Component we will use a Functional Component for the Hotspot
// This is just to show the difference, we could just as wel have created a class component

export const Hotspot = (props:HotspotProps) => {
    const {x, y, width, height, text, onClick} = props
    // The font-size defined in the CSS will influence the actual rendering, below corrections are for 30px
    // If you change the size you must also update the y coordinate of the <text> element
    const yCorrect:number = 3

    return(
        <a onClick={onClick}>
            <g>
                <rect x={x} y={y} width={width} height={height} />
                { text && <circle cx={x+(width/2)} cy={y+(height/2)} r="20" fill="white"/> }                    
                { text && <text x={x+(width/2)} y={y+(height/2)+yCorrect} dominant-baseline="middle" text-anchor="middle">{text}</text> }
            </g>
        </a>        
    )
}
 