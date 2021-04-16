import { Component, ReactNode, createElement } from "react";

export interface MarkerProps {
    coordinateTopX: number;
    coordinateTopY: number;
    coordinateBottomX: number;
    coordinateBottomY: number;    
    onClick(event: React.MouseEvent<HTMLElement>):void
}

export class Marker extends Component<MarkerProps> {
    render(): ReactNode {
        const {coordinateTopX, coordinateTopY, coordinateBottomX, coordinateBottomY, onClick} = this.props
        return <area
            shape="rect" 
            coords={ `${coordinateTopX},${coordinateTopY},${coordinateBottomX},${coordinateBottomY}` } 
            alt="Cup of coffee"
            onClick={onClick}
    />
    }
}
 