const fetch = require("node-fetch");
// import { fetch } from "node-fetch";
module.exports = async function (context, req) {
  const userId = req.query.userId || (req.body && req.body.userId);
  const newRoleId = req.query.newRoleId || (req.body && req.body.newRoleId);
  // Get management API token
  const tokenResponse = await fetch(
    "https://dev-1ycr2f4brea4mqn0.us.auth0.com/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: "Re9lqXCcNYY2RuF4xhbNtNdyN3wdYsmc",
        client_secret:
          "HA5q43MvPquaMAPXe8XsNODTTkG4_NcSuYBDt7LZ4C_b5xoZoUdxWqOsZlHf7w-a",
        audience: "https://dev-1ycr2f4brea4mqn0.us.auth0.com/api/v2/",
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
        `https://dev-1ycr2f4brea4mqn0.us.auth0.com/api/v2/users/${userId} `,
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
        `https://dev-1ycr2f4brea4mqn0.us.auth0.com/api/v2/users/${userId}`,
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
            `https://dev-1ycr2f4brea4mqn0.us.auth0.com/api/v2/users/${userId}/roles`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${managementApiToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                roles: [newRoleId]
              })
            }
          );
        
          if (!assignRoleResponse.ok) {
            throw new Error('Failed to assign new role to user');
          }
        
          context.res = {
            // status: 200, /* Defaults to 200 */
            body: { message: 'Role changed successfully' },
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
