export default function Home() {
  return (
    <main className="w-full h-full bg-gray-200 flex flex-col justify-center items-center">
      <h2 className="m-[6px] p-[8px] bg-gray-400/50 rounded-[10px] ">
        <a
          className="text-link"
          href="https://github.com/MusaBukhari237/book-store-api"
        >
          Book Store Api
        </a>{" "}
        Developed with <span className="text-red-700">❤</span> by{" "}
        <a className="text-link" href="https://github.com/MusaBukhari237">
          Musa Bukhari
        </a>
      </h2>
    </main>
  );
}
