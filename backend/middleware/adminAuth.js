import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    const { token } = req.headers;
    

    try {
    
        // Check if token exists before verifying it
        if (!token) {
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        // Decode the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
       

        // Check if the decoded token matches the admin email or any relevant field
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        next();
    } catch (error) {
        // Handle errors like invalid token, etc.
        console.error(error);
        return res.json({ success: false, message: "Invalid Token or Authorization Failed" });
    }
};

export default adminAuth;
