"use client";

import React, { ReactNode } from "react";
import { Alert } from "./Alert";
import { useAlert } from "./AlertContext";
import { AnimatePresence, HTMLMotionProps, MotionValue } from "framer-motion";




export interface AlertProps extends HTMLMotionProps<"div"> {
  /**
   * Set the position of the alert component.
   * @types {"top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-top" | "center-bottom"}
   * @default "top-right"
   *
   * @example
   * <Alerts position="top-left" />
   *
   */
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center-top"
    | "center-bottom";

  /**
   * The direction of the alert component.
   *
   * @type {"left" | "right" | "top" | "bottom"}
   * @default "right"
   *
   * @example
   * <Alerts direction="left" />
   */

  direction: "left" | "right" | "top" | "bottom";
  /**
   * The duration of the alert. After this time, the alert will be removed. Default is 3000ms.
   */
  timer?: number;
  /**
   * The children of the alert.
   * @type {ReactNode | MotionValue<number> | MotionValue<string>}
   * @default null
   *
   * @example
   * <div>Some text</div>
   * <motion.div animate={{ opacity: 0 }}>Some text</motion.div>
   *
   *
   * */
  children?: ReactNode | MotionValue<number> | MotionValue<string>;
  /**
   * The function that will be executed when the alert is clicked.
   */
  passFunction?: () => void;
}

export const Alerts: React.FC<AlertProps> = ({
  position = "top-right",
  direction = "right",
  timer = 3000,
  children,
  ...props
}) => {
  // create a context to store the alerts
  const { alerts } = useAlert();
  /**
   * Calculates the position style object based on the given position value.
   * @param {string} position - The position value for the alert.
   * @returns {object} - The position style object.
   */
  const positionStyle =
    (position === "bottom-left" && { bottom: 0, left: 0 }) ||
    (position === "bottom-right" && { bottom: 0, right: 0 }) ||
    (position === "top-left" && { top: 0, left: 0 }) ||
    (position === "top-right" && { top: 0, right: 0 }) ||
    (position === "center-top" && {
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
    }) ||
    (position === "center-bottom" && {
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
    });

  return (
    <div
      style={{"display":"flex","overflow":"hidden","position":"fixed","padding":"1rem","flexDirection":"column","justifyContent":"flex-end","alignItems":"flex-end","width":"fit-content", ...positionStyle }}
    >
      <AnimatePresence>
        {alerts.map((alert, i) => (
          <Alert
            idDelay={i}
            key={alert.id}
            title={alert.title}
            idElement={alert.id}
            message={alert.message}
            direction={direction}
            type={alert.type}
            duration={timer}
            passFunction={alert.passFunction}
            {...props}
          >
            {children}
          </Alert>
        ))}
      </AnimatePresence>
    </div>
  );
};
