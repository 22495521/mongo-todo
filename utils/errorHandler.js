function errorHabdler(res, status, message) {
  // console.log(res);
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };
  res.writeHead(status, headers);
  res.write(
    JSON.stringify({
      message,
    })
  );
  res.end();
}

module.exports = errorHabdler;
