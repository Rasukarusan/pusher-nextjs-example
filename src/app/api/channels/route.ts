import Pusher from "pusher";
import { NextRequest, NextResponse } from "next/server";

/*
 * 自分のアプリ独自の認証処理
 */
const auth = (id: string) => {
  return id === "hogehoge";
};

export async function GET(req: NextRequest) {
  console.log("ちゃんねる");
  try {
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID as string,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
      secret: process.env.PUSHER_SECRET as string,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
      useTLS: true,
    });
    const c = await pusher
      .get({
        path: "/channels",
        params: {
          // info: "user_count",
          // filter_by_prefix: "presence-"
        },
      })
      .then((res) => res.json());
    console.log(c);

    return NextResponse.json({ result: false });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ result: false });
  }
}
