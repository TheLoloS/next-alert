
# 💌 next-alert 

The next-alert library allows for easy integration and management of notifications / alerts in your Next.js 13/14 application.

## Demo

![demo](https://github.com/TheLoloS/next-alert/assets/57485545/d22d9e5e-ce20-4d5f-b69f-a28b29b3f629)

[Go to Demo](https://next-alert-deom.vercel.app/)

## Installation

To install next-alert, use one of the following commands in your terminal:

```bash
npm install framer-motion next-alert
# or
yarn add framer-motion next-alert
```


*Why you must install framer-motion? Because next-alert use framer-motion for animations, and i wont to add this dependency in next-alert, because you can use other version of framer-motion for animations in your project.*

## Usage
In main component you must use provider:

```js
import { AlertProvider } from "next-alert";

export default function Home() {
	return (
        <AlertProvider>
            <Components/>
        </AlertProvider>
    )
}
```
In component use like this:

```js
"use client";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";

const Component = () => {
	const { addAlert } = useAlert();

    const handleClick = () => {
        addAlert("Title","Description","Type", () => { function execute after alert gone (optional) });
    }
    return (
        <div>
            // this component is container for showing notifications 
            <Alerts
				position="top-right"
				direction="right"
				timer={3000}
				className="rounded-md relative z-50 !w-80"
			>
                <SVG | or else files/>
            </Alerts>
        </div>
    )
}
```


## Docs

| **Param** | **Options** | **Default** |
|------------|------------|------------|
|---------------| Alert component params |----------------------|
| position |  top-left, top-right, bottom-left, bottom-right, center-top, center-bottom |  top-right |
| direction | left, right, top, bottom| right |
| timer | number | 3000 |
| className | tailwind class | empty, you can change defaut styles by add ! |
|---------------| Alert hook params |----------------------|
|title|string|empty|
|description|string|empty|
|type|success, error, warning, info|empty|
|---------------| Alert Import Types |----------------------|
|AlertProps| interface AlertProps |
|AlertType| "success" \| "error" \| "warning" \| "info" |
|AlertDirection| "left" \| "right" \| "top" \| "bottom" |
|AlertPosition| "top-left" \| "top-right" \| "bottom-left" \| "bottom-right" \| "center-top" \| "center-bottom" |


## Dependencies
```json
    "framer-motion": ">=10",
    "react": ">=16",
    "react-dom": ">=16",
    "tailwindcss": ">=3.0.0"
```

## 🥰 Author
TheLoloS


## License
Mit


**Note:** next-alert is actively being developed, so we recommend regularly checking for the latest versions and updating your application.

