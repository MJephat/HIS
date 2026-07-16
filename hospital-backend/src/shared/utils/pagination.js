export const pagination = (page, limit) => {

    page = Number(page) || 1;

    limit = Number(limit) || 10;

    const skip = (page - 1) * limit;

    return {

        page,

        limit,

        skip,

    };

};