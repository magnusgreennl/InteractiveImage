import { Component, ReactNode, createElement } from "react";

import { InteractiveImageContainerProps } from "../typings/InteractiveImageProps";

import "./ui/InteractiveImage.css";

export default class InteractiveImage extends Component<InteractiveImageContainerProps> {
    render(): ReactNode {
        const {bgImage} = this.props
        if(bgImage?.value !== undefined) {
            console.log(bgImage);
            return <img className= "bgImage" src={bgImage.value.uri}/>
        }

       else return <div>please upload an image</div>;
    }
}
