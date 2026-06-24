from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import requests
from dotenv import load_dotenv
import json
import os

load_dotenv()

app = Flask(__name__)
from flask_cors import CORS

CORS(app, resources={
    r"/*": {
        "origins": [
            "https://productify-ai-five.vercel.app"
        ]
    }
})




client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

SERP_API_KEY = os.getenv("SERP_API_KEY")


@app.route("/")
def home():
    return "OK"

@app.route("/analyze", methods=["POST"])
def analyze():

    try:

        data = request.get_json()
        query = data.get("link")

        if not query:

            return jsonify({

                "status":"error",
                "message":"Product required"

            }),400


        query_lower=query.lower()


        # -------------------------
        # Available marketplaces
        # -------------------------

        sites=[

            ("Amazon","amazon.in"),
            ("Flipkart","flipkart.com"),
            ("Myntra","myntra.com"),
            ("Croma","croma.com"),
            ("JioMart","jiomart.com")

        ]


        marketplace_names=[x[0] for x in sites]


        # -------------------------
        # Marketplace URLs
        # -------------------------

        from urllib.parse import quote

        marketplace_links={}

        query_encoded=quote(query)

        for name,site in sites:


            if name=="Amazon":

                marketplace_links[name]=(
                    f"https://www.amazon.in/s?k={query_encoded}"
                )


            elif name=="Flipkart":

                marketplace_links[name]=(
                    f"https://www.flipkart.com/search?q={query_encoded}"
                )


            elif name=="Myntra":

                marketplace_links[name]=(
                    f"https://www.myntra.com/{query_encoded}"
                )


            elif name == "Croma":

                search_text = query.strip().lower().replace(" ", "%20")

                marketplace_links[name] = (
                    f"https://www.croma.com/searchB?q={search_text}%3Arelevance&text={search_text}"
            )


            elif name=="JioMart":

                marketplace_links[name]=(
                    f"https://www.jiomart.com/products?q={query_encoded}"
                )



        # -------------------------
        # Gemini prompt
        # -------------------------

        prompt=f"""

Analyze this product:

{query}

Available marketplaces:

{marketplace_names}

Return ONLY valid JSON:

{{
"product":"",
"summary":"",
"rating":"",
"score":0,
"verdict":"",
"pros":[],
"cons":[],
"recommendation":"",
"marketplaces":[]
}}

Rules:

1. Decide which marketplaces realistically sell the product

2. Use ONLY from:
{marketplace_names}



3. Use ₹ symbol

4. Ratings should vary between 3.8–5

5. Recommendation should mention best deal

6. Verdict only BUY / SKIP / CONSIDER

7. Return ONLY JSON


Example:

"marketplaces":[

{{
"name":"Amazon",
"price":"₹54999",
"rating":"4.5"
}},

{{
"name":"Flipkart",
"price":"₹53999",
"rating":"4.4"
}}

]

"""


        try:

            response = client.models.generate_content(

                model="gemini-2.5-flash",
                contents=prompt

            )


        except Exception:
            try:


                response = client.models.generate_content(

                    model="gemini-2.5-flash-lite",
                    contents=prompt

                )
            except:
                response = client.models.generate_content(

                    model="gemini-3.1-flash-lite",
                    contents=prompt

                )


        text=response.text
        text=text.replace("```json","")
        text=text.replace("```","")
        text=text.strip()

        result=json.loads(text)
        text = response.text
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        result = json.loads(text)
        live_marketplaces=get_live_prices(query)

        if live_marketplaces:

            result["marketplaces"]=live_marketplaces



        # -------------------------
        # Product image
        # -------------------------

        query_encoded_img = query.replace(" ","+")

        if any(word in query_lower for word in [

            "nike",
            "shoe",
            "adidas",
            "sneaker",
            "reebok",
            "puma",
            "footwear"


        ]):

            result["image"]=(

                f"https://placehold.co/600x400/1a1a1a/ffffff?text=Shoes+{query_encoded_img}"

            )


        elif any(word in query_lower for word in [

            "iphone",
            "samsung",
            "mobile",
            "laptop",
            "macbook",
            "electronics",
            "smartphones",
            "TV"

        ]):

            result["image"]=(

                f"https://placehold.co/600x400/1a1a1a/ffffff?text=Electronics+{query_encoded_img}"

            )


        elif any(word in query_lower for word in [

            "protein",
            "supplement",
            "whey"

        ]):

            result["image"]=(

                f"https://placehold.co/600x400/1a1a1a/ffffff?text=Protein+{query_encoded_img}"

            )


        else:

            result["image"]=(

                f"https://placehold.co/600x400/1a1a1a/ffffff?text=Product+{query_encoded_img}"

            )



        # -------------------------
        # Marketplace logos
        # -------------------------

        logos={

            "Amazon":
            "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",

            "Flipkart":
            "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",

            "Myntra":
            "https://logos-world.net/wp-content/uploads/2020/11/Myntra-Logo.png",

            "Croma":
            "https://upload.wikimedia.org/wikipedia/commons/0/00/Croma_Logo.png",

            "JioMart":
            "https://upload.wikimedia.org/wikipedia/commons/1/1b/JioMart_logo.png"

        }



        # -------------------------
        # Inject marketplace data
        # -------------------------

        for item in result["marketplaces"]:

            name=item["name"]

            if name in marketplace_links:

                item["image"]=logos.get(name)

                item["url"]=marketplace_links[name]



        return jsonify({

            "status":"success",
            "data":result

        })



    except Exception as e:

        error_message = str(e)

        if "503" in error_message:

            return jsonify({

                "status":"error",
                "message":"AI service is busy. Please try again in a few seconds."

            }),503

        return jsonify({

            "status":"error",
            "message":error_message

        }),500



if __name__=="__main__":

    app.run(
        debug=True,
        port=5001
    )
