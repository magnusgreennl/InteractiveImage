import { ReactNode } from "react";
export interface AlertProps {
    children?: ReactNode;
    className?: string;
    bootstrapStyle: "default" | "primary" | "success" | "info" | "warning" | "danger";
}
export declare const Alert: {
    ({ className, bootstrapStyle, children }: AlertProps): JSX.Element | null;
    displayName: string;
};
