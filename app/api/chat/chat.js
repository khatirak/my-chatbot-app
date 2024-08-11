import { main } from '../route';

export default async function handler(req, res) {
    const { message } = req.body;

    try {
        const response = await main(message);
        res.status(200).json({ message: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}
