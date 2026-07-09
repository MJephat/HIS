export const health = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Hospital API Running",

        timestamp: new Date()

    });

};