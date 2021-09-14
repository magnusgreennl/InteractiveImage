import { Children, createElement } from "react";
import classNames from "classnames";
export const Alert = ({ className, bootstrapStyle, children }) => Children.count(children) > 0 ? (createElement("div", { className: classNames(`alert alert-${bootstrapStyle}`, className) }, children)) : null;
Alert.displayName = "Alert";
