"use client";

import React, { ReactNode, useEffect } from "react";
import { useAlert } from "./AlertContext";
import { motion, HTMLMotionProps, MotionValue } from "framer-motion";

interface AlertProps extends HTMLMotionProps<"div"> {
	/**
	 * The duration of the alert. After this time, the alert will be removed. Default is 3000ms.
	 */
	duration?: number;
	/**
	 * The id of the alert.
	 */
	idElement: number;
	/**
	 * The title of the alert.
	 */
	title: string;
	/**
	 * Represents a message for an alert.
	 */
	message: string;
	/**
	 * The type of the alert.
	 * Can be one of: "success", "error", "warning", "info".
	 */
	type?: "success" | "error" | "warning" | "info";

	/**
	 * The direction of the alert component.
	 * Can be one of the following values:
	 * - "left"
	 * - "right"
	 * - "top"
	 * - "bottom"
	 *
	 *  Default is "right"
	 * */
	direction: "left" | "right" | "top" | "bottom";
	chidren?: ReactNode | MotionValue<number> | MotionValue<string>;
	idDelay: number;
}

export const Alert: React.FC<AlertProps> = ({
	idElement,
	message,
	idDelay,
	type = "success",
	duration = 3000,
	title,
	children,
	direction = "right",
	...restProps
}) => {
	const { removeAlert } = useAlert();

	useEffect(() => {
		console.log(idElement);
		setTimeout(
			() => {
				removeAlert(idElement);
			},
			// set delay if user click to fast
			duration + idDelay * 500,
		); // Auto-hide after 3 seconds

		// return () => clearTimeout(timer);
	}, [idElement, removeAlert]);

	const colorOfAlert =
		(type === "success" && { backgroundColor: "#16a34a" }) ||
		(type === "error" && { backgroundColor: "#ef4444" }) ||
		(type === "warning" && { backgroundColor: "#facc15" }) ||
		(type === "info" && { backgroundColor: "#0ea5e9" });

	const directionOfAlert =
		(direction === "left" && { x: -100 }) ||
		(direction === "right" && { x: 100 }) ||
		(direction === "top" && { y: -100 }) ||
		(direction === "bottom" && { y: 100 });

	const directionOfAlertXY =
		(direction === "left" && { x: 0 }) ||
		(direction === "right" && { x: 0 }) ||
		(direction === "top" && { y: 0 }) ||
		(direction === "bottom" && { y: 0 });
	return (
		<motion.div
			{...restProps}
			initial={{ ...directionOfAlert, opacity: 0 }}
			animate={{ ...directionOfAlertXY, opacity: 1 }}
			exit={{ ...directionOfAlert, opacity: 0 }}
			style={{
				overflow: "hidden",
				...colorOfAlert,
				color: "white",
				width: "15rem",
				padding: "1rem",
				margin: "0.5rem",
				minWidth: "fit-content",
			}}
		>
			{/* create bar on top of div with animation */}
			<div className="w-full absolute top-0 left-0">
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: "100%" }}
					transition={{ duration: duration / 1000 }}
					style={{
						height: "0.3rem",
						opacity: 0.5,
						backgroundColor: "white",
					}}
				></motion.div>
			</div>
			{children as ReactNode}
			<h1>{title}</h1>
			<p>{message}</p>
		</motion.div>
	);
};
