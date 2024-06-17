export default function Youtube() {
  return (
    <div className="bg-gray-400 flex-col justify-center items-center hidden lg:flex p-10">
      <iframe
        src="https://www.youtube.com/embed/keL7fnIPXlE"
        allowFullScreen
        width={800}
        height={400}
        className="rounded-lg shadow-lg max-w-[1050px]"
      />
    </div>
  );
}
