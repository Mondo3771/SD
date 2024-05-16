// import { fetch } from "node-fetch"
// fetch = require("node-fetch");
module.exports = async function (context, req) {
  const nodeFetch = await import("node-fetch");
  const fetch = nodeFetch.default;
  // Get management API token
  const tokenResponse = await fetch(
    `https://${process.env.DOMAIN}/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        audience: `https://${process.env.DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      }),
    }
  );

  const tokenData = await tokenResponse.json();
  // console.log(tokenData);

  const managementApiToken = tokenData.access_token;
  //   console.log(managementApiToken);
  switch (req.method) {
    case "GET":
      // Get user roles
      const rolesResponse = await fetch(
        `https://${process.env.DOMAIN}/api/v2/users `,
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
      // console.log(context);
      break;
    // case "DELETE":
    //   const deleteResponse = await fetch(
    //     `https://${process.env.domain}/api/v2/users/${userId}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         Authorization: `Bearer ${managementApiToken}`,
    //       },
    //     }
    //   );

    //   if (!deleteResponse.ok) {
    //     throw new Error("Failed to delete user");
    //   }

    //   context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: { message: "User deleted successfully" },
    //   };
    //   break;
    // case "PUT":
    //   const assignRoleResponse = await fetch(
    //     `https://${process.env.domain}/api/v2/users/${userId}/roles`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${managementApiToken}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         roles: [newRoleId],
    //       }),
    //     }
    //   );

    //   if (!assignRoleResponse.ok) {
    //     throw new Error("Failed to assign new role to user");
    //   }

    //   context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: { message: "Role changed successfully" },
    //   };
    //   break;
    default:
      context.res = {
        status: 405,
        body: "Method not allowed",
      };
      break;
  }
};
