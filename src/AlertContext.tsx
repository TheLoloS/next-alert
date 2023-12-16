"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

/**
 * Represents an alert in the application.
 */
interface Alert {
	id: number;
	title: string;
	message: string;
	type: "success" | "error" | "warning" | "info";
}

/**
 * Represents the properties of the AlertContext.
 */
interface AlertContextProps {
	alerts: Alert[];
	/**
	 * Adds a new alert to the context.
	 *
	 * @param {string} title - The title of the alert.
	 * @param {string} message - The message of the alert.
	 * @param {"success" | "error" | "warning" | "info"} type - The type of the alert.
	 * Can be one of: "success", "error", "warning", "info".
	 */
	addAlert: (
		/**
		 * The title of the alert.
		 */
		title: string,
		/**
		 * The message of the alert.
		 */
		message: string,
		/**
		 * The type of the alert.
		 * Can be one of: "success", "error", "warning", "info".
		 */
		type: "success" | "error" | "warning" | "info",
	) => void;
	/**
	 * Removes an alert from the context.
	 * @param id - The ID of the alert to remove.
	 */
	removeAlert: (id: number) => void;
	/**
	 * Clears all alerts from the context.
	 */
	clearAlerts: () => void;
}

type addAlertProps = {
	addAlert: (
		/**
		 * The title of the alert.
		 */
		title: string,
		/**
		 * The message of the alert.
		 */
		message: string,
		/**
		 * The type of the alert.
		 * Can be one of: "success", "error", "warning", "info".
		 */
		type: "success" | "error" | "warning" | "info",
	) => void;
};

/**
 * Context for managing alerts in the application.
 */
const AlertContext = createContext<AlertContextProps | undefined>(undefined);

/**
 * Provider component for the AlertContext.
 */
export const AlertProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [alerts, setAlerts] = useState<Alert[]>([]);

	/**
	 * Adds a new alert to the context.
	 * @param title - The title of the alert.
	 * @param message - The message of the alert.
	 * @param type - The type of the alert.
	 */
	const addAlert: addAlertProps["addAlert"] = (title, message, type) => {
		const newAlert: Alert = { id: Date.now(), message, type, title };
		setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
	};

	/**
	 * Removes an alert from the context.
	 * @param id - The ID of the alert to remove.
	 */
	const removeAlert = (id: number) => {
		setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
	};

	/**
	 * Clears all alerts from the context.
	 */
	const clearAlerts = () => {
		setAlerts([]);
	};

	return (
		<AlertContext.Provider
			value={{ alerts, addAlert, removeAlert, clearAlerts }}
		>
			{children}
		</AlertContext.Provider>
	);
};

/**
 * Custom hook for accessing the AlertContext.
 * @returns The AlertContext.
 * @throws An error if used outside of the AlertProvider.
 */
export const useAlert = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlert must be used within an AlertProvider");
	}
	return context;
};
