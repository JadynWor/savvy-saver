"use client";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

export default function LoginPage() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-green-400 flex items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            onClick={async () => {
              await signIn(provider.id);
            }}
            className="bg-black pl-3 pr-5 py-2 text-white rounded-full flex items-center"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
