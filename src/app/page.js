import Friends from "@/components/Friends";
import { FaPlus } from "react-icons/fa";


export default function Home() {
  return (
    <div className="">
   <main className="bg-[#f8fafc]">
       <div className=" py-10 px-6">
            <div className="w-10/12 mx-auto text-center">

                {/* Heading */}
                <h1 className="text-4xl font-bold text-slate-800 mb-4">
                    Friends to keep close in your life
                </h1>

                {/* Description */}
                <p className="max-w-xl mx-auto text-sm text-gray-500 mb-8 leading-relaxed">
                    Your personal shelf of meaningful connections. Browse, tend, <br></br>
                    and nurture the relationships that matter most.
                </p>

                {/* Button */}
                <button className="btn bg-[#1f5b4a] hover:bg-[#17473b] text-white border-none mb-12">
                    <FaPlus /> Add a Friend
                </button>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card bg-white shadow-sm border-gray-50">
                        <div className="card-body items-center text-center py-6">
                            <h2 className="text-4xl font-bold text-[#1f5b4a]">10</h2>
                            <p className="text-gray-500">Total Friends</p>
                        </div>
                    </div>

                    <div className="card bg-white shadow-sm border-gray-50">
                        <div className="card-body items-center text-center py-6">
                            <h2 className="text-4xl font-bold text-[#1f5b4a]">3</h2>
                            <p className="text-gray-500">On Track</p>
                        </div>
                    </div>

                    <div className="card bg-white shadow-sm border-gray-50">
                        <div className="card-body items-center text-center py-6">
                            <h2 className="text-4xl font-bold text-[#1f5b4a]">6</h2>
                            <p className="text-gray-500">Need Attention</p>
                        </div>
                    </div>

                    <div className="card bg-white shadow-sm border-gray-50">
                        <div className="card-body items-center text-center py-6">
                            <h2 className="text-4xl font-bold text-[#1f5b4a]">12</h2>
                            <p className="text-gray-500">Interactions This Month</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className=" border-gray-300 mt-10"></div>

            </div>
        </div> 
        <Friends></Friends>
    </main>
</div>
  );
}
