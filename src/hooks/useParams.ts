"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type ParamValue = string | number | boolean | undefined | null;

export function useParams<T extends Record<string, ParamValue>>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const obj = {} as Partial<T>;
    searchParams.forEach((value, key) => {
      obj[key as keyof T] = value as unknown as T[keyof T];
    });
    return obj;
  }, [searchParams]);

  const setParams = useCallback(
    (newParams: Partial<T>) => {
      const current = new URLSearchParams(searchParams.toString());

      (Object.keys(newParams) as Array<keyof T>).forEach((key) => {
        const value = newParams[key];

        if (value === undefined || value === null || value === "") {
          current.delete(key as string);
        } else {
          current.set(key as string, String(value));
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";

      // Using [router.push](https://nextjs.org)
      // updates the URL without a full page reload.
      router.push(`${pathname}${query}`);
    },
    [router, pathname, searchParams],
  );

  return { params, setParams };
}
