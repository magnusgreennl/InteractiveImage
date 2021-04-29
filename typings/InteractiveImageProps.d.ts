/**
 * This file was generated from InteractiveImage.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, EditableValue, WebImage } from "mendix";

export interface InteractiveImageContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    bgImage?: DynamicValue<WebImage>;
    Rectangle: EditableValue<string>;
}

export interface InteractiveImagePreviewProps {
    class: string;
    style: string;
    bgImage: string;
    Rectangle: string;
}
