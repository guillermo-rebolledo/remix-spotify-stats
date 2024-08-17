import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { spotifyStrategy } from "~/services/auth.server";
import { Layout } from "~/components/Layout";

export const meta: MetaFunction = () => [{ title: "Spotify Stats" }];

export async function loader({ request }: LoaderFunctionArgs) {
  return spotifyStrategy.getSession(request);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;

  return (
    <Layout>
      <Form action={user ? "/logout" : "/auth/spotify"} method="post">
        <Button className="bg-green-500 text-white">
          {user ? "Logout" : "Log in with Spotify"}
        </Button>
      </Form>
    </Layout>
  );
}
