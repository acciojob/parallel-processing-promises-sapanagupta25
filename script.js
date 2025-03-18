const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image from ${url}`);
  });
}

// Function to handle the download process
function downloadImages() {
  // Clear previous output and errors
  output.innerHTML = "";
  errorDiv.innerText = "";

  // Show loading spinner
  loading.style.display = "block";

  // Create an array of promises for each image download
  const downloadPromises = images.map((image) => downloadImage(image.url));

  Promise.all(downloadPromises)
    .then((downloadedImages) => {
      // Hide loading spinner
      loading.style.display = "none";

      // Append each downloaded image to the output div
      downloadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Hide loading spinner
      loading.style.display = "none";

      // Display error message
      errorDiv.innerText = error;
    });
}

// Event listener for the button
btn.addEventListener("click", downloadImages);
