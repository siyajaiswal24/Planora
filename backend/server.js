import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// CORS configuration supporting multiple environments
const FRONTEND_URL = process.env.FRONTEND_URL
const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }

    const normalizedOrigin = origin.replace(/\/$/, '')
    const isAllowedVercel = normalizedOrigin.endsWith('.vercel.app')

    if (allowedOrigins.includes(normalizedOrigin) || isAllowedVercel) {
      return callback(null, true)
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`))
  },
  credentials: true,
}))
app.use(express.json())

app.get('/', (req, res) => {

  res.send('Planora Backend Running')

})

app.post('/generate-trip', async (req, res) => {

  try {

    const {
      from,
      destination,
      startDate,
      endDate,
      budget,
      travelType,
      interests,
    } = req.body

    const start = new Date(startDate.split(' ').reverse().join(' ')) // assuming dd MMM yyyy
    const end = new Date(endDate.split(' ').reverse().join(' '))
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1

    const prompt = `

You are an expert AI travel planner.

Create a VERY detailed and realistic travel itinerary for ${days} days.

Trip Details:

Starting Location: ${from}

Destination: ${destination}

Travel Dates: ${startDate} to ${endDate}

Budget: ₹${budget}

Travel Type: ${travelType}

Interests: ${interests.join(', ')}

IMPORTANT RULES:

- Suggest ONLY REAL famous places
- Suggest ONLY REAL famous cafes/restaurants
- Suggest ONLY REAL famous hotels
- Hotels must match user's budget
- Create LONG day-wise itinerary
- Mention timings
- Mention transport suggestions
- Mention food recommendations
- Mention shopping places
- Mention famous attractions
- Mention estimated costs
- Include morning, afternoon and evening plans

Return ONLY VALID JSON without any markdown code blocks or extra text.

FORMAT:

{
  "famousHotels": [
    {
      "name": "Hotel Name",
      "description": "Hotel description"
    }
  ],

  "famousRestaurants": [
    {
      "name": "Restaurant Name",
      "description": "Restaurant description"
    }
  ],

  "famousPlaces": [
    {
      "name": "Place Name",
      "description": "Place description"
    }
  ],

  "itinerary": {

    "day1": {

      "title": "",

      "morning": "",

      "afternoon": "",

      "evening": "",

      "recommendedFood": "",

      "bestPhotoSpots": "",

      "shoppingSuggestions": "",

      "transportation": "",

      "estimatedBudget": "",

      "travelTips": ""

    }

  }

}

`

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {

        method: 'POST',

        headers: {

          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          'HTTP-Referer': 'http://localhost:5173',

          'X-Title': 'Planora',

          'Content-Type': 'application/json',

        },

        body: JSON.stringify({

          model: 'gpt-4o-mini',

          messages: [

            {
              role: 'system',
              content: 'Return ONLY valid JSON.',
            },

            {
              role: 'user',
              content: prompt,
            },

          ],

          temperature: 0.7,

          max_tokens: 3500,

        }),

      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.log('OpenRouter error:', data)
      return res.status(500).json({
        error: data,
      })
    }

    console.log(data)

    if (!data.choices) {
      return res.status(500).json({
        error: data,
      })
    }

    const text =
      data.choices[0].message.content

    let parsedData

    try {

      parsedData =
        JSON.parse(text)

    } catch (err) {

      console.log('INVALID JSON', text)

      return res.status(500).json({
        error: 'Failed to generate trip itinerary. Please try again.',
      })

    }

    res.json(parsedData)
  } catch (error) {

    console.log(error)

    res.status(500).json({

      error: 'Something went wrong',

    })

  }

})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})