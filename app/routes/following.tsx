import { redirect, useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getFollowing } from "~/api/following";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const spotifySession = await spotifyStrategy.getSession(request);

  if (!spotifySession) {
    return redirect("/");
  }

  return await getFollowing(spotifySession);
};

export default function Following() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Welcome to Remix!</h2>
      <ul>
        {data?.items.map((artist) => <li key={artist.id}>{artist.name}</li>)}
      </ul>
    </div>
  );
}
