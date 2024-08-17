import { Fragment } from "react/jsx-runtime";
import { Item } from "types/top";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export function Track({ track }: { track: Item }) {
  const smallestImage = track.album.images.find(
    (image) => image.width === 64 || image !== undefined,
  );

  return (
    <div className="flex justify-between items-center rounded-lg p-4 hover:bg-neutral-100 focus-within:bg-neutral-100">
      <div className="flex gap-4 items-center">
        <a
          title="Open album in Spotify"
          aria-label="Open album in Spotify"
          href={track.album.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            loading="lazy"
            alt={`${track.name} album cover`}
            src={smallestImage?.url}
            style={{ height: 64, width: 64 }}
            className="rounded-md shadow"
          />
        </a>

        <div className="flex flex-col">
          <p className="text-lg font-bold font-open max-w-[450px] truncate">
            {track.name}
          </p>
          <p className="text-sm text-gray-500">
            {track.artists.map((artist, idx) => (
              <Fragment key={artist.id}>
                <a
                  title="Open artist in Spotify"
                  aria-label="Open artist in Spotify"
                  href={artist.external_urls.spotify}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="hover:underline hover:text-teal-900"
                >
                  {artist.name}
                </a>
                {track.artists.length > 1 && idx !== track.artists.length - 1
                  ? ", "
                  : ""}
              </Fragment>
            ))}
          </p>
        </div>
      </div>

      <Button
        title="Open track in Spotify"
        aria-label="Open track in Spotify"
        variant="outline"
        onClick={() =>
          window.open(
            track.external_urls.spotify,
            "_blank",
            "noopener noreferrer",
          )
        }
      >
        <ExternalLinkIcon />
      </Button>
    </div>
  );
}
//
