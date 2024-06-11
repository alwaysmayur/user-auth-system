
import { Button } from "flowbite-react";

export default function Component() {
  return (
    <div className="container w-screen h-screen justify-center flex content-center items-center bg-white">

      <div className="flex p-10 rounded-md shadow-md justify-center flex content-center items-center  border w-xl flex-col gap-4">
        <h2 className="text-black text-3xl font-semibold">How do want to register ?</h2>
        <div className="flex pt-8 justify-center flex content-center items-center w-36 gap-4">
        <a href="/register/admin" className="text-black border rounded-md shadow-md py-2 px-5 text-lg font-semibold">Admin</a>
        <a  href="/register/client" className="text-black border rounded-md shadow-md py-2 px-5  text-lg  font-semibold">Client</a>
        </div>
      </div>
    </div>
  );
}
