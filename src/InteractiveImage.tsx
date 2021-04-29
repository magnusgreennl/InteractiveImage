import { Component, ReactNode, createElement, MouseEvent} from "react";

import { InteractiveImageContainerProps } from "../typings/InteractiveImageProps";

import "./ui/InteractiveImage.css";


export default class InteractiveImage extends Component<InteractiveImageContainerProps> {
    clickCounter:number = 0;
    X1:number = 0;
    Y1:number = 0;
    X2:number = 0;
    Y2:number = 0;

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
        this.clickCounter = this.clickCounter + 1;
        clickCounter = clickCounter +1;
        this.X1 = x1;
        this.Y1 = y1;
        console.log('clickcounter: ' + clickCounter + ' This.clickcounter ' + this.clickCounter + 'X1 = ' + this.X1 + ' Y1 = ' + this.Y1);
        }   
    else if(this.clickCounter == 1){
        x2 = event.clientX;
        y2 = event.clientY;
        console.log("Coordinate2 = (" + x2 + ', ' + y2+")");
        console.log('clickcounter: ' + clickCounter + ' This.clickcounter ' + this.clickCounter);
        this.clickCounter = this.clickCounter + 1;
        clickCounter = clickCounter +1;
        this.X2 = x2;
        this.Y2 = y2;
        let CWidth = (this.X2 - this.X1);
        let CHeigth= (this.Y2 - this.Y1);
        <canvas id="MyCanvas" width= {CWidth} height={CHeigth}></canvas>
        const showCanvas =  document.getElementById('MyCanvas') as HTMLCanvasElement;
        console.log(showCanvas)
        if (showCanvas != null && showCanvas != undefined){
            var ctx = showCanvas.getContext("2d");
            if(ctx != null){
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(this.X1, this.Y1, this.X2, this.Y2);}
        }

        console.log('clickcounter: ' + clickCounter + ' This.clickcounter ' + this.clickCounter + 'X2 = ' + this.X2 + ' Y1 = ' + this.Y2 + ' Canvast Heigth: ' + CHeigth + ' Canvas Width: ' + CWidth);
    }
    else if(this.clickCounter > 1){
        x1 = event.clientX;
        y1 = event.clientY;
        this.clickCounter = 1;
        clickCounter = 1 ;
        this.X2 = 0;
        this.Y2 = 0;
        console.log("Coordinate1 = (" + x1 + ', ' + y1+")");
        console.log (clickCounter);
    }

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


