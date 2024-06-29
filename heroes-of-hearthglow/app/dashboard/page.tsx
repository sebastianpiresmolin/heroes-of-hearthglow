import LatestFiveNews from '../ui/latest-five-news';

export default function DashboardHome() {
  return (
    <div>
      <div className="flex-col w-3/5 h-full">
        <div className="flex gap-10">
          <div className="bg-neutral-900 leading-10 w-full p-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
            <p className="text-zinc-400">This week</p>
            <h1 className="text-trueGray-50 text-4xl font-semibold">$1,329</h1>
            <p className="text-zinc-400">
              <span className="text-green-400">+25%</span> from last week
            </p>
          </div>
          <div className="bg-neutral-900 w-full p-10 leading-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
            <p className="text-zinc-400">This week</p>
            <h1 className="text-trueGray-50 text-4xl font-semibold">$1,329</h1>
            <p className="text-zinc-400">
              <span className="text-green-400">+25%</span> from last week
            </p>
          </div>
        </div>
        <div>
          <LatestFiveNews />
        </div>
      </div>
      <div></div>
    </div>
  );
}
