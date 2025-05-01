import { FaBookmark } from "react-icons/fa";
import { bookmarkProperty } from "@lib/api/bookmarks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "@/app/context/AppContext";
import classNames from "classnames";
import { ErrorType } from "@lib/utils/response";

const BookmarkButton = ({ propertyId }: { propertyId: string }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { state } = useAppContext();

  const { user } = state;

  useEffect(() => {
    if (!propertyId || !user) {
      return;
    }

    setIsBookmarked(user.bookmarks.includes(propertyId));
  }, [propertyId, user]);

  const handleClickBookmark = async () => {
    try {
      setIsProcessing(true);
      const data = await bookmarkProperty(propertyId);
      toast.success(data?.message);
      setIsBookmarked(!!data?.isBookmarked);
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      className={classNames(
        "bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center",
        {
          "bg-red-500 hover:bg-red-600": isBookmarked,
        }
      )}
      onClick={() => {
        handleClickBookmark();
      }}
      disabled={isProcessing}
    >
      <FaBookmark className="fas fa-bookmark mr-2" />{" "}
      {isBookmarked ? "Remove Bookmar" : "Bookmark Property"}
    </button>
  );
};

export default BookmarkButton;
