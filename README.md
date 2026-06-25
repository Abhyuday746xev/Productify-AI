# Productify-AI

# Productify AI

Productify AI is an AI-powered shopping assistant and product analysis platform that interprets user queries, generates product insights, compares marketplace offerings, and provides approximate price intelligence using AI and SERP API integration.

The application combines generative AI with marketplace search capabilities to deliver product insights and estimated market price ranges. Productify AI is intended as a decision-support tool rather than a real-time price tracker.



## Live Demo


`https://productify-ai-five.vercel.app/`

---

## Features

* AI-powered product analysis
* Approximate marketplace price comparison
* Product summaries and purchase recommendations
* Pros and cons breakdown
* Interactive marketplace comparison graph
* Trending product suggestions
* Marketplace redirection links
* Product ratings and scoring
* Shopping insights generated using AI
* Smart product discovery assistance

---

## Note on Pricing

Productify AI provides estimated product price ranges and marketplace comparisons. Prices are not guaranteed to be real-time and may vary across platforms. The system is designed to act as a shopping assistant and product advisor rather than a live price-tracking service.

---

## Tech Stack

Frontend:

* React.js
* Tailwind CSS
* Framer Motion

Backend:

* Flask
* Python

AI & APIs:

* Google Gemini API
* SerpAPI

Deployment:

* Render

---

## Project Structure

Productify-AI/

├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/

├── backend/
│   ├── app.py
│   ├── models.py
│   └── requirements.txt

└── README.md

---

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/Abhyuday746xev/Productify-AI.git
```

Move into the project directory:

```bash
cd Productify-AI
```

Backend setup:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_key
SERP_API_KEY=your_key
```

Run backend:

```bash
python app.py
```

Frontend setup:

```bash
cd frontend
npm install
npm run dev
```

---

## Future Improvements

* More marketplace integrations
* Live market trends with discounts
* Improved recommendation accuracy
* Enhanced product trend analysis
* Personalized shopping preferences
* Personel shopping companion
---

## Author

Abhyuday Tripathi
