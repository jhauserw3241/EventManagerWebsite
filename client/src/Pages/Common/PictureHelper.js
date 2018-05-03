import fire from './../../fire';

export function handlePictureSelected(event, handleSuccess, handleError, folderName, fileName) {
    event.preventDefault();

    // Get file from input field
    var file = event.target.files[0];

    // Get file name
    var file_name = fileName ? fileName : file.name;

    // Add the file to the Google Firebase storage
    var ref = fire.storage().ref(folderName).child(file_name);
    console.log(folderName);
    console.log(file_name); 
    console.log(file);       
    ref.put(file).then(()=>{
        console.log(ref);
        console.log(ref.getDownloadURL());
        ref.getDownloadURL().then((url) => {
            console.log(ref);
            console.log(url);
            handleSuccess(url);
        }).catch((err) => {
            console.log(err);
            handleError(err.code + ": " + err.message);
        });
    }).catch((error) => {
        console.log(error);
        handleError(error.code + ": " + error.message);
    });
}