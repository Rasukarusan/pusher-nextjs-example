"use client";
import Pusher from "pusher-js";

export default function Home() {
  return (
    <main className="p-24">
      <div className="font-bold text-2xl mb-4">Pusher Next.js Example</div>
      <button
        className="px-2 py-2 bg-green-600 rounded-md mr-4"
        onClick={async () => {
          console.log("hai");
          const pusher = new Pusher(
            process.env.NEXT_PUBLIC_PUSHER_KEY as string,
            {
              cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
              userAuthentication: {
                endpoint: "/api/user-auth",
                transport: "ajax",
                params: { id: "hogehoge" },
                headers: {},
                paramsProvider: undefined,
                headersProvider: undefined,
              },
              channelAuthorization: {
                endpoint: "/api/channel-auth",
                transport: "ajax",
                params: { id: "hogehoge" },
                headers: {},
                paramsProvider: undefined,
                headersProvider: undefined,
              },
            }
          );
          await pusher.signin();
          const channel = pusher.subscribe("private-hoge");
          console.log(channel);
        }}
      >
        Private Channel
      </button>
      <button
        className="px-2 py-2 bg-blue-600 rounded-md mr-4"
        onClick={() => {
          const pusher = new Pusher(
            process.env.NEXT_PUBLIC_PUSHER_KEY as string,
            {
              cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
              channelAuthorization: {
                endpoint: "/api/channel-auth",
                transport: "ajax",
                params: { id: "hogehoge" },
                headers: {},
                paramsProvider: undefined,
                headersProvider: undefined,
              },
            }
          );
          const channel = pusher.subscribe("presence-hoge");
          console.log(channel);
        }}
      >
        Presence Channel
      </button>

      <button
        className="px-2 py-2 bg-yellow-600 rounded-md"
        onClick={async () => {
          const res = await fetch("/api/channels");
          console.log(res);
        }}
      >
        Get Members
      </button>
    </main>
  );
}
