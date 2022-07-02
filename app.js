const express = require("express");
const axios = require("axios").default;
const app = express();
const nodeHtmlToImage = require("node-html-to-image");
const port = process.env.PORT || 3000;

app.get("/:owner/:reponame", async (req, res) => {
  await axios
    .get(
      `https://api.github.com/repos/${req.params.owner}/${req.params.reponame}/stargazers?per_page=100`
    )
    .then(async function (response) {
      // handle success

      const image = await nodeHtmlToImage({
        html: svgGenerator(response.data),
        transparent: true,
      });
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(image, "binary");

      // res.send(svgGenerator(response.data));
      //console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);

      res.send(error);
    })
    .then(function () {
      // always executed
    });
});

app.get("/", async (req, res) => {
  res.send(" use url /:owner/:reponame");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

svgGenerator = (data) => {
  let count = 1;
  let svg = "";
  data.forEach((element, index) => {
    svg += `<div class="card">
        <img src="${element.avatar_url}" alt="Avatar" style="width:80px">
       
    </div>`;
  });
  return header + svg + footer;
};

var header = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
  <style>
  .boxy {
    display: flex;
    flex-wrap: wrap;
    
  }
  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 80px;
    margin: 10px;
    border-radius: 5px;
    
  }
  
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  
  img {
    border-radius: 5px 5px 0 0;
  }
  
  .container {
    padding: 2px 16px;
  }
  </style>
<div class="boxy">
`;

var footer = `
</div>
</svg>
`;
