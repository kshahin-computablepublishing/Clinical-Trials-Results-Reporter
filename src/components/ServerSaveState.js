import axios from 'axios';

  const ServerSaveState = (formState) => {

    let formData = new FormData();
    formData.append('projectname', formState.projectname);
    formData.append('formstate', JSON.stringify(formState));
    if (formState.selectedServerState && formState.selectedServerState !== "" && formState.loadedServerState && formState.loadedServerState) {
      formData.append('currentid', formState.selectedServerState);
    }

    return axios({
        method: 'post',
        url: 'https://computablepublishing.us/fevir/saveformstate.php',
        data: formData,
        timeout: 2000,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(response => {
        //handle success
        console.log("success");
        if (response.data === "") {
          throw new Error("error");
        }
        console.log(response);
        return response;
    })
    .catch(error => {
        //handle error
        console.log("error");
        console.log(error);
        return "error";
    });

  };

  export default ServerSaveState;