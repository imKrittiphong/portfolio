import { ContactData } from "@/constance/data";

function Contact() {
  const openUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="flex flex-col-1 justify-center gap-4">
        {ContactData.map((d, index) => (
          <div
            key={index}
            className="
              border border-zinc-300 dark:border-zinc-700
              hover:border-zinc-400 dark:hover:border-zinc-600
              transition-all duration-200
              rounded-full
              cursor-pointer
              bg-transparent
              hover:bg-zinc-50 dark:hover:bg-zinc-900/50
            "
          >
            <div
              className="flex items-center gap-3 p-4"
              onClick={() => openUrl(d.url)}
            >
              <img
                src={d.img}
                width={24}
                height={24}
                alt={d.cont}
                className="shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {d.cont}
                </p>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
