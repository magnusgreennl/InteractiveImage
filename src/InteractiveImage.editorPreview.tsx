import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { InteractiveImagePreviewProps } from "../typings/InteractiveImageProps";

declare function require(name: string): string;

export class preview extends Component<InteractiveImagePreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/InteractiveImage.css");
}
