// export const successResponse = (res, data = null, message = "Success", status = 200) => {
//     return res.status(status).json({ success: true, message, data,});
// };

// export const errorResponse = ( res, message = "Error", status = 500, errors = null) => {
//     return res.status(status).json({ success: false, message, errors, });
// };

class ApiResponse {

    static success(res, data = null, message = "Success", status = 200) {
        return res.status(status).json({
            success: true,
            message,
            data,
        });

    }

    static error(res, message = "Something went wrong", status = 500, errors = null) {
        return res.status(status).json({
            success: false,
            message,
            errors,
        });

    }

    static paginated( res, data, page, limit, total, message = "Success") {

        return res.status(200).json({
            success: true,
            message,
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrevious: page > 1,

            },

        });

    }

}

export default ApiResponse;