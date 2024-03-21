import Image from "next/image";

export default function MiniProfile() {
  return (
    <div className="flex  items-center justify-between mt-14 bg-white p-2">
      <Image
        src={
          "https://images.unsplash.com/photo-1497316730643-415fac54a2af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
        }
        width={100}
        height={100}
        alt="userprofile"
        objectFit="cover"
        className="rounded-full h-14 w-14 border p-[2px]"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">Ashish Singh</h2>
        <h3 className="text-gray-400 text-sm">Welcome to the Kalaam</h3>
      </div>
      <button className=" font-semibold text-red-400">Sign Out</button>
    </div>
  );
}
