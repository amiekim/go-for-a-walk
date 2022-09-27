class ImageUploader {
    async upload(file) {
        const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
        const formData = new FormData();

            formData.append("file", file);
            formData.append("upload_preset", "docs_upload_example_us_preset");
        
            const result = await fetch(url, {
            method: "POST",
            body: formData
            })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                document.getElementById("data").innerHTML += data;
            });
            return result.json();
    }
}

export default ImageUploader