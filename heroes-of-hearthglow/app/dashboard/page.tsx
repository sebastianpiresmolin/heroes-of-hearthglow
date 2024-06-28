export default function dashboard() {
  return (
    <div>
      <div>
        <div className="bg-neutral-900 w-fit p-6 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
          <p className="text-zinc-400">This week</p>
          <h1 className="text-trueGray-50 text-4xl font-semibold">$1,329</h1>
          <p className="text-zinc-400">
            <span className="text-green-400">+25%</span> from last week
          </p>
        </div>
      </div>
    </div>
  );
}
