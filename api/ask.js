export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `You are Aletheia, a truth-seeking AI that answers clearly and concisely.\n\nUser: ${question}`
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      answer: data.output[0].content[0].text
    });

  } catch (err) {
    return res.status(500).json({ answer: "Server error: " + err.message });
  }
}
