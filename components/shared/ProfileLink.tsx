import Image from "next/image";
import Link from "next/link";

interface ProfileLinkProps {
  imgUrl: string;
  href?: string;
  title: string;
}

const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProps) => {
  return (
    <div className="flex-center gap-1">
      <Image src={imgUrl} alt="icon" width={22} height={22} />

      {href ? ( // if it is a href it will display the link
        <Link
          href={href}
          target="_blank" // will open the link in a new tab
          className="paragraph-medium text-blue-800 dark:text-blue-300"
        >
          {title}
        </Link>
      ) : (
        // if not it will display the title of the component
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
