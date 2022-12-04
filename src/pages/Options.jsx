import { changeLanguage } from "../Config/languages/language";

const Options = () => {
  return (
    <div className=" overflow-y-scroll w-full h-full bg-bgDark">
      <div className="flex flex-col h-32">
        <div className="flex h-1/2 bg-accent2 items-center px-8">
          <h2 className="text-white font-semibold text-3xl">Options</h2>
        </div>
        <div className="flex justify-start items-center px-8 gap-8 w-full h-1/2 bg-bgLight"></div>
      </div>

      <button onClick={() => changeLanguage("pl")}>Polish</button>
      <button onClick={() => changeLanguage("en")}>English</button>
    </div>
  );
};

export default Options;
