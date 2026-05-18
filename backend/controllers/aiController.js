const axios = require('axios');
const Employee = require('../models/Employee');

const recommendAI = async (req, res) => {
    try {
        const { employeeId } = req.body;
        let employeesData = [];
        
        if (employeeId) {
            const employee = await Employee.findById(employeeId);
            if (!employee) return res.status(404).json({ message: 'Employee not found' });
            employeesData = [employee];
        } else {
            employeesData = await Employee.find({});
        }

        if (employeesData.length === 0) {
            return res.status(400).json({ message: 'No employee data available for recommendation' });
        }

        const prompt = `
        You are an expert HR analytics AI. Analyze the following employee(s) data:
        ${JSON.stringify(employeesData, null, 2)}
        
        Provide the following:
        1. Promotion Recommendation: Identify high performance employees and suggest promotions.
        2. Employee Ranking: Rank them based on performance and experience.
        3. Training Suggestions: Identify skill gaps or missing skills and recommend enhancements.
        4. AI Feedback Generation: Provide improvement feedback for low score employees.

        Format the output clearly using Markdown or simple structured text.
        `;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'openai/gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiResponse = response.data.choices[0].message.content;
        res.json({ recommendation: aiResponse });

    } catch (error) {
        console.error('AI API Error:', error.response?.data || error.message);
        const errorMsg = error.response?.data?.error?.message || error.message;
        res.status(500).json({ message: `AI Error: ${errorMsg}` });
    }
};

module.exports = { recommendAI };
