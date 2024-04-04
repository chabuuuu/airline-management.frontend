import { NextResponse } from "next/server";

import axios from "axios";
import qs from "qs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const url = `${process.env.NEXT_PUBLIC_SERVER}/customer`;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {},
      data: qs.stringify(request.body),
    };

    const response = await axios.request(config);
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
