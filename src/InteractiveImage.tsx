import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { InteractiveImageContainerProps } from "../typings/InteractiveImageProps";

import "./ui/InteractiveImage.css";

export default class InteractiveImage extends Component<InteractiveImageContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
