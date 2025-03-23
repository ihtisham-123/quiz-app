import Image from "next/image";
import { questions } from "@/connect";
  import QuizSection from "../components/QuizSection";
  

export default function Home() {
  return (
   
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-6xl font-bold text-center text-black">
        Quiz App
      </h1>
      <QuizSection questions={questions} />




    </div>



  </div>
  );
}
