import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts";

export default function Dashboard() {

const [link,setLink]=useState("");
const [data,setData]=useState(null);
const [loading,setLoading]=useState(false);
const [error,setError]=useState("");
const [activeTab,setActiveTab]=useState("overview");

const [showTrending,setShowTrending]=useState(false);

const trendingProducts=[

"iPhone 17 Pro",
"PlayStation 5",
"Samsung S25 Ultra",
"AirPods Pro",
"Nike Air Max",
"MacBook Air M4",
"Nothing Phone 3",
"Protein Isolate Shake",
"Adidas Ultraboost",
"Apple Watch"

];


const analyze=async()=>{

if(!link.trim()) return;

setLoading(true);
setError("");
setData(null);

try{

const res=await fetch(
"http://127.0.0.1:5001/analyze",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
link
})

}
);

const json=await res.json();

if(json.status==="success"){

setData(json.data);

}
else{

setError(json.message);

}

}
catch{

setError(
"Cannot connect to backend"
);

}

setLoading(false);

};



const getPrice=(price)=>{

if(!price) return 0;

return Number(

price.replace(/[₹,]/g,"")

);

};



const cheapest=data?.marketplaces?.reduce(

(prev,current)=>

getPrice(current.price)

<

getPrice(prev.price)

?

current

:

prev

);



const highestPrice=Math.max(

...(data?.marketplaces?.map(

x=>getPrice(
x.price
)

)||[1])

);

const graphData = data?.marketplaces?.map((market)=>({

name:market.name,

price:getPrice(
market.price
)

})) || [];



