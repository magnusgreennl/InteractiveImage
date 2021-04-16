import { Component, ReactNode, createElement } from "react";
import { InteractiveImagePreviewProps } from "../typings/InteractiveImageProps";

declare function require(name: string): string;

export class preview extends Component<InteractiveImagePreviewProps> {
    render(): ReactNode {
        return <div/>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/InteractiveImage.css");
}
