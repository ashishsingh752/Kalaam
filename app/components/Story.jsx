import Image from "next/image"
import Stories from "./Stories"

export default function Story({imgSrc, username}) {
    return (
        <div>
            <Image
                src={imgSrc}
                alt="user img"
                width={100}
                height={100}
            />
            <p>
                {username}
                </p>
        </div>
  )
}
