import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import api from "../api";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-4 h-4 text-yellow-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.75.75 0 011.04 0l2.636 2.678 3.682.536a.75.75 0 01.415 1.28l-2.666 2.63.63 3.676a.75.75 0 01-1.088.791L12 13.347l-3.288 1.743a.75.75 0 01-1.088-.79l.63-3.677-2.666-2.63a.75.75 0 01.415-1.28l3.682-.537L11.48 3.5z"
    />
  </svg>
);

const Reviews = () => {
  const { id: listingId } = useParams();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [writingReview, setWritingReview] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [replyMap, setReplyMap] = useState({});
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/reviews/listing/${listingId}`);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [listingId]);

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/reviews/${id}`, { withCredentials: true });
        setReviews(reviews.filter((r) => r._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
    setOpenMenuId(null);
  };

  const handleSubmitReview = async () => {
    if (!newReview.trim()) return;
    setSubmitStatus("submitting");

    try {
      const res = await axios.post(
        "/api/reviews",
        { listingId, content: newReview },
        { withCredentials: true }
      );
      setSubmitStatus("submitted");
      setReviews((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to submit review:", err);
      setSubmitStatus("idle");
    }
  };

  const handleReplySubmit = async (reviewId, replyContent) => {
    if (!replyContent?.trim()) return;
    try {
      const res = await api.post(`/reviews/${reviewId}/reply`, { content: replyContent });
      setModalContent(null);
      fetchReviews();
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  const ReviewCard = ({ review }) => (
    <div className="relative w-[calc(50%-10px)] p-5 rounded-xl bg-white">
      <div className="absolute top-2 right-2">
        <button className="text-xl" onClick={() => handleMenuToggle(review._id)}>
          ⋮
        </button>
        {openMenuId === review._id && (
          <div className="absolute top-8 right-0 bg-white rounded-md shadow-md py-1 z-10">
            <button
              className="px-4 py-2 w-full text-left hover:bg-gray-100"
              onClick={() => handleDelete(review._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-3 mb-2 items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div>
          <p className="font-semibold">{review.user?.name || "Unknown"}</p>
          <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {[...Array(5)].map((_, idx) => (
          <StarIcon key={idx} />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-gray-700 mb-2">{review.content}</p>

      <div className="flex gap-4 text-sm mt-2">
        <button
          className="text-blue-600 underline"
          onClick={() => {
            setModalType("showReplies");
            setModalContent(review);
          }}
        >
          Show Replies
        </button>
        <button
          className="text-blue-600 underline"
          onClick={() => {
            setModalType("reply");
            setModalContent(review);
          }}
        >
          Reply
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-[80vw] mx-auto flex flex-col items-start py-5">
      <div className="w-full flex flex-wrap gap-x-5 gap-y-12">
        {reviews.slice(0, 6).map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      <div className="flex flex-col items-start gap-3 pt-6">
        {!writingReview ? (
          <button
            className="bg-[#ff385c] hover:bg-[#e02e4d] text-white px-4 py-2 rounded-md"
            onClick={() => setWritingReview(true)}
          >
            Write a Review
          </button>
        ) : (
          <>
            <textarea
              className="w-full max-w-xl min-h-[100px] p-3 rounded-md text-sm resize-y border border-gray-300"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your thoughts here..."
              disabled={submitStatus === "submitted"}
            ></textarea>
            <button
              className="bg-[#ff385c] hover:bg-[#e02e4d] text-white px-4 py-2 rounded-md"
              onClick={handleSubmitReview}
              disabled={submitStatus !== "idle"}
            >
              {submitStatus === "submitting"
                ? "Submitting..."
                : submitStatus === "submitted"
                ? "Submitted"
                : "Submit"}
            </button>
          </>
        )}
      </div>

      {modalContent && modalType === "showReplies" && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-4 text-xl"
              onClick={() => setModalContent(null)}
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-2">Replies</h3>
            <p className="mb-4 italic text-gray-700">{modalContent.content}</p>
            <div className="space-y-2">
              {modalContent.replies?.length ? (
                modalContent.replies.map((reply, idx) => (
                  <div key={idx} className="border-b pb-2 text-sm">
                    <span className="font-semibold">{reply.user?.name || "User"}:</span> {reply.content}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No replies yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {modalContent && modalType === "reply" && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-4 text-xl"
              onClick={() => setModalContent(null)}
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4">Reply to Comment</h3>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
              value={replyMap[modalContent._id] || ""}
              onChange={(e) => setReplyMap((prev) => ({ ...prev, [modalContent._id]: e.target.value }))}
              placeholder="Write your reply here..."
            ></textarea>
            <button
              className="px-4 py-2 bg-[#ff385c] text-white rounded-md hover:bg-[#e02e4d]"
              onClick={() => handleReplySubmit(modalContent._id, replyMap[modalContent._id])}
            >
              Submit Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;

