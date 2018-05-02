import fire from './../../fire';

export function handlePictureSelected(event, handleSuccess, handleError, folderName, fileName) {
    event.preventDefault();

    // Get file from input field
    var file = event.target.files[0];

    // Get file name
    var file_name = fileName ? fileName : file.name;

    // Add the file to the Google Firebase storage
    var ref = fire.storage().ref(folderName).child(file_name);        
    ref.put(file).then(()=>{
        ref.getDownloadURL().then((url) => {
            handleSuccess(url);
        }).catch((err) => {
            handleError(err.code + ": " + err.message);
        });
    }).catch((error) => {
        handleError(error.code + ": " + error.message);
    });
}