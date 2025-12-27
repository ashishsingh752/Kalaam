import Image from "next/image";
import { FC } from "react";
import { MdEmail, MdPhone } from "react-icons/md";

interface ContactCardProps {
  name: string;
  image: string;
  mobile_number: string;
  email: string;
  role: string;
}

const ContactCard: FC<ContactCardProps> = ({
  name,
  image,
  mobile_number,
  email,
  role,
}) => {
  return (
    <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-shadow hover:shadow-lg">
      {/* Header Pattern/Gradient */}
      <div className="h-24 w-full bg-gradient-to-r from-blue-500 to-gray-600 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      {/* Avatar Image */}
      <div className="relative -mt-16 mb-3">
        <div className="h-32 w-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white relative">
          <Image
            src={
              image ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content section */}
      <div className="flex flex-1 flex-col p-6 pt-0 text-center w-full">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {name}
          </h3>
          <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase mt-1">
            {role}
          </p>
        </div>

        <div className="mt-auto space-y-3 flex flex-col items-center justify-start">
          <div className="flex items-center gap-3 text-sm text-gray-600 transition-colors hover:text-blue-600 group/link w-full justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover/link:bg-blue-100">
              <MdEmail className="h-4 w-4" />
            </div>
            <span>{email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 w-full justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
              <MdPhone className="h-4 w-4" />
            </div>
            <span>{mobile_number || "Not Available"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
