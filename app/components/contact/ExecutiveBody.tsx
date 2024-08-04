import Image from "next/image";
import { FC } from "react";

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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image section */}
      <div className="relative w-full h-64 md:h-48">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
      {/* Content section */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
        <div className="text-gray-600 mb-2">Role: {role}</div>
        <div className="text-gray-800 mb-2">
          <div className="font-semibold">Mobile: {mobile_number}</div>
        </div>
        <div className="text-gray-800 flex flex-row gap-1">
          <div>Email: </div>
          <div>
            <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
              {email}
            </a>
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
