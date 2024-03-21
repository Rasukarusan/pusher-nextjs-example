import Pusher from "pusher";
import { NextRequest, NextResponse } from "next/server";

/*
 * 自分のアプリ独自の認証処理
 */
const auth = (id: string) => {
  return id === "hogehoge";
};

export async function POST(req: NextRequest) {
  console.log("ぷれぜんす");
  try {
    // req.json()では取得できないため、req.text()で文字列でbodyを受け取ってからObjectに変換する。
    // Pages Routerの場合は普通にreq.bodyで取得できる。
    const data = await req.text();
    const body = new URLSearchParams(data);
    // socket_idとchannel_nameはPusherのライブラリによりbodyに挿入される
    const socket_id = body.get("socket_id") as string;
    const channel_name = body.get("channel_name") as string;
    // フロント側でparamsに指定したパラメータもbodyに入ってくる
    const id = body.get("id") as string;

    // ここで自分のアプリ独自の認証処理をする
    const isAuth = auth(id);
    if (!isAuth) {
      return NextResponse.json({ result: false });
    }

    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID as string,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
      secret: process.env.PUSHER_SECRET as string,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
      useTLS: true,
    });
    // チャンネル参加者としての情報をいれることができる
    const presenceData = {
      user_id: "123456",
      user_info: { name: "hoge" },
    };
    const authResponse = pusher.authorizeChannel(
      socket_id,
      channel_name,
      presenceData // この第三引数には空でいいので何かしらオブジェクトを渡す必要がある。authorizeは通るがサブスクライブしたことにならず、メッセージが受け取れないため。
    );
    console.log(authResponse);
    return NextResponse.json(authResponse);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ result: false });
  }
}
