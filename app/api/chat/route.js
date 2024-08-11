import axios from 'axios';

export async function POST(req) {
    const { message } = await req.json();

    if (!message) {
        return new Response(JSON.stringify({ message: 'Message is required' }), { status: 400 });
    }

    try {
        const response = await axios.post('https://api.groqcloud.com/your-endpoint', {
            message: message,
            apiKey: process.env.GROQCLOUD_API_KEY,
        });

        return new Response(JSON.stringify({ message: response.data.response }), { status: 200 });
    } catch (error) {
        console.error('Error communicating with GroqCloud API:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
