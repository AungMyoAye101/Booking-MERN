// import { Link } from "react-router-dom";
// // import useFetch from "../hooks/useFetch";
// import { useRef } from "react";
// import { PiGreaterThan, PiLessThan } from "react-icons/pi";
// const HotelList = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const handleSlide = (isRight: boolean) => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({
//         left: isRight ? 300 : -300,
//         behavior: "smooth",
//       });
//     }
//   };
//   // const { data, loading, error } = useFetch("api/hotel");


//   return (
//     <section>
//       <h1 className="text-4xl font-semibold font-roboto">Home Guess Love</h1>
//       <div className="relative">
//         <button
//           onClick={() => handleSlide(false)}
//           className="bg-white flex items-center justify-center text-black z-10 rounded-full w-10 h-10 absolute left-0 top-[50%] translate-y-[-50%]"
//         >
//           <PiLessThan />
//         </button>
//         <button
//           onClick={() => handleSlide(true)}
//           className="bg-white flex items-center justify-center text-black z-10 rounded-full w-10 h-10 absolute right-0 top-[50%] translate-y-[-50%]"
//         >
//           <PiGreaterThan />
//         </button>
//         <main
//           ref={containerRef}
//           className="flex gap-4 overflow-hidden flex-nowrap  relative py-4"
//         >
//           {data.map((item, i) => (
//             <Link
//               to={`hotel/${item._id}`}
//               key={i}
//               className="min-w-[250px]   relative rounded-lg overflow-hidden shadow-lg cursor-pointer bg-white"
//             >
//               <div className=" overflow-hidden h-72 aspect-square">
//                 <img
//                   src={item.photos[0]}
//                   alt="image"
//                   className="w-full h-full hover:scale-125 transition-transform ease-in-out aspect-square"
//                 />
//               </div>
//               <div className="py-4 px-2 flex flex-col gap-1">
//                 <div className="flex justify-between items-center gap-4">
//                   <p className="text-sm opacity-90">{item.type}</p>
//                   <div className="bg-blue-800 p-1.5  text-white text-xs rounded">
//                     {item.rating}
//                   </div>
//                 </div>

//                 <h2 className="  font-roboto text-xl font-semibold">
//                   {item.name}
//                 </h2>
//                 <h2 className="  font-roboto  font-semibold opacity-80">
//                   {item.title}
//                 </h2>

//                 <div className="self-end font-roboto">
//                   <span className="text-sm ">Starting from </span>
//                   <span className="font-semibold ml-1">
//                     ${item.price}
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </main>
//       </div>
//     </section>
//   );
// };

// export default HotelList;
