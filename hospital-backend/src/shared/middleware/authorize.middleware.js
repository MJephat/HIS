export const authorize = (...permissions) => {

    return (req, res, next) => {

        console.log("========== AUTHORIZE ==========");
        console.log("Required:", permissions);
        console.log("User:", JSON.stringify(req.user, null, 2));

        const userPermissions = [];

        if (!req.user?.roles) {
            return res.status(403).json({
                success: false,
                message: "User has no roles.",
            });
        }

        req.user.roles.forEach((userRole) => {

            console.log("Role:", userRole.role?.name);

            userRole.role?.permissions?.forEach((rolePermission) => {

                console.log(
                    "Permission:",
                    rolePermission.permission.name
                );

                userPermissions.push(rolePermission.permission.name);

            });

        });

        console.log("Collected Permissions:", userPermissions);

        const allowed = permissions.some(permission =>
            userPermissions.includes(permission)
        );

        console.log("Allowed:", allowed);

        if (!allowed) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }

        next();
    };

};

// export const authorize = (...permissions) => {

//     return (req, res, next) => {

//         const userPermissions = [];

//         req.user.roles.forEach(userRole => {

//             userRole.role.permissions.forEach(rolePermission => {

//                 userPermissions.push(
//                     rolePermission.permission.name
//                 );

//             });

//         });

//         console.log("Required:", permissions);
//         console.log("User Permissions:", userPermissions);

//         const allowed = permissions.some(permission =>
//             userPermissions.includes(permission)
//         );

//         console.log("Allowed:", allowed);

//         if (!allowed) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Forbidden",
//             });
//         }

//         next();

//     };

// };