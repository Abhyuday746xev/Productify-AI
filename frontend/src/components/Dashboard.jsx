import { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard(){

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

if(!link.trim()) return

setLoading(true)
setError("")
setData(null)

try{

const res=await fetch(
"https://productify-ai-2.onrender.com",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
link
})
}
)

const json=await res.json()

if(json.status==="success"){

setData(json.data)

}else{

setError(json.message)

}

}catch{

setError(
"Cannot connect to backend"
)

}

setLoading(false)

}


return(

<div className="min-h-screen bg-black text-white flex">

{/* SIDEBAR */}

<div className="w-64 p-6 border-r border-purple-800">

<h1 className="text-purple-400 text-3xl font-bold">

Productify AI

</h1>

<div className="mt-10 space-y-5">

<div
onClick={()=>setActiveTab("overview")}
className={`
cursor-pointer
p-3
rounded-xl
transition
${activeTab==="overview"
?"bg-purple-700 text-white"
:"hover:bg-white/5"}
`}
>

Dashboard

</div>


<div
onClick={()=>setActiveTab("market")}
className={`
cursor-pointer
p-3
rounded-xl
transition
${activeTab==="market"
?"bg-purple-700 text-white"
:"hover:bg-white/5"}
`}
>

Marketplace Comparison

</div>


<div
onClick={()=>setActiveTab("recommend")}
className={`
cursor-pointer
p-3
rounded-xl
transition
${activeTab==="recommend"
?"bg-purple-700 text-white"
:"hover:bg-white/5"}
`}
>

AI Recommendation

</div>

</div>

</div>



{/* MAIN */}

<div className="flex-1 p-10">

<h1 className="text-4xl font-bold text-purple-400">

Product Analyzer

</h1>



{/* SEARCH */}

<div className="mt-8 flex gap-4">

<div className="relative w-full">

<input

value={link}

onChange={(e)=>setLink(e.target.value)}

placeholder="Search product..."

className="
w-full
p-4
pr-36
rounded-xl
bg-white/5
border
border-purple-700
outline-none
"

/>


<button

onClick={()=>setShowTrending(

!showTrending

)}

className="
absolute
right-5
top-1/2
-transform
-translate-y-1/2
text-yellow-400
font-semibold
hover:text-yellow-300
"

>

↗ Trending

</button>



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

className="
absolute
top-[70px]
left-0
w-full
bg-[#111]
border
border-purple-700
rounded-xl
shadow-2xl
z-[9999]
max-h-[300px]
overflow-y-auto
"

>

{trendingProducts.map(

(item,index)=>(

<div

key={index}

onClick={()=>{

setLink(item)
setShowTrending(false)

}}

className="
p-4
cursor-pointer
hover:bg-purple-700/20
transition
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

</div>



<button

onClick={analyze}

className="
px-8
bg-purple-600
rounded-xl
hover:bg-purple-500
"

>

{

loading

?

"Analyzing..."

:

"Analyze"

}

</button>

</div>



{error && (

<div className="mt-6 text-red-400">

{error}

</div>

)}



{data && (

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="mt-10"

>


{/* OVERVIEW TAB */}

{activeTab==="overview" && (

<>

<div className="bg-white/5 p-6 rounded-xl">

<h2 className="text-2xl text-purple-400">

{data.product}

</h2>

<p className="mt-3">

{data.summary}

</p>

</div>



<div className="grid grid-cols-3 gap-5 mt-6">

<div className="bg-purple-900/30 p-4 rounded-xl">

⭐ Rating

<h2 className="text-3xl mt-2">

{data.rating}

</h2>

</div>


<div className="bg-blue-900/30 p-4 rounded-xl">

📊 Score

<h2 className="text-3xl mt-2">

{data.score}

</h2>

</div>


<div className="bg-green-900/30 p-4 rounded-xl">

🛒 Verdict

<h2 className="text-3xl mt-2">

{data.verdict}

</h2>

</div>

</div>



<div className="grid grid-cols-2 gap-5 mt-8">

<div className="bg-green-900/20 p-5 rounded-xl">

<h3 className="mb-4 text-green-400">

Pros

</h3>

{data.pros?.map(
(p,i)=>

<p key={i}>

✅ {p}

</p>

)}

</div>


<div className="bg-red-900/20 p-5 rounded-xl">

<h3 className="mb-4 text-red-400">

Cons

</h3>

{data.cons?.map(
(c,i)=>

<p key={i}>

❌ {c}

</p>

)}

</div>

</div>

</>

)}



{/* MARKETPLACE TAB */}

{activeTab==="market" && (

<>

<h2 className="text-xl text-purple-400">

Marketplace Comparison

</h2>

<div className="grid grid-cols-3 gap-5 mt-5">

{data.marketplaces?.map(

(item,index)=>(

<motion.div

whileHover={{
scale:1.05,
y:-5
}}

key={index}

className="
bg-white/5
p-5
rounded-xl
"

>

<img

src={item.image}

className="
w-full
h-24
object-contain
bg-white
rounded-lg
"

/>

<h3 className="mt-3 font-bold">

{item.name}

</h3>

<p>{item.price}</p>

<p>⭐ {item.rating}</p>

<a

href={item.url}

target="_blank"

rel="noreferrer"

className="text-cyan-400"

>

Open Product →

</a>

</motion.div>

)

)}

</div>

</>

)}



{/* RECOMMENDATION TAB */}

{activeTab==="recommend" && (

<div className="
bg-cyan-900/20
p-5
rounded-xl
">

<h2>

AI Recommendation

</h2>

<p className="mt-4">

{data.recommendation}

</p>

</div>

)}

</motion.div>

)}

</div>

</div>

)

}
