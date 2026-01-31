import Image, { ImageProps } from "next/image";

export type CompanyLogoProps = Partial<ImageProps> & {
  type?: "full" | "icon";
};

export const CompanyLogo = ({
  width = 174,
  height = 36,
  type = "full",
  ...props
}: CompanyLogoProps) => {
  return (
    <Image
      src={type === "full" ? "/full-logo.svg" : "/icon-logo.svg"}
      alt="lendsqr logo"
      width={width}
      height={height}
      {...props}
    />
  );
};
