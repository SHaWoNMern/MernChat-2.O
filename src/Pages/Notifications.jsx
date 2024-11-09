import React from "react";
import { FiBell } from "react-icons/fi";

const notifications = () => {
  const notification = [
    {
      id: 1,
      icon: <FiBell className="text-2xl" />,
      message:
        "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      time: "2 hours ago",
    },
    {
      id: 2,
      icon: <FiBell className="text-2xl" />,
      message: "How a visual artist redefines success in graphic design",
      time: "3 hours ago",
    },
    {
      id: 3,
      icon: <FiBell className="text-2xl" />,
      message:
        "So yes, the alcohol (ethanol) in hand sanitizers can be absorbed through the skin, but no, it would not cause intoxication.",
      time: "4 hours ago",
    },
    {
      id: 4,
      icon: <FiBell className="text-2xl" />,
      message:
        "For athletes, high altitude produces two contradictory effects on performance. For explosive events (sprints up to 400 metres, long jump, triple jump) the reduction in atmospheric pressure means there is less resistance from the atmosphere and the athlete's performance will generally be better at high altitude.",
      time: "5 hours ago",
    },
    {
      id: 5,
      icon: <FiBell className="text-2xl" />,
      message:
        "consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue",
      time: "6 hours ago",
    },
    {
      id: 6,
      icon: <FiBell className="text-2xl" />,
      message:
        "How We Keep Brand Consistency in Our Visual Language — A Design System for Illustrations",
      time: "7 hours ago",
    },
  ];
  return (
    <div className="w-3/4  shadow-lg rounded-lg p-4 mt-10">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-3">
        {notification.map((notification) => (
          <li
            key={notification.id}
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-500 cursor-pointer"
          >
            <div className="mr-3">{notification.icon}</div>
            <div>
              <p className="">{notification.message}</p>
              <span className="text-gray-500 text-sm">{notification.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default notifications;
