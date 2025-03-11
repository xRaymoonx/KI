import React, { useState, useCallback } from "react";
import { FaMapMarkerAlt, FaMoneyBillWave, FaBuilding, FaBookmark, FaShareAlt, FaStar } from "react-icons/fa";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary?: string;
  onApply: () => void;
  rating?: number; // AI-Rating für bessere Empfehlungen
}

const JobCard: React.FC<JobCardProps> = ({ title, company, location, salary, onApply, rating }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleApply = useCallback(() => {
    onApply();
  }, [onApply]);

  const handleBookmark = useCallback(() => {
    setBookmarked(!bookmarked);
  }, [bookmarked]);

  const handleShare = useCallback(() => {
    const shareText = `🔥 Job gefunden: ${title} bei ${company} in ${location}! Bewirb dich jetzt!`;
    if (navigator.share) {
      navigator.share({
        title: "Jobangebot",
        text: shareText,
        url: window.location.href,
      });
    } else {
      alert("Teilen wird auf diesem Gerät nicht unterstützt.");
    }
  }, [title, company, location]);

  return (
    <div className="border rounded-lg p-5 shadow-lg bg-white dark:bg-gray-900 transition-transform transform hover:scale-105">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
        <button onClick={handleBookmark}>
          {bookmarked ? <FaBookmark className="text-yellow-500" /> : <FaBookmark className="text-gray-400" />}
        </button>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
        <FaBuilding className="mr-2 text-gray-500" />
        <p>{company}</p>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
        <FaMapMarkerAlt className="mr-2 text-red-500" />
        <p>{location}</p>
      </div>
      {salary && (
        <div className="flex items-center text-green-600 font-semibold mt-1">
          <FaMoneyBillWave className="mr-2 text-green-500" />
          <p>{salary}</p>
        </div>
      )}
      {rating && (
        <div className="flex items-center text-yellow-500 mt-2">
          <FaStar />
          <span className="ml-1 font-bold">{rating.toFixed(1)}/5</span>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={handleApply}
        >
          Jetzt bewerben
        </button>
        <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg" onClick={handleShare}>
          <FaShareAlt className="text-gray-600 dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;