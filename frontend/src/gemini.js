import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyA1y1T4_oykObgXCtdH_F1TTc_QCY1D_2w";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Weather function (can be moved to its own file)
async function getWeatherByCity(city) {
  const weatherKey = "0fb018f91c3c0c123ff6713773f49421";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${weatherKey}&units=metric`
  );

  const data = await res.json();
  if (data.cod !== 200) throw new Error(data.message);

  return {
    location: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    wind: data.wind.speed,
    rainfall: data.rain?.["1h"] || 0,
  };
}

// Chat session holder
let chatSession = null;

// Main AI runner
async function run(userPrompt, city = "Mathura") {
  // Get live weather for the city
  let weatherContext = "Live weather unavailable.";
  try {
    const weather = await getWeatherByCity(city);
    const { location, temperature, humidity, description, wind, rainfall } = weather;

    weatherContext = `
**Live Weather Report for ${location}:**
- Temperature: ${temperature}°C
- Humidity: ${humidity}%
- Condition: ${description}
- Wind Speed: ${wind} m/s
- Rainfall: ${rainfall} mm (last hour)
    `.trim();
  } catch (error) {
    console.error("Weather fetch failed:", error.message);
  }

  // Build assistant role with fresh weather context
  const assistantRolePrompt = `
  You are AgriOptimize — an intelligent, data-driven agricultural assistant designed to simulate real-world farming support. You help farmers make better decisions based on weather forecasts, soil data, crop conditions, and seasonal patterns.

  **${weatherContext}**

  Your responsibilities:
  - Provide tailored advice for:
    * 💧 Water optimization (based on current and forecasted weather, soil moisture)
    * 🌱 Fertilizer application (based on crop stage, soil nutrients, and crop type)
    * 🐛 Pest and disease control (based on recent activity, season, and regional risk)
    * 🌦️ Weather impact (advise actions based on rainfall, humidity, wind, and temperature trends)
    * 📊 Farm performance tracking (efficiency, savings, yield potential)

  Response style:
  - Use **bold** for section headers and *bullets* for tips.
  - Structure information clearly: start with a summary, followed by actionable insights.
  - Keep your tone friendly, clear, and practical — like an expert agronomist helping a farmer.

  Live whether data :
   ${weatherContext}


  Simulation context:
  - Imagine you have access to real-time farm data: crop type, location, recent rainfall, temperature, soil analysis, and previous user messages.
  - Use that context to simulate realistic, location-aware suggestions — even if you don’t have the actual live data.
  - When weather-sensitive, mention timing: e.g., “delay irrigation for 2 days due to expected rainfall.”

  Boundaries:
  - Stay focused on agriculture. Kindly decline off-topic questions.
  - If the user's input lacks data (e.g., no crop type or field info), ask smart questions to fill the gap before giving advice.

  Your goal is to maximize yield, save resources, and promote sustainable farming through realistic, helpful suggestions.
  `.trim();


  // Start session if not already
  if (!chatSession) {
    chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: assistantRolePrompt }],
        },
      ],
    });
  }

  // Send user prompt
  const result = await chatSession.sendMessage(userPrompt);
  return result.response.text();
}

export default run;
