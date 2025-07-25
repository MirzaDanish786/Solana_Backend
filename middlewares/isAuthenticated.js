import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  // const token = req.cookies?.token;
    // console.log(token );
  const authHeader = req?.headers?.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({message: "Bearer token is missing!", success: false })
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'solana.dev',
      audience: 'solana-users',
    });

    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
