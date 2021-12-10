
var myWidget = cloudinary.createUploadWidget({
        cloudName: 'projekiso', 
        uploadPreset: 'upload-posts',
        public_id: '123'
    }, (error, result) => { 
        if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
        }
    }
)

document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
}, false);