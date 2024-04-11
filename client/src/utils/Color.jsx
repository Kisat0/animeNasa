export const colorDarker = (color) => {
  const colorArray = color?.split(",");
  const newColor = colorArray?.map((c) => {
    const color = c.split(" ");
    color[1] = "50%";
    return color?.join(" ");
  });
  return newColor?.join(",");
};

//! ne pas delete
/* function getDominantColor(imagePath) {
  encodeImageToBase64(imagePath).then((base64Image) => {
    if (base64Image) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = base64Image;

        // execute when image is loaded
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = this.width;
          canvas.height = this.height;
          ctx.drawImage(this, 0, 0);

          const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          ).data;

          // Map to store colors and their occurrences
          const colorMap = new Map();

          // Iterate through every pixel of the image (4 pixels at a time, since every pixel is made up of 4 values: red, green, blue, alpha)
          for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const rgb = `rgb(${r},${g},${b})`;

            if (colorMap.has(rgb)) {
              colorMap.set(rgb, colorMap.get(rgb) + 1);
            } else {
              colorMap.set(rgb, 1);
            }
          }

          // Find the color with the highest occurrence
          let maxCount = 0;
          let secondMaxCount = 0;
          let thirdMaxCount = 0;
          let dominantColor = "";
          let secondDominantColor = "";
          let thirdDominantColor = "";

          // Iterate through the map to find the dominant color
          colorMap.forEach((count, color) => {
            if (count > maxCount) {
              thirdMaxCount = secondMaxCount;
              secondMaxCount = maxCount;
              maxCount = count;
              thirdDominantColor = secondDominantColor;
              secondDominantColor = dominantColor;
              dominantColor = color;
            } else if (count > secondMaxCount) {
              thirdMaxCount = secondMaxCount;
              secondMaxCount = count;
              thirdDominantColor = secondDominantColor;
              secondDominantColor = color;
            } else if (count > thirdMaxCount) {
              thirdMaxCount = count;
              thirdDominantColor = color;
            }
          });

          // Check if the dominant color is too white because if we have many white on the background, it's not gonna be visible
          const isTooWhite = (color) => {
            const [r, g, b] = color
              .substring(4, color.length - 1)
              .replace(/ /g, "")
              .split(",");

            return r > 200 && g > 200 && b > 200;
          };

          // If the dominant color is too white, we take the second dominant color, then the third, and so on...

          if (isTooWhite(dominantColor)) {
            if (isTooWhite(secondDominantColor)) {
              if (isTooWhite(thirdDominantColor)) {
                resolve("No suitable color found.");
              } else {
                resolve(thirdDominantColor);
              }
            } else {
              resolve(secondDominantColor);
            }
          } else {
            resolve(dominantColor);
          }
        };

        img.onerror = function (error) {
          reject(error);
        };
      });
    } else {
      console.log("Failed to encode image.");
    }
  });
}

const encodeImageToBase64 = async (imageUrl) => {
  return fetch(imageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error fetching image from URL: ${response.status} ${response.statusText}`
        );
      }
      console.log("meh");
      return response.arrayBuffer();
    })
    .then((buffer) => {
      const base64String = btoa(
        new Uint8Array(buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/jpeg;base64,${base64String}`;
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
      return null;
    });
};

export default getDominantColor;
 */
