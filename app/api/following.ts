import { Session } from "remix-auth-spotify";
import {
  ArtistRoot,
  FollowingArtistsResponse,
  isErrorResponse,
} from "types/following";

export const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_URL = `https://api.spotify.com/v1/me/following?type=artist&limit=${DEFAULT_PAGE_SIZE}`;

export async function getFollowing(
  session: Session,
  url?: string,
): Promise<ArtistRoot["artists"] | null> {
  try {
    const response = await fetch(url ?? DEFAULT_URL, {
      headers: {
        Authorization: `${session.tokenType ?? "Bearer"} ${session.accessToken}`,
      },
    });

    const data: FollowingArtistsResponse = await response.json();

    if (!response.ok || isErrorResponse(data)) {
      return null;
    }

    return (data as ArtistRoot).artists;
  } catch (error) {
    return null;
  }
}
