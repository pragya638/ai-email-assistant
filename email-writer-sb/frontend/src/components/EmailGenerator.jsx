import { useState } from "react";
import axios from "axios";

function EmailGenerator() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("friendly");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateReply = async () => {
    if (!emailContent.trim()) {
      alert("Please enter email content");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
  "https://ai-email-assistant-mjac.onrender.com/api/email/generate",
  {
    emailContent,
    tone,
  }
);

      setGeneratedReply(response.data);
    } catch (error) {
      console.error(error);
      setGeneratedReply(
        "Unable to generate reply right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>📧 Smart Email Assistant</h1>

        <p className="subtitle">
          Generate professional email replies instantly using AI
        </p>

        <label>Original Email</label>

        <textarea
          placeholder="Paste the email you received here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />

        <div className="controls">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
          </select>

          <button
            onClick={generateReply}
            disabled={loading}
          >
            {loading ? "⏳ Generating..." : "Generate Reply"}
          </button>
        </div>

        {generatedReply && (
          <div className="result">
            <h2>Generated Reply</h2>

            <textarea
              value={generatedReply}
              readOnly
            />

            <button onClick={copyToClipboard}>
              Copy Reply
            </button>

            {copied && (
              <p className="success-message">
                ✅ Reply copied successfully
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailGenerator;