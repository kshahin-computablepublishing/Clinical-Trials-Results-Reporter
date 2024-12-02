import axios from 'axios';



  const ServerLoadState = (formState, loadState) => {

    let formData = new FormData();
    formData.append('id', formState.selectedServerState);

    axios({
      method: 'post',
      url: 'https://computablepublishing.us/fevir/loadformstate.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
    .then(function (response) {
        //handle success
        //console.log(response);

        let retrievedState = response.data;
        retrievedState.selectedServerState = formState.selectedServerState;

        loadState(retrievedState);
        return response;

    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

  };

  export default ServerLoadState;