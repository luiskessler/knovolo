type ActivityItemType = {
  user: string;
  action: string;
  subject: string;
  time: string;
};

export const ActivityItem: React.FC<ActivityItemType> = ({
  user,
  action,
  subject,
  time,
}) => {
  return (
    <div className="flex items-start py-3">
      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-black font-medium text-white">
        {user
          .split(" ")
          .map((name) => name[0])
          .join("")}
      </div>
      <div>
        <p className="text-sm">
          <span className="font-medium text-black">{user}</span>
          <span className="text-gray-600"> {action} </span>
          <span className="font-medium text-black">{subject}</span>
        </p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
};
