const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
    token: process.env.AITOKEN, 
    
    // Assuming you've stored your API key in an environment variable named CO_API_KEY
});

const chatController = async (req, res) => {
    try {
        
        const { text } = req.body;

        const chatStream = await cohere.generate({
            prompt: text,
            max_tokens: 150,
        });

        res.json(chatStream);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = chatController;
