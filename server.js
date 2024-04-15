const http = require("node:http");
const { v4: uuidv4 } = require("uuid");
const errorHandler = require("./utils/errorHandler");
const successHandler = require("./utils/successHandler");
const connectMongoDb = require("./connections/index");
const posts = require("./Model/Modelposts");

(async () => {
  try {
    await connectMongoDb();
  } catch (error) {
    console.log(error);
  }
})();

const todos = [];
const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  //查看
  if (url === "/post" && method === "GET") {
    try {
      const getres = await posts.find();
      successHandler(res, 200, {
        status: "success",
        data: getres,
      });
    } catch (error) {
      return errorHandler(res, 500, "查詢錯誤");
    }

    //新增
  } else if (url === "/post" && method === "POST") {
    req.on("end", async () => {
      try {
        body = JSON.parse(body);
        const { content, name, tags, type } = body;
        if (content !== undefined) {
          const postsres = await posts.create({
            content,
            name,
            tags,
            type,
          });
          successHandler(res, 200, {
            status: "success",
            data: postsres,
          });
        } else {
          return errorHandler(res, 400, "content未填寫");
        }
      } catch (error) {
        console.log(error);
        return errorHandler(res, 500, error);
      }
    });
    //刪除全部
  } else if (method === "OPTIONS") {
    const headers = {
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Content-Length, X-Requested-With",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
      "Content-Type": "application/json",
    };
    res.writeHead(200, headers);
    res.end();
  } else {
    errorHandler(res, 404, "找不到此路由");
  }
});

const port = process.env.PORT || 3000;
server.listen(port);
