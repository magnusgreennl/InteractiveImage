/**
 * This file was generated from InteractiveImage.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, WebImage } from "mendix";

export interface InteractiveImageContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    showSampleText: boolean;
    sampleText: string;
    bgImage?: DynamicValue<WebImage>;
    data?: ListValue;
    x: ListAttributeValue<BigJs.Big>;
    y: ListAttributeValue<BigJs.Big>;
    width: ListAttributeValue<BigJs.Big>;
    height: ListAttributeValue<BigJs.Big>;
    text?: ListAttributeValue<string>;
    actionOnClick?: ListActionValue;
    unavailable?: ListValue;
    selectionFeedback?: EditableValue<string>;
    onSelectionFeedback?: ActionValue;
}

export interface InteractiveImagePreviewProps {
    class: string;
    style: string;
    showSampleText: boolean;
    sampleText: string;
    bgImage: string;
    data: {} | null;
    x: string;
    y: string;
    width: string;
    height: string;
    text: string;
    actionOnClick: {} | null;
    unavailable: {} | null;
    selectionFeedback: string;
    onSelectionFeedback: {} | null;
}
