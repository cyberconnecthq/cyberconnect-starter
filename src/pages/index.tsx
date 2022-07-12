import type { NextPage } from "next";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

const Home: NextPage = () => {
  return (
    <div className=" h-screen overflow-y-scroll md:space-y-6">
      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed />
        </div>

        <Widgets />
      </main>
    </div>
  );
};

export default Home;
