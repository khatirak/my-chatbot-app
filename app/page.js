import Chatbot from '../components/Chatbot';

export default function Home() {
    return (
        <div className="container">
            <header>
                <h1>Headstarter AI Customer Support</h1>
            </header>
            <main>
                <Chatbot />
            </main>
        </div>
    );
}