import { byteToMB } from "@/lib/utils";

export function imageValidator(name: string, size: number) {
  let flag: string | null;
  if (name) {
    const getImgExt = name.split(".");
    const imgExtType: Array<string> = ["jpg", "jpeg", "png"];
  }
  if (!name) {
    flag = "Please select an image";
  } else {
    flag = null;
  }

  if (size) {
    const imageInMB = byteToMB(size);
    if (imageInMB > 2) {
      flag = "Image size should not be more than 2MB";
    } else {
      flag = null;
    }
  }
  return flag;
}
