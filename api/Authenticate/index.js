const { Portal } = require("@mui/material");
const fetch = require("node-fetch");
// import { fetch } from "node-fetch";
module.exports = async function (context, req) {
  const userId = req.query.userId || (req.body && req.body.userId);
  const newRoleId = req.query.newRoleId || (req.body && req.body.newRoleId);

  // Get management API token
  const tokenResponse = await fetch(
    `https://${process.env.domain}/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        audience: `https://${process.env.domain}/api/v2/`,
        grant_type: "client_credentials",
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  const managementApiToken = tokenData.access_token;
  //   console.log(managementApiToken);
  switch (req.method) {
    case "GET":
      // Get user roles
      const rolesResponse = await fetch(
        `https://${process.env.domain}/api/v2/users `,
        {
          headers: {
            Authorization: `Bearer ${managementApiToken}`,
          },
        }
      );

      const rolesData = await rolesResponse.json();

      context.res = {
        // status: 200, /* Defaults to 200 */
        body: rolesData,
      };
      break;
    case "DELETE":
      const deleteResponse = await fetch(
        `https://${process.env.domain}/api/v2/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${managementApiToken}`,
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete user");
      }

      context.res = {
        // status: 200, /* Defaults to 200 */
        body: { message: "User deleted successfully" },
      };
      break;
    case "PUT":
      const assignRoleResponse = await fetch(
        `https://${process.env.domain}/api/v2/users/${userId}/roles`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${managementApiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roles: [newRoleId],
          }),
        }
      );

      if (!assignRoleResponse.ok) {
        throw new Error("Failed to assign new role to user");
      }

      context.res = {
        // status: 200, /* Defaults to 200 */
        body: { message: "Role changed successfully" },
      };
      break;
    default:
      context.res = {
        status: 405,
        body: "Method not allowed",
      };
      break;
  }
};
