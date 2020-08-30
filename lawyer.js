const axios = require('axios');

getdata = async (req, res) => {
    try {
        let response = await axios.get("https://openlegend.heromuster.com/api/feats")
        console.log(response.data.success[1].name)
    }
    catch (error) {
        console.log(error.response);
    }
}

console.log(getdata());
