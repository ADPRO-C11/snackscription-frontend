import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-32 gap-10">
       
        <Image 
          src={"/static/images/Snacks.jpg"}
          alt="Image of Snacks"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            zIndex: -1
          }}
        />
        <div className="bg-white p-24 rounded-3xl shadow-xl flex flex-col gap-10">
          <p className="text-5xl text-center">Welcome to <b>Snackscription</b>!</p>
          <p className="text-xl text-center text-gray-500">This website is currently under development.</p>
        </div>
    </main>
  );
}
