import { useAppContext } from "@/app/context/AppContext";
import { Property } from "@lib/types/property";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const ShareButton = ({ property }: { property?: Property }) => {
  const { state } = useAppContext();

  const { id, name = "" } = property || {};
  const URL = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${id}`;

  if (!state.user) {
    return null;
  }

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">Share Property</h3>
      <div className="flex gap-4 justify-center">
        <FacebookShareButton url={URL} hashtag={name}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <TwitterShareButton url={URL} title={name}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <LinkedinShareButton url={URL} title={name}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>

        <WhatsappShareButton url={URL} title={name}>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </div>
    </>
  );
};

export default ShareButton;
