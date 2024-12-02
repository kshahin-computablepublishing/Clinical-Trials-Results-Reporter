import axios from 'axios';

  const ServerGetStateList = (setStatesOnServer) => {

    axios.get('https://computablepublishing.us/fevir/getstatelist.php')
    .then(function (response) {
        //handle success
        console.log(response);

        let states = [];

        for (let x in response.data) {
          let id = response.data[x][0];
          let title = response.data[x][1]
          states.push(
            {
              id: id,
              key: id,
              value: id,
              text: title,
            }
          );
        }
        console.log(states);
        setStatesOnServer(states);
        return states;

    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

  };

  export default ServerGetStateList;