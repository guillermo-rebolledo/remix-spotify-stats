import { ErrorResponse } from "./spotify-errors";

export type ArtistRoot = {
  artists: Artists;
};

export type FollowingArtistsResponse = ArtistRoot | ErrorResponse;

export function isArtistsResponse(
  response: FollowingArtistsResponse,
): response is ArtistRoot {
  return (response as ArtistRoot).artists !== undefined;
}

export function isErrorResponse(
  response: FollowingArtistsResponse,
): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined;
}

export interface Artists {
  href: string;
  limit: number;
  next: string;
  cursors: Cursors;
  total: number;
  items: Item[];
}

export interface Cursors {
  after: string;
  before: string;
}

export interface Item {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}
