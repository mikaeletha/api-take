const express = require('express');
const axios = require('axios');
const server = express();
const gitHub = 'https://api.github.com/users/takenet/repos';
const port = process.env.PORT || 3000;

server.get('/',async(req, res) => {
  const response = await axios.get(gitHub)
  var projectC = [];
  var j = 0;

  for (var i = 0; i < response.data.length; i++){
    if (response.data[i].language === "C#") {
      projectC[j] = response.data[i]
      j++
    }
  }
  projectC.sort(function(a,b) {
    if (a.created_at > b.created_at) {
      return 1;
    }
    if (a.created_at < b.created_at) {
      return -1;
    }
    return 0;
  })
    return res.json(projectC)
})
server.listen(port, () => {
  console.log("servidor ok")
})
