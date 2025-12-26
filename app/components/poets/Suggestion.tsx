import Image from "next/image";
import { ReadUsersPostButton } from "../buttons/Button";

interface SuggestionProps {
  id: string;
  userId: string;
  post_id: string;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
  role: string;
}

interface PostType {
  id: number;
  userId: string;
  post_id: string;
  content: string;
  heading: string;
  image: string;
  profileImage: string;
  name: string;
  roll_number: string;
  role: string;
}

//!   this is the for the  suggestion in the home page
const Suggestion: React.FC<SuggestionProps> = ({
  image,
  name,
  role,
  id,
  userId,
  post_id,
}) => {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 group-hover:border-indigo-200 transition-colors">
          <Image
            src={
              image ||
              "https://images.unsplash.com/photo-1682686581221-c126206d12f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMjZ8fHxlbnwwfHx8fHw%3D"
            }
            alt="user img"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="font-semibold text-sm text-slate-800 leading-tight">
            {name}
          </h2>
          <h3 className="text-slate-500 text-xs truncate max-w-[120px]">
            {role}
          </h3>
        </div>
      </div>

      <div className="opacity-80 group-hover:opacity-100 transition-opacity">
        <ReadUsersPostButton id={userId} />
      </div>
    </div>
  );
};

export default Suggestion;
