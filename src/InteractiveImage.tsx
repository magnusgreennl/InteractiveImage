import { Component, ReactNode, createElement, MouseEvent} from "react";

import { InteractiveImageContainerProps } from "../typings/InteractiveImageProps";

import "./ui/InteractiveImage.css";

export default class InteractiveImage extends Component<InteractiveImageContainerProps> {
    let a = document.createElement ("X");


    //Function prints coordinates of click to log
    Coordinates(event: MouseEvent){
    let x1 = event.clientX
    let y1 = event.clientY
    console.log("I clicked on " + x1 + ' ' + y1);
    
}
    //Show map image
    render(): ReactNode {
        const {bgImage} = this.props
        if(bgImage?.value !== undefined) {
            console.log(bgImage);
            return <img className= "bgImage" onClick = {this.Coordinates} src={bgImage.value.uri }/>
        }

       else return <div>please upload an image</div>;
    }
}
