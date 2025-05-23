import { Button } from "../ui/button";
import protonImg from "/proton.png";
import gmailImg from "/gmail.png";

const EmailLinks = ({ label } : { label: string}) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-100">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400 text-white">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="mt-4 text-center text-gray-300">
            {label}
          </p>
        </div>

        <div className="flex justify-center gap-12 mt-8">
          <Button
            onClick={() => window.open("https://mail.google.com", "_blank")}
            className="
                  cursor-pointer py-10 w-25 text-lg rounded-xl
                  bg-gradient-to-br from-slate-900 to-red-900
                  bg-[length:200%_200%] bg-[position:0%_0%]
                  hover:bg-[position:100%_100%]
                  transition-all duration-500 ease-in-out
                  font-bold
                "
          >
            <img src={gmailImg} alt="" className="h-10" />
          </Button>
          <Button
            onClick={() => window.open("https://mail.proton.me", "_blank")}
            className="
                  cursor-pointer py-10 w-25 text-lg rounded-xl
                  bg-gradient-to-br from-slate-900 to-red-900
                  bg-[length:200%_200%] bg-[position:0%_0%]
                  hover:bg-[position:100%_100%]
                  transition-all duration-500 ease-in-out
                  font-bold
                "
          >
            <img src={protonImg} alt="" className="h-15" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailLinks;