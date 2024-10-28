import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-[1E1E1E]">
      <Image src={'/logo.svg'} alt="logo" width={30} height={30} />
       HomePage
    </div>
  );
}