return(

<div className="min-h-screen bg-black text-white flex">

{/* SIDEBAR */}

<div className="
w-64
border-r
border-purple-900
p-6
">

<h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
  Productify AI
</h1>


<div className="
mt-10
space-y-3
">

{[
"overview",
"marketplace",
"proscons",
"recommendation"

].map((tab)=>(

<motion.div

key={tab}

whileHover={{
x:10
}}

whileTap={{
scale:0.95
}}

onClick={()=>
setActiveTab(tab)
}

className={`

cursor-pointer
p-4
rounded-xl
capitalize
transition-all

${activeTab===tab

?

"bg-purple-700 text-white"

:

"text-purple-300 hover:bg-white/5"

}

`}

>

{

tab==="overview"

?

"📊 Dashboard"

:

tab==="marketplace"

?

"🛒 Marketplace"

:

tab==="proscons"

?

"⚖️ Pros & Cons"

:

"🤖 AI Recommendation"

}

</motion.div>

))}

</div>

</div>




{/* MAIN */}

<div className="
flex-1
p-10
">

<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
  Product Analyzer
</h1>


<div className="
mt-8
flex
gap-4
">

<div className="relative flex-1">

<input

value={link}

onChange={(e)=>
setLink(
e.target.value
)
}

placeholder="Whats on your mind today?"

className="
w-full
p-4
pr-32
rounded-xl
bg-white/5
border
border-purple-700
outline-none
"

/>


<button

type="button"

onClick={()=>

setShowTrending(

prev=>!prev

)

}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-yellow-400
font-bold
hover:text-yellow-300
"

>

↗ Trending

</button>


<AnimatePresence>

{showTrending && (

<motion.div

initial={{
opacity:0,
y:-10
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-10
}}

className="
absolute
left-0
top-[70px]
w-full
bg-[#111]
border
border-purple-700
rounded-xl
z-50
overflow-hidden
shadow-xl
"

>

{trendingProducts.map(

(item,index)=>(

<div

key={index}

onClick={()=>{

setLink(item);
setShowTrending(false);

}}

className="
p-4
cursor-pointer
hover:bg-purple-700/30
border-b
border-purple-900
"

>

🔥 {item}

</div>

)

)}

</motion.div>

)}

</AnimatePresence>

</div>



<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={analyze}

className="
px-8
bg-purple-600
rounded-xl
hover:bg-purple-500
"

>

{loading

?

"Analyzing..."

:

"Analyze"

}

</motion.button>

</div>



{error && (

<div className="
mt-6
bg-red-500/20
rounded-xl
p-4
">

{error}

</div>

)}



{data && (

<AnimatePresence mode="wait">

<motion.div

key={activeTab}

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-30
}}

transition={{
duration:0.4
}}

>

{/* PRODUCT CARD */}

<div className="
mt-10
bg-white/5
border
border-purple-700
rounded-xl
p-6
flex
gap-6
">

<img

src={data.image}

alt={data.product}

onError={(e)=>{

e.target.src=
"https://placehold.co/600x400/ffffff/000000?text=Product"

}}

className="
w-52
h-40
rounded-xl
bg-white
object-cover
"

/>

<div>

<h2 className="
text-3xl
font-bold
text-purple-400
">

{data.product}

</h2>

<p className="
mt-4
text-gray-300
">

{data.summary}

</p>

</div>

</div>



{/* OVERVIEW */}

{activeTab==="overview" && (

<>

<div className="
grid
grid-cols-3
gap-5
mt-8
">

{[
{
title:"⭐ Rating",
value:data.rating,
bg:"bg-purple-900/20"
},
{
title:"📊 Score",
value:data.score,
bg:"bg-blue-900/20"
},
{
title:"🛒 Verdict",
value:data.verdict,
bg:"bg-green-900/20"
}

].map((card,index)=>(

<motion.div

key={index}

whileHover={{
scale:1.05
}}

className={`${card.bg} p-5 rounded-xl`}

>

{card.title}

<p className="
text-2xl
font-bold
mt-3
">

{card.value}

</p>

</motion.div>

))}

</div>

</>

)}



{/* MARKETPLACE */}

{activeTab==="marketplace" && (

<>

{/* PRICE COMPARISON GRAPH */}

<div className="
mt-8
bg-white/5
border
border-purple-700
rounded-xl
p-6
">

<h2 className="
text-2xl
font-bold
text-cyan-400
mb-6
">

📈 Marketplace Price Comparison

</h2>

<div className="h-[350px]">

<ResponsiveContainer
width="100%"
height="100%"
>

<LineChart
data={graphData}
>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis
dataKey="name"
/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="price"
strokeWidth={4}
dot={{r:7}}
activeDot={{r:10}}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

{cheapest && (

<motion.div

whileHover={{
scale:1.02
}}

className="
mt-8
rounded-xl
border
border-green-500
bg-green-900/20
p-6
"

>

<h2 className="
text-2xl
font-bold
text-green-400
">

🏆 Best Deal Found

</h2>

<p className="mt-4">

Buy from <b>{cheapest.name}</b>

for

<b className="text-green-400">

{" "}
{cheapest.price}

</b>

</p>

</motion.div>

)}

<h2 className="
mt-10
text-cyan-400
text-2xl
font-bold
">

Marketplace Comparison

</h2>


<div className="
grid
grid-cols-3
gap-6
mt-6
">

{data.marketplaces?.map(

(market,index)=>{

const width=(

getPrice(
market.price
)

/

highestPrice

)*100;


return(

<motion.a

key={index}
href={market.url}
target="_blank"
rel="noreferrer"

whileHover={{
scale:1.05,
y:-10
}}

className="
group
relative
overflow-hidden
bg-white/5
border
border-purple-700
rounded-xl
p-5
"

>

<img
src={market.image}

onError={(e)=>{

e.target.src=
"https://placehold.co/300x100/ffffff/000000?text="+market.name

}}

className="
w-full
h-20
bg-white
rounded-xl
p-2
object-contain
"
/>

<h3 className="
text-xl
font-bold
mt-4
">

{market.name}

</h3>

<p className="
text-green-400
mt-3
">

💰 {market.price}

</p>

<p>

⭐ {market.rating}

</p>


<div className="
bg-gray-800
h-3
rounded-full
mt-4
">

<div

style={{
width:`${width}%`
}}

className="
bg-cyan-400
h-3
rounded-full
"

/>

</div>

{/* PRICE LINE GRAPH */}

<div className="
mt-8
bg-white/5
border
border-purple-700
rounded-xl
p-6
">

<h2 className="
text-xl
font-bold
text-cyan-400
mb-6
">

📈 Marketplace Price Comparison

</h2>

<div className="h-80">

<ResponsiveContainer
width="100%"
height="100%"
>

<LineChart
data={graphData}
>

<CartesianGrid strokeDasharray="3 3" />

<XAxis
dataKey="name"
/>

<YAxis />

<Tooltip />

<Line
type="monotone"
dataKey="price"
stroke="#00ffff"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>


<div className="
absolute
inset-0
bg-purple-700/90
flex
justify-center
items-center
opacity-0
group-hover:opacity-100
transition
duration-300
">

<p className="
font-bold
text-2xl
">



Check it out →

</p>

</div>

</motion.a>

)

}

)}

</div>

</>

)}



{/* PROS CONS */}

{activeTab==="proscons" && (

<div className="
grid
grid-cols-2
gap-6
mt-10
">

<div className="
bg-green-900/20
rounded-xl
p-5
">

<h2 className="
text-xl
font-bold
text-green-400
mb-4
">

Pros

</h2>

{data.pros?.map(

(pro,index)=>(

<p key={index}>
✅ {pro}
</p>

)

)}

</div>


<div className="
bg-red-900/20
rounded-xl
p-5
">

<h2 className="
text-xl
font-bold
text-red-400
mb-4
">

Cons

</h2>

{data.cons?.map(

(con,index)=>(

<p key={index}>
❌ {con}
</p>

)

)}

</div>

</div>

)}



{/* RECOMMENDATION */}

{activeTab==="recommendation" && (

<div className="
mt-10
bg-cyan-900/20
rounded-xl
p-6
">

<h2 className="
text-xl
font-bold
text-cyan-400
">

AI Recommendation

</h2>

<p className="
mt-4
">

{data.recommendation}

</p>

</div>

)}

</motion.div>

</AnimatePresence>

)}

</div>

</div>

)

}