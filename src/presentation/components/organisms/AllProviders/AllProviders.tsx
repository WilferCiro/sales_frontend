"use client";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { CacheProvider } from "@emotion/react";
import { useEmotionCache } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { useHotkeys } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import constantStore from "@/data/constantStore";
import { QueryClient, QueryClientProvider } from "react-query";
import RouterTransition from "../../atoms/RouterTransition";

export default function AllProviders({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme?: ColorScheme;
}) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(theme || "dark");
  const queryClient = new QueryClient();
  const toggleColorScheme = (value?: ColorScheme) => {
    const val = value || (colorScheme === "dark" ? "light" : "dark");
    constantStore.theme.set(val);
    setColorScheme(val);
  };

  const cache = useEmotionCache();
  cache.compat = true;

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cache}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
          >
            <MantineProvider
              theme={{ primaryColor: "orange" }}
              inherit
              withGlobalStyles
              withNormalizeCSS
            >
              <RouterTransition />
              <Notifications position="top-center" limit={3} />
              {children}
            </MantineProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
