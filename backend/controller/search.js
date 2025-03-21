
const searchController = async (req, res) => {
    console.log("searching...")
    const { destination } = req.query;
    console.log(destination);
    res.status(200).json("Searching...");
}


module.exports = { searchController };