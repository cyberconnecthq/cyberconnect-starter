import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  return (
    <header className="sticky flex  py-1.5 px-3">
      {/* <div className="flex items-center space-x-1 py-2.5 px-4 rounded w-full border-black">
        <input
          type="text"
          placeholder="Search"
          className="hidden md:inline-flex border-black  text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
        />
      </div> */}

      <div className="self-end p-2">
        <ConnectButton />
      </div>
    </header>
  );
}

export default Header;
