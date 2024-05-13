const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: `https://${process.env.domain}/.well-known/jwks.json`,
});

console.log("");
module.exports = async function (context, req) {
  const token =
    req.headers.authorization;
  console.log(token);
  console.log(req.headers.authorization);
  if (!token) {
    context.res = {
      status: 401,
      body: "Missing token",
    };
    return;
  }

  const { header } = jwt.decode(token, { complete: true });

  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      context.res = {
        status: 500,
        body: "Error getting signing key",
      };
      return;
    }

    jwt.verify(
      token,
      key.publicKey,
      { algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) {
          context.res = {
            status: 401,
            body: "Invalid token",
          };
          return;
        }

        // Token is valid, continue processing the request
        context.res = {
          status: 200,
          body: "Hello, authorized user!",
        };
      }
    );
  });
};
