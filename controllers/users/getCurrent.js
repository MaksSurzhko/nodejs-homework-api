const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
    res.json({ email, subscription }
        // { user: { email, subscription }, }
      );
};

module.exports = getCurrent;