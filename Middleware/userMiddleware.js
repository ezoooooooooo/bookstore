const authenticateUser = (req, res, next) => {
    if (req.session.userId) {
      // User is authenticated
      next(); // Continue to the next middleware or route handler
    } else {
      // User is not authenticated
      res.status(401).json({ message: 'Unauthorized' });
    }
  };