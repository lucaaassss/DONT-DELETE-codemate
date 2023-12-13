// this is a dynamic reusable component
// metric in this case is the combination between an image,value and title.For example,image:profile picture, value:profile name, title:the time the question was asked
// Another example,image:like icon, value:number of likes, title:"likes"
// DO NOTE that one metric represents one image,one value,one title and other optional properties
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}
export const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  const metricContent = (
    // fragments
    <>
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${textStyles}flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  // if the metric CONTAINS href we will use this
  if (href) {
    return (
      // href={href} means that the Link href will use the href passed to it
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  // if the metric DOES NOT contain href we will use this
  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
