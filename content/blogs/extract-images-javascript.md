---
title: "Extract Images from a Website using JavaScript"
slug: extract-images-javascript
date: 2023-10-09
tags: [JavaScript, Web Development]
excerpt: "A quick guide to extracting all images from any website using JavaScript — fetch, DOMParser, and a React component you can drop in."
readingTime: 5
featured: false
---

# Yes, you can extract images from a website using JavaScript and display them on your website.

## How to do it?

### Step 1: Create a HTML file

Create a HTML file and name it `index.html`. Add the following code to it.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Extract Images from a Website</title>
    </head>
    <body>
        <h1>Extract Images from a Website</h1>
        <div id="images"></div>
        <script src="script.js"></script>
    </body>
</html>
```

### Step 2: Create a JavaScript file

Create a JavaScript file and name it `script.js`. Add the following code to it.

```js
const url = "https://www.google.com"; // URL of the website from which you want to extract images

fetch(url)
    .then((response) => response.text())
    .then((data) => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(data, "text/html");
        const images = htmlDocument.getElementsByTagName("img");
        const imagesDiv = document.getElementById("images");
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const imageSrc = image.src;
            const imageElement = document.createElement("img");
            imageElement.src = imageSrc;
            imagesDiv.appendChild(imageElement);
        }
    });
```

### Step 3: Run the code

Open the `index.html` file in your browser and you will see the images from the website you specified in the `url` variable.

## How does it work?

The `fetch` function is used to fetch the HTML code of the website. The `DOMParser` is used to parse the HTML code and convert it into a HTML document. The `getElementsByTagName` function is used to get all the images from the HTML document. The `createElement` function is used to create a new image element and the `appendChild` function is used to add the image element to the `imagesDiv` div.

## Conclusion

You can extract images from a website using JavaScript and display them on your website.

## Other Code Dump

```jsx
import React, { useState, useEffect } from "react";

function ImageGallery() {
    const [domainName, setDomainName] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`https://${domainName}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch website");
                }

                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                const imageElements = doc.querySelectorAll("img");

                const imageSources = Array.from(imageElements).map(
                    (element) => element.src
                );

                setImages(imageSources);
            } catch (error) {
                console.error(error);
            }
        };

        if (domainName) {
            fetchImages();
        }
    }, [domainName]);

    return (
        <div>
            <input
                type="text"
                placeholder="Enter domain name (e.g., example.com)"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
            />
            <div className="image-container">
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`Image ${index}`} />
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;
```

```jsx
import React, { useState } from "react";
import { JSDOM } from "jsdom";

function ImageGallery() {
    const [domainName, setDomainName] = useState("");
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const response = await fetch(`https://${domainName}`);
            if (!response.ok) {
                throw new Error("Failed to fetch website");
            }

            const html = await response.text();
            const dom = new JSDOM(html);

            const document = dom.window.document;
            const imageElements = document.querySelectorAll("img");

            const imageSources = Array.from(imageElements).map(
                (element) => element.src
            );

            setImages(imageSources);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter domain name (e.g., example.com)"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
            />
            <button onClick={fetchImages}>Fetch Images</button>
            <div className="image-container">
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`Image ${index}`} />
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;
```
