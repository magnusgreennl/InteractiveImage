import { Component, ReactNode, createElement, MouseEvent} from "react";

import { InteractiveImageContainerProps } from "../typings/InteractiveImageProps";

import "./ui/InteractiveImage.css";

export default class InteractiveImage extends Component<InteractiveImageContainerProps> {
    clickCounter:number = 0

    //Function prints coordinates of click to log
    Coordinates(event: MouseEvent, clickCounter: number)
    {
        let x1: number;
        let y1: number;
        let x2: number;
        let y2: number;

        console.log('clickcounter: ' + clickCounter + ' This.clickcounter ' + this.clickCounter )

    if(clickCounter == 0){
        x1 = event.clientX;
        y1 = event.clientY;
        console.log("Coordinate1 = (" + x1 + ', ' + y1+")");
        console.log('clickcounter: ' + clickCounter + ' This.clickcounter ' + this.clickCounter);
        this.clickCounter = this.clickCounter + 1;
        clickCounter = clickCounter +1
        }   
    else if(this.clickCounter == 1){
        x2 = event.clientX;
        y2 = event.clientY;
        console.log("Coordinate2 = (" + x2 + ', ' + y2+")");
        console.log('clickcounter: ' + clickCounter + ' This.clickcounter ' + this.clickCounter);
        this.clickCounter = this.clickCounter + 1;
        clickCounter = clickCounter +1

    }
    else if(this.clickCounter > 1){
        x1 = event.clientX;
        y1 = event.clientY;
        this.clickCounter = 1;
        clickCounter = 1 ;
        console.log("Coordinate1 = (" + x1 + ', ' + y1+")");
        console.log (clickCounter);
    }
    console.log('clickcounter: ' + clickCounter + ' This.clickcounter ' + this.clickCounter);
}

    //Show map image
    render(): ReactNode {
        const {bgImage} = this.props
        if(bgImage?.value !== undefined) {
            console.log(bgImage);
            return <img className= "bgImage" onClick = {(event)=>this.Coordinates(event, this.clickCounter)} src={bgImage.value.uri }/>
        }

       else return <div>please upload an image</div>;
    }
}


