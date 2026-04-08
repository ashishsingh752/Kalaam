import Image from "next/image";
import { ReadUsersPostButton, ReadUsersPostDashBoard } from "../buttons/Button";

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
  userId,
}) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-slate-700 hover:shadow-md hover:shadow-slate-100 dark:hover:shadow-black/20 transition-all duration-300 group border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-600 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all duration-300">
          <Image
            src={
              image ||
              "https://images.unsplash.com/photo-1682686581221-c126206d12f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMjZ8fHxlbnwwfHx8fHw%3D"
            }
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            <ReadUsersPostDashBoard id={userId} name={name} />
          </div>
          <h3 className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-tight mt-0.5">
            {role}
          </h3>
        </div>
      </div>
      
      <div className="opacity-80 text-sm group-hover:opacity-100 transition-opacity">
        <ReadUsersPostButton id={userId} />
      </div>
    </div>
  );
};

export default Suggestion;
