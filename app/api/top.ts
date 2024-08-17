import { Session } from "remix-auth-spotify";
import {
  isErrorResponse,
  TopItemsTimeRange,
  TopItemsType,
  TopResponse,
  TopRoot,
} from "types/top";

export const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_URL = `https://api.spotify.com/v1/me/top/tracks?type=<type>&time_range=<range>&limit=${DEFAULT_PAGE_SIZE}`;

export async function getTopTracks(
  session: Session,
  timeRange: TopItemsTimeRange = "medium_term",
  type: TopItemsType = "tracks",
): Promise<TopRoot | null> {
  try {
    const newUrl = DEFAULT_URL.replace("<type>", type).replace(
      "<range>",
      timeRange,
    );
    const response = await fetch(newUrl ?? DEFAULT_URL, {
      headers: {
        Authorization: `${session.tokenType ?? "Bearer"} ${session.accessToken}`,
      },
    });

    const data: TopResponse = await response.json();

    if (!response.ok || isErrorResponse(data)) {
      return null;
    }

    return data as TopRoot;
  } catch (error) {
    return null;
  }
}
