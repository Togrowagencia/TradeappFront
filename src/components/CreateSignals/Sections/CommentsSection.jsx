import { useState, useEffect } from "react";
import { useClear } from "../ClearContext";

const CommentsSection = ({ handleUpdate }) => {
  const [comment, setComment] = useState("");
  const { reset } = useClear();

  useEffect(() => {
    if (reset > 0) {
      setComment("");
      handleUpdate('comments', '');
    }
  }, [reset, handleUpdate]);

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
    handleUpdate('comments', value);
  };

  return (
    <div className="w-[30.4%] h-[21vh] bg-[#1E1E1E] rounded-[10px] flex flex-col m-2 p-2.5 pt-4 gap-3">
      <h4 className="blanco mx-4">Notes or comments</h4>
      <textarea
        className="rounded-[10px] gris-carbon-bg w-full min-h-[70%] textos blanco p-4 focus:border-[0px] focus:outline-none"
        value={comment}
        onChange={handleCommentChange}
      >
      </textarea>
    </div>
  );
};

export default CommentsSection;