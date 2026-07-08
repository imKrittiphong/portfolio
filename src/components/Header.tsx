export default function Header() {
  return (
    <>
      <div className="relative overflow-hidden py-20 mb-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-b from-amber-100/30 via-transparent to-transparent dark:from-amber-900/10" />
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-amber-300 dark:bg-amber-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-amber-200 dark:bg-amber-700/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>
        <div className="flex justify-center items-center relative z-10">
          <h1
            className="
          text-7xl md:text-8xl font-bold text-center
          bg-linear-to-r from-zinc-900 via-amber-600 to-zinc-900
          dark:from-zinc-100 dark:via-amber-500 dark:to-zinc-100
          bg-clip-text text-transparent
          bg-size-[200%_200%]
          animate-gradientMove
          "
          >
            Portfolio
          </h1>
        </div>
      </div>
      <div className="flex gap-12 justify-center">
        <div
          className="
            relative inline-block after:absolute after:left-1/2 after:bottom-0
            after:h-0.5 after:w-full
            after:bg-amber-500
            after:origin-center after:scale-x-0
            after:-translate-x-1/2
            after:transition-transform after:duration-400
            hover:after:scale-x-100 cursor-pointer
          "
        >
          <a href="#about">About Me</a>
        </div>
        <div
          className="
          relative inline-block after:absolute after:left-1/2 after:bottom-0
          after:h-0.5 after:w-full
          after:bg-amber-500
          after:origin-center after:scale-x-0
          after:-translate-x-1/2
          after:transition-transform after:duration-400
          hover:after:scale-x-100 cursor-pointer
          "
        >
          <a href="#skill">Skills</a>
        </div>
        <div
          className="
          relative inline-block after:absolute after:left-1/2 after:bottom-0
          after:h-0.5 after:w-full
          after:bg-amber-500
          after:origin-center after:scale-x-0
          after:-translate-x-1/2
          after:transition-transform after:duration-400
          hover:after:scale-x-100 cursor-pointer
          "
        >
          <a href="#project">Project</a>
        </div>
        <div
          className="
          relative inline-block after:absolute after:left-1/2 after:bottom-0
          after:h-0.5 after:w-full
          after:bg-amber-500
          after:origin-center after:scale-x-0
          after:-translate-x-1/2
          after:transition-transform after:duration-400
          hover:after:scale-x-100 cursor-pointer
          "
        >
          <a href="#contact">Contact</a>
        </div>
      </div>
    </>
  );
}
