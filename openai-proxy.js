const fetch = require('node-fetch')

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Only POST' })
  const userMessage = req.body.message || ''
  if (!userMessage || userMessage.length > 3000) return res.status(400).json({ error: 'Invalid message' })

  const systemPrompt = `You are a professional financial advisor assistant. Only provide information directly related to personal finance, investing, budgeting, retirement planning, loans, taxes, and related economic topics. If the user asks for medical, legal, illicit, or other non-financial advice, politely refuse and suggest they consult a relevant professional. Do not provide personalized regulated financial advice (like specific tax/legal directions). Always include a brief disclaimer when giving tax or legal guidance: consult a licensed professional.`

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
        max_tokens: 700
      })
    })
    const data = await r.json()
    const reply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : 'Sorry, no response.'
    res.status(200).json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'OpenAI error' })
  }
}
