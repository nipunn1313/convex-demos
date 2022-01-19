import { useState, FormEvent } from "react";
import { ConvexClient, useInflight, useQuery } from "@convex-dev/react";

// Initialize Convex Client and connect to server in convex.json.
import convexConfig from "../convex.json";

const convex = new ConvexClient(convexConfig.origin);
const randomName = "User " + Math.floor(Math.random() * 10000);

export default function App() {
  // Dynamically update `messages` in response to the output of
  // `listMessages.ts`.
  const messages = useQuery(convex.query("listMessages")) || [];

  // Run `sendMessage.ts` as a transaction to record a chat message when
  // `handleSendMessage` triggered.
  const [newMessageText, setNewMessageText] = useState("");
  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (newMessageText) {
      setNewMessageText(""); // reset text entry box
      await convex.transaction("sendMessage").call(newMessageText, randomName);
    }
  }
  return (
    <main className="py-4">
      <h1 className="text-center">Convex Chat</h1>
      <p className="text-center">
        <span>Redeploy #2</span>
      </p>
      <p className="text-center">
        <span className="badge bg-dark">{randomName}</span>
      </p>
      <ul className="list-group shadow-sm my-3">
        {messages.slice(-10).map((message: any) => (
          <li
            key={message._id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <strong>{message.author}:</strong> {message.body}
            </div>
            <div className="ml-auto text-secondary text-nowrap">
              {new Date(message.time).toLocaleTimeString()}
            </div>
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSendMessage}
        className="d-flex justify-content-center"
      >
        <input
          value={newMessageText}
          onChange={(event) => setNewMessageText(event.target.value)}
          className="form-control w-50"
          placeholder="Write a message…"
        />
        <input type="submit" value="Send" className="ms-2 btn btn-primary" />
      </form>
    </main>
  );
}
