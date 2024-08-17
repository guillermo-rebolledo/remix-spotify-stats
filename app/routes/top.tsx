import {
  redirect,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getTopTracks } from "~/api/top";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TopItemsTimeRange } from "types/top";
import { Track } from "~/components/Track";
import { Layout } from "~/components/Layout";

export const meta: MetaFunction = () => [{ title: "Top Tracks" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const spotifySession = await spotifyStrategy.getSession(request);

  if (!spotifySession) {
    return redirect("/");
  }

  return await getTopTracks(
    spotifySession,
    searchParams.get("view") as TopItemsTimeRange,
  );
};

export default function Top() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const view = (searchParams.get("view") as TopItemsTimeRange) ?? "medium_term";

  const handleViewChange = (range: TopItemsTimeRange) => {
    navigate({ search: `view=${range}` });
  };

  return (
    <Layout>
      <section className="flex flex-col">
        <h1 className="text-8xl font-baskerville">Top tracks</h1>
      </section>

      <section className="py-6">
        <RadioGroup value={view} className="flex gap-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="short_term"
              id="short"
              checked={view === "short_term"}
              onClick={() => handleViewChange("short_term")}
            />
            <Label htmlFor="short">Short term</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="medium_term"
              id="medium"
              checked={view === "medium_term"}
              onClick={() => handleViewChange("medium_term")}
            />
            <Label htmlFor="medium">Medium term</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="long_term"
              id="long"
              checked={view === "long_term"}
              onClick={() => handleViewChange("long_term")}
            />
            <Label htmlFor="long">Long term</Label>
          </div>
        </RadioGroup>
      </section>

      <ul className="flex flex-col gap-2">
        {data?.items.map((track) => (
          <li key={track.id}>
            <Track track={track} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}
